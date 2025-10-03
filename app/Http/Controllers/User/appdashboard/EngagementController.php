<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EngagementController extends Controller
{
    public function index($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        return Inertia::render('appdashboard/engagements/index', [
            'site' => $site
        ]);
    }

    public function create($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        return Inertia::render('appdashboard/engagements/create', [
            'site' => $site
        ]);
    }

    public function store(Request $request, $siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string|max:500',
            'url' => 'nullable|url',
            'icon' => 'nullable|image|max:2048',
            'audience' => 'nullable|string',
            'send_immediately' => 'nullable|boolean',
        ]);
        
        Log::info('Form data received', [
            'title' => $data['title'] ?? null,
            'message' => $data['message'] ?? null,
            'url' => $data['url'] ?? 'NOT PROVIDED',
            'has_icon' => $request->hasFile('icon'),
        ]);
        
        // Get all push subscriptions for this site
        $subscriptions = $site->pushSubscriptions;
        
        if ($subscriptions->isEmpty()) {
            return redirect()->route('site.dashboard', ['site' => $siteId])
                ->with('error', 'No subscribers found for this site.');
        }
        
        // Handle uploaded icon
        $appUrl = config('app.url');
        $iconUrl = $site->notification_icon_url ?? $appUrl . '/notix.jpg';
        
        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store('notification-icons', 'public');
            $iconUrl = $appUrl . '/storage/' . $iconPath;
        }
        
        // Prepare notification data with absolute URLs
        $notificationData = [
            'title' => $data['title'],
            'body' => $data['message'],
            'icon' => $iconUrl,
            'url' => $data['url'] ?? $site->site_url,
            'badge' => $site->badge_icon_url ?? $appUrl . '/notix.jpg',
        ];
        
        // Send notification to the site (which has push subscriptions)
        try {
            Log::info('Sending push notification', [
                'site_id' => $siteId,
                'subscribers' => $subscriptions->count(),
                'notification_data' => $notificationData
            ]);
            
            $site->notify(new \App\Notifications\PushNotification($notificationData));
            $sentCount = $subscriptions->count();
            
            Log::info('Push notification sent successfully', ['count' => $sentCount]);
            
            return redirect()->route('site.dashboard', ['site' => $siteId])
                ->with('success', "Push notification sent to {$sentCount} subscribers!");
        } catch (\Exception $e) {
            Log::error('Failed to send push notification', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->route('site.dashboard', ['site' => $siteId])
                ->with('error', 'Failed to send push notification: ' . $e->getMessage());
        }
    }
}
