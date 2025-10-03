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
            'title' => 'required|string|max:60',
            'message' => 'required|string|max:120',
            'url' => 'nullable|url',
            'icon' => 'nullable|image|max:2048',
            'showLargeImage' => 'nullable|boolean',
            'addActionButtons' => 'nullable|boolean',
            'notificationDuration' => 'nullable|boolean',
            'utmParameters' => 'nullable|boolean',
        ]);
        // TODO: Save to Engagement model/table with site_id
        // For now, just return a success response
        return redirect()->route('site.engagements.index', $siteId)->with('success', 'Engagement (Push Notification) saved successfully!');
    }
}
