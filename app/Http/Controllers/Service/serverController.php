<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use phpDocumentor\Reflection\Types\This;

class serverController extends Controller
{
    private $onlineList = []; //客服id数组
    private $distributeList = []; // 已分配用户数
    private $onlineUser = [];
    private $flagValue = 1; // 阈值

    private function initList($id)
    {
        // init List
        array_push($this->onlineList, $id);
        for ($i = 0; $i < count($this->onlineList); $i++) {
            array_push($this->distributeList, 0);
        }
        if (!$this->getAttributes()) {
            $this->setAttributes();
        }
    }

    // when server login and websocket established
    public function serverLogin($id)
    {
        $type = $this->gettype($id);
        if ($type != null && (int)$type != 0 && is_numeric((int)$type)) {
            if ($this->getAttributes()) {
                array_push($this->onlineList, (int)$id);
                array_push($this->distributeList, 0);
                $this->setAttributes();
            } else {
                $this->initList((int)$id);
            }
        } else {
            $this->getAttributes();
            array_push($this->onlineUser, (int)$id);
            $this->setAttributes();
        }
    }

    // when server logout
    public function Logout($id)
    {
        $this->getAttributes();
        $type = $this->gettype($id);

        if ($type != null && (int)$type != 0 && is_numeric((int)$type)) {
            for ($i = 0; $i < count($this->onlineList); $i++) {
                if ($this->onlineList[$i] == $id) {
                    array_splice($this->onlineList, $i, 1);
                    array_splice($this->distributeList, $i, 1);
                }
            }
            if (count($this->onlineList) > 0) {
                $this->flagValue = ceil(count($this->onlineUser) / count($this->onlineList));
            } else {
                $this->flagValue = 1;
            }
            $this->setAttributes();
        } else {
            for ($i = 0; $i < count($this->onlineUser); $i++) {
                if ($this->onlineUser[$i] == $id) {
                    array_splice($this->onlineUser, $i, 1);
                }
            }
            $this->setAttributes();
        }
    }

    // distribute server id
    public function getServerId()
    {
        $this->getAttributes();
        if (count($this->onlineList) > 0) {
            $serverID = array_rand($this->onlineList, 1);
            if ($this->distributeList[$serverID] < $this->flagValue) {
                ++$this->distributeList[$serverID];
                $this->setAttributes();
                return $this->onlineList[$serverID];
            } else {
                return $this->addFlagValue();
            }
        }
    }

    private function addFlagValue()
    {
        for ($i = 0; $i < count($this->distributeList); $i++) {
            if ($this->distributeList[$i] >= $this->flagValue) {
                continue;
            } else {
                ++$this->distributeList[$i];
                $this->setAttributes();
                return $this->onlineList[$i];
            }
        }
        $this->flagValue++;
        $this->setAttributes();
        return $this->onlineList[0];
    }

    private function getContents($path)
    {
        $fp = fopen($path, 'r');
        flock($fp, LOCK_SH);
        $buffer = '';
        while (!feof($fp)) {
            $buffer .= fread($fp, 1024);
        }
        flock($fp, LOCK_UN);
        fclose($fp);
        return $buffer;
    }

    // read file
    private function getAttributes()
    {
        if (Storage::disk('local')->exists('/app/onlineList.txt')
            && Storage::disk('local')->exists('/app/distribute.txt')
            && Storage::disk('local')->exists('/app/flagValue.txt')
            && Storage::disk('local')->exists('/app/onlineUser.txt')) {
            $this->onlineList = json_decode($this->getContents(storage_path('/app/onlineList.txt')), true);
            $this->distributeList = json_decode($this->getContents(storage_path('/app/distribute.txt')), true);
            $this->onlineUser = json_decode($this->getContents(storage_path('/app/onlineUser.txt')), true);
            $this->flagValue = (int)$this->getContents(storage_path('/app/flagValue.txt'));
            if ($this->onlineList == null) {
                $this->onlineList = [];
            }
            if ($this->onlineUser == null) {
                $this->onlineUser = [];
            }
            if ($this->distributeList == null) {
                $this->distributeList = [];
            }
            return true;
        }
        return false;
    }

    private function setAttributes()
    {
        return $this->setContents(storage_path('/app/distribute.txt'), json_encode($this->distributeList))
            && $this->setContents(storage_path('/app/onlineList.txt'), json_encode($this->onlineList))
            && $this->setContents(storage_path('/app/flagValue.txt'), $this->flagValue)
            && $this->setContents(storage_path('/app/onlineUser.txt'), json_encode($this->onlineUser));
    }

    private function setContents($path, $data)
    {
        $fp = fopen($path, 'w');
        do {
            $isLock = flocK($fp, LOCK_EX);
        } while (!$isLock);
        fwrite($fp, $data);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }

    // padding isServer
    private function gettype($id)
    {
        return DB::table('chat_user')->where('id', $id)->value('type');
    }
}
