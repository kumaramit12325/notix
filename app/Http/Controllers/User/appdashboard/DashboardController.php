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
            
            return Inertia::render('appdashboard/dashboard', [
                'site' => $site,
                'stats' => [
                    'subscribers' => 0,
                    'notifications_sent' => 0,
                    'click_rate' => 0,
                    'conversion_rate' => 0,
                ]
            ]);
        }
        
        return Inertia::render('appdashboard/dashboard');
    }
}
