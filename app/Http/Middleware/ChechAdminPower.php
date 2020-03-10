<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\User;//企业表

class ChechAdminPower
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
        if(Auth::check()){
            if(!(User::where('id',Auth::user()->id)->first()->type == 'admin')){
                return redirect('login');
            }
        }else{
            return redirect('login');
        }
        return $next($request);
    }
}
