<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SetUp;
use App\Http\Requests\UpdateSmsPost;
use App\Http\Requests\UpdateWsPost;

class AdminOtherSettingController extends Controller
{
	//获取短信接口
    public function getSmsInfo()
    {
    	$data=SetUp::find(1);
    	$other_sms_address=$data->message_api;
    	$array['other_sms_address']=$other_sms_address;
    	return response()->success(200,'成功',$array);
    }

    //修改短信接口
    public function updateSmsInfo(UpdateSmsPost $request)
    {
    	$data = $request->other_sms_address;
    	$set=SetUp::find(1);
    	$set->message_api=json_encode($data);
    	$set->save();
    	$array['other_sms_address']=$data;
    	return response()->success(200,'成功',$array);
    }

    //获取ws地址
    public function getWsInfo()
    {
    	$data=SetUp::find(1);
    	$other_ws_address=$data->ws_url;
    	$array['other_ws_address']=$other_ws_address;
    	return response()->success(200,'成功',$array);
    }

    //修改ws地址
    public function updateWsInfo(UpdateWsPost $request)
    {
    	$data=$request->other_ws_address;
    	$set=SetUp::find(1);
    	$set->ws_url=$data;
    	$set->save();
    	$array['other_ws_address']=$data;

    	return response()->success(200,"成功",$array);
    }

}
