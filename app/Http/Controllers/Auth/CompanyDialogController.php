<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;//用户表
use App\Models\Company;//公司表
use App\Models\Feedback;//反馈表
use App\Models\Communication;//记录表
use Illuminate\Support\Facades\DB;

class CompanyDialogController extends Controller
{
    //通过公司id查找对应的客服id找到所有对话 返回客服名，用户名，时间
    public function getCustumerList(Request $request,$companyId){

        $customerIds = User::select("fromid","fromname","toname","toid","updated_at")->where('type',$companyId)->select('id')->get();
        $finalList = [];
        foreach ($customerIds as $key => $cutomerId) {
            # code...
            $serviceID = $cutomerId->id;
            $userList = Communication::where('toid',$serviceID)->groupby('fromid')->distinct()->get();
            $userList = json_decode(json_encode($userList),true);
            $finalList = array_merge($finalList,$userList);

        }
    // $serviceID = 1;
        // dd($finalList);

//        return $userList;

//按照时间排序；
// $dataTime = array();
// $finalList = json_decode(json_encode($finalList),true);
// foreach ($finalList as $key => $value) {
//     # code...
//     $dataTime[] = $value['updated_at'];
// }
// array_multisort($dataTime,SORT_DESC,$finalList);
//分页
                $currentPage = \Illuminate\Pagination\LengthAwarePaginator::resolveCurrentPage();
                $itemCollection = collect($finalList);
                $perPage = 10; // 每页数量
                $currentPageItems = $itemCollection->slice(($currentPage*$perPage)-$perPage,$perPage)->all();
                $paginatedItems = new \Illuminate\Pagination\LengthAwarePaginator($currentPageItems,count($itemCollection),$perPage);


return response()->success(200,'成功!',$paginatedItems->setPath($request->url()));
//        return $this->serverID();


        



    }



    //通过客服id 用户id查找对应对话
    public function getDialog(Request $request){

        $user_id = $request->get('userId');
        $ser_id = $request->get('serId');

        $message = DB::select("select * from chat_communication where fromid={$user_id} AND toid = {$ser_id} || toid = {$user_id} and fromid = {$ser_id}");

        if(!$message){
            return response()->success(100,'错误!',null);
        }
        return response()->success(200,'成功!',$message);
    }
    //通过客户id 客服id查看反馈信息
    public function getDialogFeedback(Request $request){
        $user_id = $request->get('userId');
        $ser_id = $request->get('serId');
        $ser = User::find($ser_id);
        $feedback = Feedback::where('company_id',$ser->type)->where('person_id',$user_id)->first();
        if($feedback){
            return response()->success(200,'成功!',$feedback);
        }else{
            return response()->success(200,'该用户没有反馈信息!',null);
        }
    }
}
