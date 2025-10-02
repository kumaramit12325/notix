<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PushSubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'endpoint' => 'required',
            'keys.auth' => 'required',
            'keys.p256dh' => 'required'
        ]);

        $user = Auth::user();

        $user->updatePushSubscription(
            $request->endpoint,
            $request->input('keys.p256dh'),
            $request->input('keys.auth')
        );

        return response()->json(['success' => true, 'message' => 'Push subscription added successfully']);
    }

    public function unsubscribe(Request $request)
    {
        $request->validate([
            'endpoint' => 'required',
        ]);

        $user = Auth::user();
        $user->deletePushSubscription($request->endpoint);

        return response()->json(['success' => true, 'message' => 'Push subscription removed successfully']);
    }

    public function getPublicKey()
    {
        return response()->json([
            'publicKey' => config('webpush.vapid.public_key')
        ]);
    }
}
