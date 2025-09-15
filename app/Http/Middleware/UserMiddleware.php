<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        
        // If user is admin, redirect to admin dashboard
        if ($user->isAdmin()) {
            return redirect()->route('dashboard');
        }
        
        // If user is agent, redirect to agent dashboard
        if ($user->isAgent()) {
            return redirect()->route('agent.dashboard');
        }

        // Regular users can access user routes
        return $next($request);
    }
}
