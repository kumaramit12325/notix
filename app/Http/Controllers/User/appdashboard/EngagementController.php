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
        
        // Get all push subscriptions for this site
        $subscriptions = $site->pushSubscriptions;
        
        if ($subscriptions->isEmpty()) {
            return redirect()->route('site.dashboard', ['site' => $siteId])
                ->with('error', 'No subscribers found for this site.');
        }
        
        // Prepare notification data
        $notificationData = [
            'title' => $data['title'],
            'body' => $data['message'],
            'icon' => $site->notification_icon_url ?? '/notix.jpg',
            'url' => $data['url'] ?? $site->site_url,
            'badge' => $site->badge_icon_url ?? '/notix.jpg',
        ];
        
        $sentCount = 0;
        $failedCount = 0;
        
        // Get unique users from subscriptions and send notifications
        $users = $subscriptions->map(function ($subscription) {
            return $subscription->subscribable;
        })->unique('id')->filter();
        
        foreach ($users as $user) {
            try {
                $user->notify(new \App\Notifications\PushNotification($notificationData));
                $sentCount++;
            } catch (\Exception $e) {
                $failedCount++;
                \Log::error('Failed to send push notification: ' . $e->getMessage());
            }
        }
        
        return redirect()->route('site.dashboard', ['site' => $siteId])
            ->with('success', "Push notification sent to {$sentCount} users!" . ($failedCount > 0 ? " ({$failedCount} failed)" : ''));
    }
}
