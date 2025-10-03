<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SiteSetupController extends Controller
{
    public function index($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        $appId = $site->id . '-' . $site->script_token;
        $publicKey = config('webpush.vapid.public_key');
        $appUrl = config('app.url');
        
        return Inertia::render('appdashboard/setting/setup', [
            'site' => $site,
            'app' => [
                'id' => $site->id,
                'appId' => $appId,
                'publicKey' => $publicKey,
            ],
            'settings' => [
                'appId' => $appId,
                'publicKey' => $publicKey,
            ],
            'appUrl' => $appUrl
        ]);
    }
}
