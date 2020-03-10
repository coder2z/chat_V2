<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;


//引入资源池
use App\Http\Controllers\Service\serverController;

use Illuminate\Http\Request;
use Auth;
use Input;
use iscms\Alisms\SendsmsPusher as Sms;
use App\Http\Requests\LoginPost;
use App\Http\Requests\Registers;
use App\Http\Requests\logins;
use App\Http\Requests\uploadPasswords;
use App\Http\Requests\getcaptchas;
use App\Models\Blacklist;//黑名单表
use App\Models\Captcha;//验证码表
use App\Models\Communication;//聊天记录表
use App\Models\Company;//企业表
use App\Models\Feedback;//意见反馈表
use App\Models\RobotExtraQa;//问答材料表
use App\Models\SetUp;//系统编制表
use App\Models\User;//用户表


define('URI1', 'questionsAndAnswers');//企业
define('URI2', 'admin/companyOperate');//管理员
define('URI3', 'service');//客服
define('TIMEOUT',60);//验证码获取超时时间
define('GETTIMEOUT',900);//验证码超时时间
class LoginController extends Controller
{
   //获取指定企业信息
   public function getCompanysInfo($id){
      $thisCompany = Company::where('chat_user_id',$id)->first();
      if($thisCompany){
        $data =[
         "company_name"=>$thisCompany->company_name,
         "url"=>$thisCompany->url,
         "default_reply"=>$thisCompany->default_reply
        ];
         return response()->success(200,'成功!',$data);
      }else{
         $data = [
            'msg' => '没有该企业！',
         ];
         return response()->fail(100,'获取信息失败!',$data);
      }
   }

   //账号登陆
   public function login(logins $request){
      //图片验证码
      $rules = ['captcha' => 'required|captcha'];
      $validator = \Validator::make($request->all(), $rules);
      if ($validator->fails()){
         return response()->fail(100,'图片验证码错误！',null);
      } 

      $credentials = $this -> credentials($request);
      if(Auth::guard('web')->attempt($credentials,false)){
         $user=User::where('tel',$credentials['tel'])->first();
         if($user -> status != 2){
            return response()->fail(100,'已被禁用!',null);
         }
         $user->token=md5(rand(10000,99999).time().env('APP_KEY'));
         $user->save();
         session(['key1'=>$user->token]);
         session(['key2'=>$user->id]);


         // 加入资源池
         (new serverController)->serverLogin($user->id);

         if($user->type == 'person'){
            $data = [
               'url' => $request -> url,//用户
            ];
            return response()->success(200,'成功!',$data);
         }else if ($user ->type == 'company') {
            $data = [
               'url' => URI1,//企业
            ];
            return response()->success(200,'成功!',$data);
         }else if ($user ->type == 'admin'){
            $data = [
               'url' => URI2,//超级管理员
            ];
            return response()->success(200,'成功!',$data);
         }else{
            $data = [
               'url' => URI3,//超级管理员
            ];
            return response()->success(200,'成功!',$data);
         }
      }else{
         $data=Auth::guard('web');
         return response()->fail(100,'账号或密码错误!',null);
      }
   }



   //账号注销
   public function loginOut(Request $request){
    if(!Auth::guard('web')->logout()){
      //移出资源池..
      (new serverController)->Logout(session('key2'));

      session(['key1' => null]);
      session(['key2' => null]);
      return redirect('/login?companyUrl='.$request->get('companyUrl'));
    }else
    {
       return response()->fail(100,'失败!',null);
    }
   }



   //个人账号注册
   public function register(Registers $request){
      $input = Input::all();
      $passwordHash = password_hash($input['password'], PASSWORD_BCRYPT);
      $input['password'] = $passwordHash;
      if(User::where('tel',$input['tel'])->first()){
         $data = [
            'tel' => '已经存在!',
         ];
         return response()->fail(100,'账号已经存在!',$data);
      }else{
      $captcha = Captcha::where('tel',$input['tel'])->where('effect' , 0)->first();
      
      //时间验证
      if($captcha){
         $nowTime = strtotime(date('Y-m-d H:i:s',time()));
         $captchaTime = strtotime($captcha->over_at);
         if($nowTime > $captchaTime){
            return response()->fail(100,"验证码已失效",null);
         }
      }







      if($captcha&&$captcha -> captcha == $input['code']){
          $user = new User();
          $user-> cname = $input['cname'];
          $user-> password = $input['password'];
          $user-> tel = $input['tel'];
          $user-> created_at = date('Y-m-d H:i:s',time());
          $user-> type = 'person';

          $user -> status = 2;

          $user->save();
          $data = [
             'url' => $input['url'],
          ];
          return response()->success(200,'注册成功成功!',$data);
          }else{
            $data = [
            'code' => '验证码错误!',
              ];
            return response()->fail(100,'验证码错误!',$data);
          }
      }

   }
   //找回密码
   public function uploadPassword(uploadPasswords $Request){
      //图片验证码
      $rules = ['captcha' => 'required|captcha'];
      $validator = \Validator::make($request->all(), $rules);
      if ($validator->fails()){
         return response()->fail(100,'图片验证码错误！',null);
      } 


   	$input = Input::all();
    if(User::where('tel',$input['tel'])->first()){
      $captcha = Captcha::where('tel',$input['tel'])->where('effect' , 1)->where('over_at','>',date('Y-m-d H:i:s',time()))->first();
      if($captcha&&$captcha -> captcha == $input['code']){
          $user = User::where('tel',$input['tel'])->first();
          $passwordHash = password_hash($input['newPassword'], PASSWORD_BCRYPT);
          $input['newPassword'] = $passwordHash;
          $user -> password=$input['newPassword'];
          $user->save();
         return response()->fail(200,'更改成功!',null);
        }else{
        $data = [
          'code'=>'验证码错误!',
        ];
        return response()->fail(100,'验证码错误!',$data);
      }
      }else{
        $data = [
          'code'=>'用户不存正!',
        ];
        return response()->fail(100,'更改失败!',$data);
      }
   }
    //获取验证码
   public function getCaptcha(getcaptchas $Request){
          $input = Input::all();
          $uesr = User::where('tel',$input['tel'])->first();
         if($uesr && $input['type']==0){
            return response()->fail(100,'此电话已注册!',null);
         }
         if(!$uesr && $input['type']==1){
            return response()->fail(100,'此电话未注册!',null);
         }
         //时间验证
               $captcha = Captcha::where('tel',$input['tel'])->where('effect' , $input['type'])->first();
               if($captcha){
                  $nowTime = strtotime(date('Y-m-d H:i:s',time()));
                  $captchaTime = strtotime($captcha->created_at);
                  if($nowTime - $captchaTime < TIMEOUT){
                     $data = (TIMEOUT-($nowTime - $captchaTime)).'s后重试!';
                     return response()->fail(100,$data,null);
                  }
               }

          $host = "http://mbyyyzm.market.alicloudapi.com";
          $path = "/mobai_voicecodesms";
          $method = "POST";
          $code=rand(100000,999999);
          $appcode = "ace1b2a4717e46beb27c292e1efa838a";
//          $appcode = "";
          $headers = array();
          array_push($headers, "Authorization:APPCODE " . $appcode);
         //  $querys = "mobile={$input['tel']}&param=code%3A$code&tpl_id=TP1711063";
          $querys = "param=code%3A{$code}&phone={$input['tel']}";
          $bodys = "";
          $url = $host . $path . "?" . $querys;
          $curl = curl_init();
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
          curl_setopt($curl, CURLOPT_URL, $url);
          curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
          curl_setopt($curl, CURLOPT_FAILONERROR, false);
          curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($curl, CURLOPT_HEADER, true);
          if (1 == strpos("$".$host, "https://"))
          {
              curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
              curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
          }
          $data =curl_exec($curl);
          if($data)
          {
            if($captcha)
            {
              $captcha-> tel = $input['tel'];
              $captcha-> captcha = $code;
              $captcha -> created_at = date('Y-m-d H:i:s',time());
              $captcha -> over_at = date('Y-m-d H:i:s',time()+GETTIMEOUT);
              $captcha->save();
            }else{
              $captcha = new Captcha;
              $captcha-> tel = $input['tel'];
              $captcha-> captcha = $code;
              $captcha -> created_at = date('Y-m-d H:i:s',time());
              $captcha -> over_at = date('Y-m-d H:i:s',time()+GETTIMEOUT);
              $captcha-> effect = $input['type'];
              $captcha->save();
            }
             return response()->success(200,'发送成功!',null);
          }else{
            return response()->fail(100,'发送失败!',null);
          }
   }

   public function suggestReturn(LoginPost $request){
      $input = Input::all();
      if(User::where('id',$input['personId'])->exists()&&Company::where('chat_user_id',$input['companyId'])->exists()&&$input['suggestion']!=NULL){
         $user = Feedback::where('person_id',$input['personId'])->first();
         if(isset($uesr)){
            $user = new Feedback();
         }
         $user-> content  = $input['suggestion'];
         $user-> company_id  = $input['companyId'];
         $user-> person_id = $input['personId'];
         $user->save();
         return response()->success(200,'提交成功!',null);
      }
      else{
         $data = [
            'companyId' => '该公司不存在!',
         ];
         /*$rules = [
               'suggestion' => 'required',
               'companyId' => 'required',
            ];

            $message = [
               'suggestion.required' => '类容不能为空',
               'companyId.required' => 'id名称不能为空',
            ];
            $validator = Validator::make($input , $rules , $message);
            $data = $validator->errors()->all();*/
         return response()->fail(100,'提交失败，请稍后重试！', $data);
      }



   }
     /**
     * 生成用户凭证
     * @param $request
     * @return array
     */
    protected function credentials($request)
    {
        return ['tel' => $request['account'], 'password' => $request['password']];
    }

    public function __construct(Sms $sms)
     {
      $this->sms=$sms;
     }

}
