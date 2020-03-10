<?php
/**
 * Created by PhpStorm.
 * User: JiangWei
 * Date: 2019/9/4
 * Time: 15:09
 */

namespace App\Http\Controllers\Util;



use App\Http\Controllers\Controller;

class ResponseController extends Controller
{
    public function success($data="",$msg='success'){
        $this->parseNull($data);
        $result = [
            'code'=>200,
            'msg'=>$msg,
            'data'=>$data,
        ];
        return response()->json($result,200);
    }

    public function error($code=100,$data='',$msg='error'){
        $result = [
            'code'=>$code,
            'msg'=>$msg,
            'data'=>$data
        ];
        return response()->json($result,200);
    }

    private function parseNull(&$data){
        if(is_array($data)){
            foreach($data as &$v){
                $this->parseNull($v);
            }
        }else{
            if(is_null($data)){
                $data ="";
            }
        }
    }
}