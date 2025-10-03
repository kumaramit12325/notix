<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    public function index($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        $subscribers = DB::table('push_subscriptions')
            ->where('user_site_id', $siteId)
            ->select([
                'id',
                'endpoint',
                'created_at',
                'updated_at'
            ])
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('appdashboard/Subscribers/index', [
            'site' => $site,
            'subscribers' => $subscribers
        ]);
    }
}