<?php

namespace App\Http\Controllers\Auth;

use App\Models\Blacklist;
use App\Models\Communication;
use App\Models\Company;
use App\Models\RobotExtraQa;
use App\Models\User;
use App\Models\CommunicationList;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Http\Requests\TableVerify;
use App\Http\Requests\ContentVerify;


class CompanyController extends Controller
{
    //获取所有当前企业的问题
    public function getAllQuestionsInfo($id){
        $res = DB::table("chat_robot_extra_qa as t1")
            ->leftJoin("chat_user as t3","t3.id","=","t1.company_id")
            ->select("t1.id","t1.title","t1.created_at","t1.clicks","t3.cname as company_name","t1.access_at","t1.state")
            // ->leftJoin("chat_company as t2","t1.company_id","=","t2.id")
            ->where("t1.company_id",$id)
            ->paginate(10);
        if($res) {
            return response()->success(200,"成功",$res);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //获取所有当前企业的问题 上传状态
    public function getAllQuestionsInfoByState(Request $request,$id){
        if($request->state>2 || $request->state <0){
            return response()->fail(100,"失败");
        }
        $res = DB::table("chat_robot_extra_qa as t1")
            ->leftJoin("chat_user as t3","t3.id","=","t1.company_id")
            ->select("t1.id","t1.title","t1.created_at","t1.clicks","t3.cname as company_name","t1.access_at","t1.state")
            // ->leftJoin("chat_company as t2","t1.company_id","=","t2.id")
            ->where("t1.company_id",$id)
            ->where("state",$request->state)
            ->paginate(10);
        if($res) {
            return response()->success(200,"成功",$res);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //新增问题/**/
    public function addQuestion(TableVerify $request,$id){
        $res = User::find($id);
        if($res == null){
            return response()->fail(100,"企业账号不存在");
        }
        $data = DB::table("chat_user")->select('type')->where('id',$id)->get();
        foreach($data as $v)
        {
            $res = $v->type;
        }
        if($res == 'company' || $res == 'admin'){
            $res = DB::table("chat_robot_extra_qa")
                ->insert([
                    "title"=>$request->title,
                    "synopsis"=>$request->intro,
                    "step"=>$request->Method,
                    "matter_need_atten"=>$request->warning,
                    "created_at"=>date("Y-m-n h:i:s"),
                    "access_at"=>date("Y-m-n h:i:s"),
                    "state"=>1,
                    "company_id"=>$id
                ]);
        } else{
            return response()->fail(100,"新增问题失败");
        }
        return response()->success(200,"成功",null);
    }
    //查看客服问答
    public function showQuestions($id){
        $user_id = DB::table("chat_user")->select("id")->where("type",$id)->get();
        $arr = array();
        $arr1 = array();
        foreach ($user_id as $v){
              $a = DB::table("chat_user as t1")
                ->leftJoin("chat_communication as t2","t1.id","t2.fromid")
                ->select("t2.fromname as name","t2.created_at as time","t2.content","t2.toid","t2.fromid","t2.fromname","t2.toname")
                ->orderBy("t2.created_at","DESC")
                ->where("t2.fromid",$v->id)
                ->get();
              if(count($a)==0){
                continue;
              }else {
                  $arr[] = $a;
              }
        }
        foreach ($arr as $y) {
            $ooo = -1;
            foreach ($y as $i) {
                if ($i->toid != $ooo) {
                    $p = [
                        'name' => $i->name,
                        'time' => $i->time,
                        'content' => $i->content,
                        'fromid' => $i->fromid,
                        'fromname' => $i->fromname,
                        'toname' => $i->toname,
                        'toid' => $i->toid
                    ];
                   $arr1[] = $p;
                    $ooo = $i->toid;
                }
            }
        }
        if($arr1) {
            return response()->success(200,"成功",$arr1);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //获取首句内容
    public function getFirstContent($id){
        $res = DB::table("chat_company as t1")
            ->select("t1.default_reply as firstContent")
            ->leftJoin("chat_user as t2","t1.chat_user_id","=","t2.id")
            ->where("t2.id","=",$id)
            ->get();
        if($res) {
            return response()->success(200,"成功",$res);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //修改首句内容put
    public function updateFirstContent(ContentVerify $request,$id){
        $res = DB::table("chat_company as t1")
            ->leftJoin("chat_user as t2","t1.chat_user_id","=","t2.id")
            ->where("t2.id",$id)
            ->update([
                "default_reply"=>$request->content,
            ]);
        if($res) {
            return response()->success(200,"成功",null);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //显示热门问题get
    public function showHotQuestions($id){
        $res = DB::table("chat_robot_extra_qa as t1")
            // ->leftJoin("chat_company as t2","t1.company_id","=","t2.id")
            // ->leftJoin("chat_user as t3","t3.id","=","t2.chat_user_id")
            ->select("t1.id","t1.clicks as hot","t1.title as question")
            ->orderBy("t1.clicks","DESC")
            ->where("t1.company_id",$id)
            ->paginate(10);
        if($res) {
            return response()->success(200,"成功",$res);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //返回指定客服聊天记录
    public function getRecordDetail($id){
        $res = DB::table("chat_communication")
            ->select("id","fromid","fromname","toid","toname","content","created_at as updated_at")
            ->where("fromid","=",$id)
            ->orderBy("created_at","asc")
            ->paginate(10);
        if($res) {
            return response()->success(200,"成功",$res);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //显示所有黑名单
    public function getAllBalckLists($id){//企业id
        // $res = DB::table("chat_blacklist as t1")
        //     ->leftJoin("chat_user as t2","t1.person_id","=","t2.id")
        //     ->leftJoin("chat_company as t3","t3.id","=","t1.company_id")
        //     ->select("t2.id as userID","t2.cname as name","t2.tel as phone","t1.created_at as forbidden_time","t1.state as status")
        //     //->where("t3.id",$id)
        //     ->paginate(10);
        // if($res) {
        //     return response()->success(200,"成功",$res);
        // }else{
        //     return response()->fail(100,"失败");
        // }

        $res = DB::table("chat_blacklist as t1")
            // ->leftJoin("chat_communication as t3","t3.fromid","=","t1.service_id")
            // ->leftJoin("chat_company as t4","t4.id","=","t1.company_id")
            ->leftJoin("chat_user as t2","t2.id","=","t1.person_id")
            ->leftJoin("chat_user as t3","t3.id","=","t1.company_id")
            ->leftJoin("chat_user as t4","t4.id","=","t1.service_id")
            ->select("t2.id as userID","t2.cname as name",
                "t4.cname as serviceName","t2.tel as phone",
                "t1.created_at as forbidden_time",
                "t3.cname as forbidden_company",
                "t1.state as status",
                "t1.id as black_list_id")
            ->where("t1.company_id","=",$id)
            ->paginate(10);
        if($res) {
            return response()->success(200,"成功",$res);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //显示指定黑名单详细内容
    public function showBlackList($id){//黑名单ID
        $res = DB::table("chat_blacklist as t1")
            ->leftJoin("chat_user as t2","t1.person_id","=","t2.id")
            ->select("t2.id as account","t2.cname as name","t2.tel as phone","t1.credential as evidence")
            ->where("t1.id",$id)
            ->get();
        if($res) {
            return response()->success(200,"成功",$res);
        }else{
            return response()->fail(100,"失败");
        }
    }
    //将指定黑名单人员移除黑名单
    public function removeBlackList($id){
        $res = DB::table("chat_blacklist")
            ->where("id",$id)
            ->delete();
        if($res) {
            return response()->success(200,"成功",null);
        }else{
            return response()->fail(100,"黑名单人员不存在");
        }
    }
    //将指定黑名单人员加入黑名单put
    public function addBlackList($id){
        $res = Blacklist::find($id);
        if($res == null){
            return response()->fail(100,"黑名单内无此人员");
        }
        $res = DB::table('chat_blacklist')
            ->select('state')
            ->where('id',$id)
            ->get();
        $data = 0;
        foreach ($res as $v)
        {
            $data = $v->state;
        }
        if($data == 0){
            return response()->fail(100,"此人员以在黑名单内");
        }else{
            Blacklist::find($id)->update([
                'state' => 0,
            ]);
            return response()->success(200,"成功",null);
        }
    }
    //修改黑名单状态 by lck
    public function updateBalckList(Request $request){
        $blackId = $request->get('black_id');
        $state = $request->get('black_state');
        if($state<0 || $state>2){
            return response()->fail(100,"输入错误");
        }
        $blackDetail = Blacklist::where('id',$blackId)->first();
        $blackDetail->state = $state;
        if($blackDetail->save()){
            return response()->success(200,"成功",null);
        }else{
            return response()->fail(100,"数据库失败");
        }
        
    }











    

    public function searchInfo(Request $request,$id){
        $data1 = null;
        $data2 = null;
        $data3 = null;
        $result=$request->all();
        if($result["search_content"] == null){
            return response()->fail(100,"未查询到结果");
        }
        $search_content=$result["search_content"];
        $res1 = DB::table("chat_blacklist as t1")
            ->leftJoin("chat_user as t2","t2.id","=","t1.person_id")
            ->leftJoin("chat_user as t3","t3.id","=","t1.company_id")
            ->leftJoin("chat_user as t4","t4.id","=","t1.service_id")
            ->select("t2.id as userID","t2.cname as name",
                "t4.cname as serviceName","t2.tel as phone",
                "t1.created_at as forbidden_time",
                "t3.cname as forbidden_company",
                "t1.state as status",
                "t1.id as black_list_id")
            ->where("t1.company_id","=",$id)
            ->where("t2.cname","like","%".$search_content."%")
            ->paginate(10);
        $res2 = DB::table("chat_blacklist as t1")
            ->leftJoin("chat_user as t2","t2.id","=","t1.person_id")
            ->leftJoin("chat_user as t3","t3.id","=","t1.company_id")
            ->leftJoin("chat_user as t4","t4.id","=","t1.service_id")
            ->select("t2.id as userID","t2.cname as name",
                "t4.cname as serviceName","t2.tel as phone",
                "t1.created_at as forbidden_time",
                "t3.cname as forbidden_company",
                "t1.state as status",
                "t1.id as black_list_id")
            ->where("t1.company_id","=",$id)
            ->where("t2.tel","like","%".$search_content."%")
            ->paginate(10);
        $res3 = DB::table("chat_blacklist as t1")
            ->leftJoin("chat_user as t2","t2.id","=","t1.person_id")
            ->leftJoin("chat_user as t3","t3.id","=","t1.company_id")
            ->leftJoin("chat_user as t4","t4.id","=","t1.service_id")
            ->select("t2.id as userID","t2.cname as name",
                "t4.cname as serviceName","t2.tel as phone",
                "t1.created_at as forbidden_time",
                "t3.cname as forbidden_company",
                "t1.state as status",
                "t1.id as black_list_id")
            ->where("t1.company_id","=",$id)
            ->where("t4.cname","like","%".$search_content."%")
            ->paginate(10);
        foreach ($res1 as $v){
            $data1 = $v->userID;
        }
        foreach ($res2 as $v){
            $data2 = $v->userID;
        }
        foreach ($res3 as $v){
            $data3 = $v->userID;
        }
        if($data1 == null && $data2 == null && $data3 == null){
            return response()->fail(100,"未查询到结果");
        } else if($data1 !=null){
            return response()->success(200,"成功",$res1);
        } else if($data2 !=null){
            return response()->success(200,"成功",$res2);
        } else{
            return response()->success(200,"成功",$res3);
        }
    }

public function showInfo(Request $request,$id){
        $data = null;
        if($request->state == null){
            return response()->fail(100,"未查询到相关结果");
        }
        $state = $request->state;
        $res = DB::table("chat_blacklist as t1")
            ->leftJoin("chat_user as t2","t2.id","=","t1.person_id")
            ->leftJoin("chat_user as t3","t3.id","=","t1.company_id")
            ->leftJoin("chat_user as t4","t4.id","=","t1.service_id")
            ->select("t2.id as userID","t2.cname as name",
                "t4.cname as serviceName","t2.tel as phone",
                "t1.created_at as forbidden_time",
                "t3.cname as forbidden_company",
                "t1.state as status",
                "t1.id as black_list_id")
            ->where("t1.company_id","=",$id)
            ->where("t1.state","=",$state)
            ->paginate(10);
        // foreach ($res as $v){
        //     $data = $v->userID;
        // }
        // if($data == null){
        //     return response()->fail(100,"未查询到相关结果");
        // }else{
            return response()->success(200,"成功",$res);
        // }
    }


}
