<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Auth;

class Login
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if(!session('key1')){
            return response()->success(100,'没有登陆，请点击右上角登陆！',null);
        }else{
            $user =User::find(session('key2'));
            if(session('key1')!=$user -> token){
                return response()->success(100,'没有登陆，请点击右上角登陆！',null);
            }else{
                if($request->personId != Auth::user()->id){
                    return response()->success(100,'非法id',null);
                }
                return $next($request);
            }
        }
        
    }
}
