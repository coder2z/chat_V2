<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Models\User;

class ChechCompanyPower
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
        }else if(User::where('id',Auth::user()->id)->first()->type == 'company'){
            return $next($request);
        }else{
            return redirect('login');
        }
    }
}
