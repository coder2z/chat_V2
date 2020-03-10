<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\RobotExtraQa;//问答材料表

class CheckQuestionId
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
            return response()->success(100,'失败！',null);
        }
        if($request->question_id != null){
            // dd((RobotExtraQa::where('id',$request->question_id)->first()->company_id) == Auth::user()->id);
            if((RobotExtraQa::where('id',$request->question_id)->first()->company_id) == Auth::user()->id){ 
                return $next($request);
            }else{
                return response()->success(100,'失败！',null);
            }
        }else{
            return response()->success(100,'失败！',null);
        }
    }
}
