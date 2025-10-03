<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PublicPushSubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'app_id' => 'required|string',
            'endpoint' => 'required|string',
            'keys.auth' => 'required|string',
            'keys.p256dh' => 'required|string'
        ]);
        
        $appId = $request->app_id;
        $parts = explode('-', $appId, 2);
        
        if (count($parts) < 2) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid app_id format. Expected format: siteId-token'
            ], 400);
        }
        
        $siteId = $parts[0];
        $token = $parts[1];
        
        $site = UserSite::find($siteId);
        
        if (!$site) {
            return response()->json([
                'success' => false,
                'message' => 'Site not found'
            ], 404);
        }
        
        if ($site->script_token !== $token) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid site token'
            ], 403);
        }
        
        $existingSubscription = DB::table('push_subscriptions')
            ->where('endpoint', $request->endpoint)
            ->first();
        
        if ($existingSubscription) {
            return response()->json([
                'success' => true,
                'message' => 'Already subscribed'
            ]);
        }
        
        DB::table('push_subscriptions')->insert([
            'user_site_id' => $site->id,
            'subscribable_type' => 'App\\Models\\UserSite',
            'subscribable_id' => $site->id,
            'endpoint' => $request->endpoint,
            'public_key' => $request->input('keys.p256dh'),
            'auth_token' => $request->input('keys.auth'),
            'content_encoding' => 'aes128gcm',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Successfully subscribed to push notifications'
        ]);
    }
    
    public function unsubscribe(Request $request)
    {
        $request->validate([
            'app_id' => 'required|string',
            'endpoint' => 'required|string'
        ]);
        
        $appId = $request->app_id;
        $parts = explode('-', $appId, 2);
        
        if (count($parts) < 2) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid app_id format. Expected format: siteId-token'
            ], 400);
        }
        
        $siteId = $parts[0];
        $token = $parts[1];
        
        $site = UserSite::find($siteId);
        
        if (!$site) {
            return response()->json([
                'success' => false,
                'message' => 'Site not found'
            ], 404);
        }
        
        if ($site->script_token !== $token) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid site token'
            ], 403);
        }
        
        DB::table('push_subscriptions')
            ->where('endpoint', $request->endpoint)
            ->where('user_site_id', $site->id)
            ->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Successfully unsubscribed'
        ]);
    }
    
    public function getVapidKey()
    {
        return response()->json([
            'publicKey' => config('webpush.vapid.public_key')
        ]);
    }
}
