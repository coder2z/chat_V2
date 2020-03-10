<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\User;//企业表

class CheckCustomerCompanyId
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
            return response()->fail(100,"未登录");
        }else if($request->serviceId != Auth::user()->id){
            return response()->fail(100,"非法id",null);
        }
        return $next($request);
    }
}
