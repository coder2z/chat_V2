<?php
/**
 * This file is part of workerman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link http://www.workerman.net/
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 用于检测业务代码死循环或者长时间阻塞等问题
 * 如果发现业务卡死，可以将下面declare打开（去掉//注释），并执行php start.php reload
 * 然后观察一段时间workerman.log看是否有process_timeout异常
 */

//declare(ticks=1);

use \GatewayWorker\Lib\Gateway;

use Illuminate\Support\Facades\Auth;

/**
 * 主逻辑
 * 主要是处理 onConnect onMessage onClose 三个方法
 * onConnect 和 onClose 如果不需要可以不用实现并删除
 */
class Events
{
    /**
     * 当客户端连接时触发
     * 如果业务不需此回调可以删除onConnect
     *
     * @param int $client_id 连接id
     */
    public static function onConnect($client_id)
    {


//        // 向当前client_id发送数据
//        Gateway::sendToClient($client_id, "Hello $client_id\r\n");
//        // 向所有人发送
//        Gateway::sendToAll("$client_id login\r\n");
        

        Gateway::sendToClient($client_id, json_encode([
            'type' => 'init',
            'client_id' => $client_id
        ]));


//        Gateway::bindUid($client_id,$uid);
    }


    /**
     * 当客户端发来消息时触发
     * @param int $client_id 连接id
     * @param mixed $message 具体消息
     */
    public static function onMessage($client_id, $message)
    {
        $message_data = json_decode($message, true);

        if (!$message_data) {
            return;
        }

        switch ($message_data['type']) {
            case "bind":
                $fromid = $message_data['fromid'];
                Gateway::bindUid($client_id, $fromid);
                return;
            case "say":



                $clientArray = Gateway::getClientIdByUid($message_data['fromId']);
                if(!empty($clientArray)){
                    foreach ($clientArray as $key => $value) {
                        if($value != $client_id){
                            return;
                        }
                    }
                }
		
				$arr = $message_data['data'];
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














                $toid = $message_data['toId'];
                $data = [
                    'type' => 'text',
                    'data' => $arr,
                    'fromId' => $message_data['fromId'],
                    'fromName' => $message_data['fromName'],
                    'toId' => $message_data['toId'],
                    'toName' => $message_data['toName']
                ];
                Gateway::sendToUid($toid, json_encode($data));





            // 向所有人发送
//                Gateway::sendToAll(json_encode($data));

        }

    }

    /**
     * 当用户断开连接时触发
     * @param int $client_id 连接id
     */
    public static function onClose($client_id)
    {
//        // 向所有人发送
//        GateWay::sendToAll("$client_id logout\r\n");
    }
}
