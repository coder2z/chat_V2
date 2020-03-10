<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\Blacklist;//企业表

class CheckBlackId
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
        if(!Auth::check()){
            return response()->fail(100,"未登录",null);
        }else if (Blacklist::where('id',$request->id)->first()) {
            if((Blacklist::where('id',$request->id)->first()->company_id) == (Auth::user()->id)){
                return $next($request);
            }else{
                return response()->fail(100,"并非您的黑名单",null);
            }
        }else{
            return response()->fail(100,"并非您的黑名单",null);
        }       
    }
}
