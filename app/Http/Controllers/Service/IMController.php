<?php
/**
 * Created by PhpStorm.
 * User: JiangWei
 * Date: 2019/9/5
 * Time: 11:06
 */

namespace App\Http\Controllers\Service;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
//引入资源池
use App\Http\Controllers\Service\serverController;


class IMController extends Controller
{
//     private $serId = 1;
//     private $serName = "蒋武君";
//     private $userId = 2;
//     private $userName = "江威";
  public function serviceIndex(){
      if(Auth::check()){
        $serId = Auth::user()->id;
        $serName = Auth::user()->cname;
        return view('service')->with(['serId'=>$serId,'serName'=>$serName]);
      }else{
          return redirect('login');
      }
  }

  public function customer($url){
    $company = Company::where("url",$url)->first();
    if(!$company){
      return response()->view('errors404');
      // return response()->fail(100,'失败',null);
    }
    $href = '../login';
    $userName = '请登录';
    $userId = null;
    $serId = null;
    $serName = null;
    if(Auth::check()){
        // $serId = (new serverController)->getServerId();
        // if(User::where('id',$serId)->select('type')->first() != $company->chat_user_id){
        //     return '公司客服不在线!';
        // }
        // $ser = User::where("id",$serId)->first();
        //拿出第一个客服
        $ser = User::where("type",$company->chat_user_id)->first();
        if(!$ser){
          return view('customer')->with(['href'=>$href.'?companyUrl=/'.$company->url,'userId'=>$userId,
          'userName'=>$userName,'companyName'=>$company->company_name,
          'defaultReply'=>$company->default_reply,
          'serId'=>$serId,'serName'=>$serName,'companyUrl'=>'/'.$company->url,
          'companyId'=>$company->chat_user_id,
          ]);
        }
        //dd((new serverController)->getServerId());
          //从资源池拿出客服
        // $ser = User::where("id",(new serverController)->getServerId())->first();

   
        
        
        // $serId = (new serverController)->getServerId();


        $serId = $ser->id;
        $serName = $ser->cname;
        $userId = Auth::user()->id;
        $userName = Auth::user()->cname;
        $href = '../loginOut';
    }
    return view('customer')->with(['href'=>$href.'?companyUrl=/'.$company->url,'userId'=>$userId,
    'userName'=>$userName,'companyName'=>$company->company_name,
    'defaultReply'=>$company->default_reply,
    'serId'=>$serId,'serName'=>$serName,'companyUrl'=>'/'.$company->url,
    'companyId'=>$company->chat_user_id,
    ]);
  }

}