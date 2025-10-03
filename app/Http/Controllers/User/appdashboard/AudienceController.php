<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use App\Models\Audience;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AudienceController extends Controller
{
    public function index($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        $audiences = Audience::where('user_site_id', $siteId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('appdashboard/audience/index', [
            'site' => $site,
            'audiences' => $audiences
        ]);       
    }

    public function create($siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        return Inertia::render('appdashboard/audience/create', [
            'site' => $site
        ]);       
    }
    
    public function store(Request $request, $siteId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);
        
        Audience::create([
            'user_site_id' => $siteId,
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);
        
        return redirect()->route('site.audiences.index', $siteId)
            ->with('success', 'Audience group created successfully');
    }
    
    public function destroy($siteId, $audienceId)
    {
        $site = UserSite::findOrFail($siteId);
        
        if ($site->user_id !== Auth::id()) {
            abort(403);
        }
        
        $audience = Audience::where('user_site_id', $siteId)
            ->findOrFail($audienceId);
            
        $audience->delete();
        
        return redirect()->route('site.audiences.index', $siteId)
            ->with('success', 'Audience group deleted successfully');
    }
}