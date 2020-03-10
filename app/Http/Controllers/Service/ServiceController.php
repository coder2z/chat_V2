<?php
namespace App\Http\Controllers\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blacklist;//黑名单表
use App\Models\User;//用户表
use Input;
use App\Http\Requests\uploadBlackLists;
class ServiceController extends Controller
{
    public function uploadBlackList(uploadBlackLists $Request){
    	$input=Input::all();
    	$a=User::where('id',$input['serviceId'])->first();
    	$user = new Blacklist();
    	$data = [
    		'imgUrl' => $input['imgUrl'],
    		'content' => $input['content']
    	];
    	/*response()->json(['data'=>$data])*/
    	 /*dd($data->toJson());*/
    	$user -> company_id = $a -> type;
        $user -> person_id = $input['personId'];
	    $user-> credential= json_encode($data);
	    $user-> service_id = $input['serviceId'];
	    $user -> created_at = date('Y-m-d H:i:s',time());
	    $user-> state = 1;
	    if($user->save()){
	    	return response()->success(200,'提交成功',null);
	    }else{
	    	 $data = [
            'shibai'=>'失败',
         ];
	    	return response()->success(100,'提交失败',$data);
	    }
    }
}