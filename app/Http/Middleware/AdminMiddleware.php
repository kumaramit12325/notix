<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
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

        if (!Auth::user()->isAdmin()) {
            // Redirect based on user role instead of logging out
            $user = Auth::user();
            
            if ($user->isAgent()) {
                return redirect()->route('agent.dashboard');
            } else {
                return redirect()->route('user.dashboard');
            }
        }

        return $next($request);
    }
} 