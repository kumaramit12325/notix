<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            return redirect()->route('site.dashboard', $siteId)
                ->with('error', 'No subscribers found for this site.');
        }
        
        // Prepare notification payload
        $payload = json_encode([
            'title' => $data['title'],
            'body' => $data['message'],
            'icon' => $site->notification_icon_url ?? '/notix.jpg',
            'url' => $data['url'] ?? $site->site_url,
            'badge' => $site->badge_icon_url ?? '/notix.jpg',
        ]);
        
        $sentCount = 0;
        $failedCount = 0;
        
        // Send notification to each subscriber
        foreach ($subscriptions as $subscription) {
            try {
                $subscription->notify(new \App\Notifications\PushNotification($payload));
                $sentCount++;
            } catch (\Exception $e) {
                $failedCount++;
                \Log::error('Failed to send push notification: ' . $e->getMessage());
            }
        }
        
        return redirect()->route('site.dashboard', $siteId)
            ->with('success', "Push notification sent to {$sentCount} subscribers!" . ($failedCount > 0 ? " ({$failedCount} failed)" : ''));
    }
}
