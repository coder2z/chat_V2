<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\Blacklist;

class CheckBlackCompany
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
        if(Blacklist::where('id',$request->black_id)->first()->company_id == Auth::user()->id){
            return $next($request);
        }else{
            return response()->fail(100,"非法id",null);
        }
    }
}
