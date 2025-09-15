<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserSiteController extends Controller
{
    /**
     * Display a listing of the user's sites.
     */
    public function index()
    {
        $user = Auth::user();
        $sites = $user->sites()->latest()->get();
        return Inertia::render('user/Dashboard', [
            'sites' => $sites
        ]);
    }

    /**
     * Show the form for creating a new site.
     */
    public function create()
    {
        return Inertia::render('user/sites/Create');
    }

    /**
     * Display the specified site.
     */
    public function show(UserSite $userSite)
    {
        // Ensure user owns this site
        if ($userSite->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('user/sites/Show', [
            'site' => $userSite
        ]);
    }

    /**
     * Show the form for editing the specified site.
     */
    public function edit(UserSite $userSite)
    {
        // Ensure user owns this site
        if ($userSite->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('user/sites/Edit', [
            'site' => $userSite
        ]);
    }

    /**
     * Update the specified site.
     */
    public function update(Request $request, UserSite $userSite)
    {
        // Ensure user owns this site
        if ($userSite->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_url' => 'required|url|max:255',
            'badge_icon_url' => 'nullable|url|max:255',
            'notification_icon_url' => 'nullable|url|max:255',
            'status' => 'required|in:Active,Inactive,Pending',
        ]);

        $userSite->update($validated);

        return redirect()->route('user-sites.index')
            ->with('success', 'Site updated successfully!');
    }

    /**
     * Store a newly created site.
     */
    public function store(Request $request)
    {
        try {
            // Handle both form submissions and API calls
            $validated = $request->validate([
                'site_name' => 'required|string|max:255',
                'site_url' => 'required|url|max:255',
                'badge_icon_url' => 'nullable|url|max:255',
                'notification_icon_url' => 'nullable|url|max:255',
                'status' => 'sometimes|in:Active,Inactive,Pending',
                // Legacy field names for backward compatibility
                'siteName' => 'sometimes|string|max:255',
                'siteUrl' => 'sometimes|url|max:255',
                'badgeIconUrl' => 'sometimes|string|max:255',
                'notificationIconUrl' => 'sometimes|string|max:255',
            ]);

            $user = Auth::user();
            
            if (!$user) {
                throw new \Exception('User not authenticated.');
            }
            
            // Handle legacy field names
            $siteData = [
                'site_name' => $validated['site_name'] ?? $validated['siteName'] ?? '',
                'site_url' => $validated['site_url'] ?? $validated['siteUrl'] ?? '',
                'badge_icon_url' => $validated['badge_icon_url'] ?? $validated['badgeIconUrl'] ?? null,
                'notification_icon_url' => $validated['notification_icon_url'] ?? $validated['notificationIconUrl'] ?? null,
                'status' => $validated['status'] ?? 'Active',
                'is_connected' => false,
            ];

            // Additional URL validation for non-empty fields
            if (!empty($siteData['badge_icon_url']) && !filter_var($siteData['badge_icon_url'], FILTER_VALIDATE_URL)) {
                throw new \Exception('The badge icon URL must be a valid URL.');
            }
            
            if (!empty($siteData['notification_icon_url']) && !filter_var($siteData['notification_icon_url'], FILTER_VALIDATE_URL)) {
                throw new \Exception('The notification icon URL must be a valid URL.');
            }
            
            $site = $user->sites()->create($siteData);

            // Check if this is an API request (JSON response expected)
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => true,
                    'message' => 'Site added successfully!',
                    'site' => $site
                ]);
            }

            return redirect()->route('user-sites.index')
                ->with('success', 'Site created successfully!');
            
        } catch (\Exception $e) {
            \Log::error('Site creation error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Check if this is an API request
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error creating site: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Error creating site: ' . $e->getMessage()])
                ->withInput();
        }
    }



    /**
     * Remove the specified site.
     */
    public function destroy(UserSite $userSite)
    {
        if ($userSite->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $userSite->delete();

        return redirect()->back()->with('success', 'Site deleted successfully!');
    }
    

    /**
     * Toggle connection status
     */
    public function toggleConnection(UserSite $site)
    {
        // Check if user owns this site
        if ($site->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $site->update([
            'is_connected' => !$site->is_connected
        ]);

        return response()->json([
            'success' => true,
            'message' => $site->is_connected ? 'Site connected!' : 'Site disconnected!',
            'site' => $site
        ]);
    }
}
