<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SiteConfigController extends Controller
{
    public function index($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        return inertia('appdashboard/setting/site-config', [
            'site' => $site
        ]);
    }
    
    public function update(Request $request, $siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'url' => 'sometimes|url|max:255',
            'notification_icon_url' => 'sometimes|nullable|url|max:500',
            'badge_icon_url' => 'sometimes|nullable|url|max:500',
            'remove_powered_by' => 'sometimes|boolean',
            'universal_subscription_link' => 'sometimes|boolean',
        ]);
        
        $site->update($validated);
        
        return redirect()->back()->with('success', 'Site configuration updated successfully!');
    }
}
