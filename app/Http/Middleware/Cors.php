<?php

namespace App\Http\Middleware;

use Closure;

class Cors
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
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:8080')
            ->header('Access-Control-Allow-Headers', '*', 'X-Requested-With', 'Content-Type', 'X-Token-Auth', 'content-type')
            ->header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
    }
}
