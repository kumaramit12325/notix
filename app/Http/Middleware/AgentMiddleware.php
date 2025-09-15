<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AgentMiddleware
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
        
        // If user is regular user, redirect to user dashboard
        if ($user->isUser()) {
            return redirect()->route('user.dashboard');
        }

        // Agents can access agent routes
        return $next($request);
    }
}
