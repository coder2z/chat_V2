<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class ViewsController extends Controller
{
    //注册
    public function showRegister(Request $request){
        $companyUrl = $request->get('companyUrl');
        return view('reg')->with(['companyUrl'=>$companyUrl]);
    }
    //登陆
    public function showLogin(Request $request){
        $companyUrl = $request->get('companyUrl');
        return view('login')->with(['companyUrl'=>$companyUrl]);
    }
    //文章
    public function showArticles($answerId){
        return view('preview');
    }
    //找回密码
    public function findPassword(Request $request){
        $companyUrl = $request->get('companyUrl');
        return view('find-password')->with(['companyUrl'=>$companyUrl]);
    }
    //admin 超级管理员界面
    public function companyOperate(){
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('account-manage')->with(['userName'=>$userName]);
          }else{
              return redirect('login');
          }
    }
    public function serviceManage(){
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('service-manage')->with(['userName'=>$userName]);
          }else{
              return redirect('login');
          }
    }
    public function materialEdit(){
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('material-edit')->with(['userName'=>$userName]);
          }else{
              return redirect('login');
          }
    }
    public function personalAccount(){
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('personal-account')->with(['userName'=>$userName]);
          }else{
              return redirect('login');
          }
    }
    public function otherSetting(){
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('other-setting')->with(['userName'=>$userName]);
          }else{
              return redirect('login');
          }
    }
    //企业用户界面
    public function balckUser(){
        // return view('balck-user');
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('balck-user')->with(['userName'=>$userName,'companyId'=>$userId]);
          }else{
              return redirect('login');
          }
    }
    public function questionsAndAnswers(){
        // return view('Questions-and-answers');
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('Questions-and-answers')->with(['userName'=>$userName,'companyId'=>$userId]);
          }else{
              return redirect('login');
          }
    }
    public function lookSolve(){
        // return view('look-solve');
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('look-solve')->with(['userName'=>$userName,'companyId'=>$userId]);
          }else{
              return redirect('login');
          }
    }
    public function setData(){
        // return view('set-data');
        if(Auth::check()){
            $userId = Auth::user()->id;
            $userName = Auth::user()->cname;
            return view('set-data')->with(['userName'=>$userName,'companyId'=>$userId]);
          }else{
              return redirect('login');
          }
    }
    
}
