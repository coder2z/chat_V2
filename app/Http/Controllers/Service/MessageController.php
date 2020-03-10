<?php
/**
 * Created by PhpStorm.
 * User: JiangWei
 * Date: 2019/9/4
 * Time: 15:19
 */

namespace App\Http\Controllers\Service;


use App\Http\Controllers\Controller;
use App\Http\Controllers\Util\ResponseController;
use App\Models\ChatCommunication;
use App\Models\Chatlist;
use App\Models\UserAi;


use GatewayClient\Gateway;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;//用户表

class MessageController extends ResponseController
{

    public function __construct()
    {
        Gateway::$registerAddress = "127.0.0.1:1238";
    }

    // private $serviceID = 1;

    public function getUser()
    {
        if(!is_numeric(User::where('id',Auth::id())->first()->type)){
            return response()->fail(100,'失败!',null);
        }
        $serviceID = Auth::user()->id;


        $userList = DB::select("SELECT DISTINCT MainTable.fromid,MainTable.fromname,IFNULL(SubTable.SubNum, 0) AS noread FROM chat_communication  AS MainTable left JOIN  
 
(select fromid,fromname,COUNT(isread) as SubNum FROM chat_communication where toid = {$serviceID} and isread = 0  GROUP BY fromid
) AS SubTable  
 
ON MainTable.fromid = SubTable.fromid where toid={$serviceID}");




//        return $userList;
        return $this->success($userList);
//        return $this->serverID();


    }

    public function getSelf()
    {


    }


    public function serverID()
    {
        $onlineList = $this->isOnline();
        $serverID = array_rand($onlineList, 1);

        return $onlineList[$serverID];
    }

    public function isOnline()
    {
        // get all server list and make sure if online

        // type user:0 server:1
        $serverList = DB::table('chat_user')->where('type', 1)->get();

        // if no user online which should be show ?

        $tmpList = [];
        $onlineList = [];
        foreach ($serverList as $server) {
            array_push($tmpList, $server->id);
        }

        foreach ($tmpList as $i => $tmp) {
            // online
            if (Gateway::isUidOnline($tmp) == 1) {
                array_push($onlineList, $tmp);
            }
        }

        // can set flag hint user if leave a message
        // here directly return array dont care weather have message
        return $onlineList;
    }


}
