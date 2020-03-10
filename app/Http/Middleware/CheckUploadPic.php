<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\User;//企业表

class CheckUploadPic
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
        }else if(User::where('id',Auth::user()->id)->first()->type == 'person'){
            return redirect('login');
        }
        return $next($request);
    }
}
