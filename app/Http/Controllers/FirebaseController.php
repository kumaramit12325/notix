<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Laravel\Firebase\Facades\Firebase;

class FirebaseController extends Controller
{
    public function sendNotification(Request $request)
    {
        $messaging = Firebase::messaging();

        $message = CloudMessage::withTarget('token', $request->token)
            ->withNotification(Notification::create('Title', 'Body'));

        $messaging->send($message);

        return response()->json(['success' => true]);
    }
}
