<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Util\ResponseController;
use App\Http\Requests\GetVeriy;
use App\Http\Requests\InputVeriy;
use App\Models\ChatCommunication;
use App\Models\Chatlist;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;//用户表
use Purifier;

class ContentController extends ResponseController
{
    private $serviceID = 1;

    public function getContent(GetVeriy $request)
    {

        //    判断，登录用户是否为客服
        if (!is_numeric(User::where('id', Auth::id())->first()->type)) {
            return response()->success(100, '失败!', null);
        }

        $this->serviceID = Auth::id();

        $user_id = $request->get('userId');
        $ser_id = $this->serviceID;

        $message = DB::select("select * from chat_communication where fromid={$user_id} AND toid = {$ser_id} || toid = {$user_id} and fromid = {$ser_id}");

        $bool = $this->isRead($request);


        return $this->success($message);


    }


    public function isRead(GetVeriy $request)
    {
        if (!is_numeric(User::where('id', Auth::id())->first()->type)) {
            return response()->success(100, '失败!', null);
        }
        $user_id = $request->get('userId');
        $ser_id = Auth::user()->id;
        $bool = ChatCommunication::where('fromid', $user_id)->where('toid', $this->serviceID)->update(['isread' => 1]);
        return $bool;
    }

//    public function inputContent(InputVeriy $request){
//        $chatlist = new Chatlist();
//        $chatlist->chatTime = Carbon::now()->toDateTimeString();
//        $chatlist->chatContent = $request->input('content');
//        $chatlist->userID = $request->input('userId');
//        $chatlist->serID = $request->input('serviceId');
//        $chatlist->chatStatus = 0;
//        $chatlist->chatTransfer = $request->input('transfer');
//        $contents = $chatlist->save();
//
//        if ($contents) {
//            return $this->success();
//        } else {
//            return $this->error();
//        }
//
//    }

    public function save_message(Request $request)
    {
        $message = $request->input();
        if (!Auth::check()) {
            return response()->fail(100, '未登录!', null);
        } else if (($message['fromId'] != Auth::user()->id) && ($message['toId'] != Auth::user()->id)) {
            return response()->fail(100, '失败!', null);
        }
        //防xss
        $arr = $message['data'];
//                $ra=Array('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/','/script/','/javascript/','/vbscript/','/expression/','/applet/'
//                ,'/meta/','/xml/','/blink/','/link/','/style/','/embed/','/object/','/frame/','/layer/','/title/','/bgsound/'
//                ,'/base/','/onload/','/onunload/','/onchange/','/onsubmit/','/onreset/','/onselect/','/onblur/','/onfocus/',
//                '/onabort/','/onkeydown/','/onkeypress/','/onkeyup/','/onclick/','/ondblclick/','/onmousedown/','/onmousemove/'
//                ,'/onmouseout/','/onmouseover/','/onmouseup/','/onunload/');
//
//                if (!empty($arr))
//                {
//                    if (!is_array($arr))
//                    {
//                        if (!get_magic_quotes_gpc())  //不对magic_quotes_gpc转义过的字符使用addslashes(),避免双重转义。
//                        {
//                            $arr  = addslashes($arr); //给单引号（'）、双引号（"）、反斜线（\）与 NUL（NULL 字符）
//                        }
//                            $arr       = preg_replace($ra,'',$arr);     //删除非打印字符，粗暴式过滤xss可疑字符串
//                            $arr     = htmlentities(strip_tags($arr)); //去除 HTML 和 PHP 标记并转换为 HTML 实体
//                        }else{
//
//                    }
//                }
        //数据持久化
        $chat_communication = new ChatCommunication();
        $chat_communication->fromid = $message['fromId'];
        $chat_communication->toid = $message['toId'];
        $chat_communication->fromname = $message['fromName'];
        $chat_communication->toname = $message['toName'];
        $chat_communication->content = $arr;
        $chat_communication->type = 0;
        $chat_communication->save();
        return 200;
//

    }


}
