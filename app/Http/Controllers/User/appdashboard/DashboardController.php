<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index($siteId = null)
    {
        if ($siteId) {
            $site = UserSite::findOrFail($siteId);
            
            if ($site->user_id !== Auth::id()) {
                abort(403, 'Unauthorized');
            }
            
            // Calculate real statistics
            $totalSubscribers = $site->pushSubscriptions()->count();
            
            // Get stats from the last 30 days for comparison
            $thirtyDaysAgo = now()->subDays(30);
            $subscribersLast30Days = $site->pushSubscriptions()
                ->where('created_at', '>=', $thirtyDaysAgo)
                ->count();
            
            return Inertia::render('appdashboard/dashboard', [
                'site' => $site,
                'stats' => [
                    'total_subscribers' => $totalSubscribers,
                    'subscribers_last_30_days' => $subscribersLast30Days,
                    'total_notifications' => 0, // Will track when we add notification history
                    'delivered' => 0, // Will track when we add delivery tracking
                    'clicked' => $site->clicks ?? 0,
                    'clicked_last_30_days' => 0, // Will track when we add click tracking
                ]
            ]);
        }
        
        return Inertia::render('appdashboard/dashboard');
    }
}
