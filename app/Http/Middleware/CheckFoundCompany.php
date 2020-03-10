<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\User;//企业表

class CheckFoundCompany
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
        if(User::where('id',$request->serId)->first()->type == Auth::user()->id){
            return $next($request);
        }else{
            return response()->fail(100,"非法id",null);
        }
    }
}
