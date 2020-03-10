<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\User;//企业表
use App\Models\RobotExtraQa;//问答材料表

class CheckArticles
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
        $questionId = $request->question_id;
        if($questionId == null){
            $questionId = $request->answerId;
        }
        $answer = RobotExtraQa::where('id',$questionId)->first();
        if(!$answer){
            return redirect('login');
        }
        if($answer->state != 2){
            if(!Auth::check()){
                return redirect('login');
            }else if($answer->company_id == Auth::user()->id){
                return $next($request);
            }else if(User::where('id',Auth::user()->id)->first()->type == 'admin'){
                return $next($request);
            }else{
                return redirect('login');
            }
        }
        return $next($request);
    }
}
