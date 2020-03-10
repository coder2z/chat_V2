<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\RobotExtraQa;//问答材料表

class CheckQuestionCompanyId
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
            return redirect('login');
        }else if(Auth::user()->id != $request->companyid){
            return response()->fail(100,"非法id");
        }
        return $next($request);
    }
}
