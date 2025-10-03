<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SegmentController extends Controller
{
    public function index($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        // Get total subscribers for this site
        $totalSubscribers = DB::table('push_subscriptions')
            ->where('user_site_id', $siteId)
            ->count();
        
        // Get recent signups (last 30 days)
        $recentSignups = DB::table('push_subscriptions')
            ->where('user_site_id', $siteId)
            ->where('created_at', '>=', now()->subDays(30))
            ->count();
        
        // Build default segments with real data
        $segments = [];
        
        if ($totalSubscribers > 0) {
            $segments[] = [
                'id' => 1,
                'name' => 'All Subscribers',
                'description' => 'All active subscribers on your site',
                'subscribers' => $totalSubscribers,
                'image' => '/images/heart-hand.png',
            ];
        }
        
        if ($recentSignups > 0) {
            $segments[] = [
                'id' => 2,
                'name' => 'New Signups',
                'description' => 'Users who joined in last 30 days',
                'subscribers' => $recentSignups,
                'image' => '/images/rocket.png',
            ];
        }
        
        return Inertia::render('appdashboard/Segment/index', [
            'site' => $site,
            'segments' => $segments
        ]);       
    }
}