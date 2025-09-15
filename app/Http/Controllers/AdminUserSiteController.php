<?php

namespace App\Http\Controllers;

use App\Models\UserSite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminUserSiteController extends Controller
{
    /**
     * Display a listing of all user sites.
     */
    public function index(Request $request)
    {
        $query = UserSite::with('user');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('site_name', 'like', "%{$search}%")
                  ->orWhere('site_url', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }



        // Sort functionality
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $sites = $query->paginate(15);

        // Get statistics
        $stats = [
            'total_sites' => UserSite::count(),
            'active_sites' => UserSite::where('status', 'Active')->count(),
            'inactive_sites' => UserSite::where('status', 'Inactive')->count(),
            'connected_sites' => UserSite::where('is_connected', true)->count(),
            'total_clicks' => UserSite::sum('clicks'),
            'total_conversions' => UserSite::sum('conversions'),
        ];

        return Inertia::render('admin/user-sites/Index', [
            'sites' => $sites,
            'stats' => $stats,
            'filters' => $request->only(['search', 'sort_by', 'sort_order'])
        ]);
    }

    /**
     * Show the form for creating a new user site.
     */
    public function create()
    {
        $users = User::select('id', 'name', 'email')->get();
        
        return Inertia::render('admin/user-sites/Create', [
            'users' => $users
        ]);
    }

    /**
     * Store a newly created user site.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'site_name' => 'required|string|max:255',
            'site_url' => 'required|url|max:255',
            'badge_icon_url' => 'nullable|url|max:255',
            'notification_icon_url' => 'nullable|url|max:255',
            'status' => 'required|in:Active,Inactive,Pending',
            'is_connected' => 'boolean',
            'clicks' => 'integer|min:0',
            'conversions' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            UserSite::create($request->all());

            return redirect()->route('admin.user-sites.index')
                ->with('success', 'User site created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to create user site: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified user site.
     */
    public function show(UserSite $userSite)
    {
        $userSite->load('user');
        
        return Inertia::render('admin/user-sites/Show', [
            'site' => $userSite
        ]);
    }

    /**
     * Show the form for editing the specified user site.
     */
    public function edit(UserSite $userSite)
    {
        $users = User::select('id', 'name', 'email')->get();
        
        return Inertia::render('admin/user-sites/Edit', [
            'site' => $userSite,
            'users' => $users
        ]);
    }

    /**
     * Update the specified user site.
     */
    public function update(Request $request, UserSite $userSite)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'site_name' => 'required|string|max:255',
            'site_url' => 'required|url|max:255',
            'badge_icon_url' => 'nullable|url|max:255',
            'notification_icon_url' => 'nullable|url|max:255',
            'status' => 'required|in:Active,Inactive,Pending',
            'is_connected' => 'boolean',
            'clicks' => 'integer|min:0',
            'conversions' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $userSite->update($request->all());

            return redirect()->route('admin.user-sites.index')
                ->with('success', 'User site updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to update user site: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified user site.
     */
    public function destroy(UserSite $userSite)
    {
        try {
            $userSite->delete();

            return redirect()->route('admin.user-sites.index')
                ->with('success', 'User site deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to delete user site: ' . $e->getMessage()]);
        }
    }

    /**
     * Bulk delete user sites.
     */
    public function bulkDelete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:user_sites,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid site IDs'], 400);
        }

        try {
            UserSite::whereIn('id', $request->ids)->delete();

            return response()->json(['message' => 'Selected sites deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete sites: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update site status in bulk.
     */
    public function bulkUpdateStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:user_sites,id',
            'status' => 'required|in:Active,Inactive,Pending'
        ]);

        if ($validator->fails()) {
            return redirect()->route('admin.user-sites.index')->withErrors(['error' => 'Invalid data']);
        }

        try {
            UserSite::whereIn('id', $request->ids)->update(['status' => $request->status]);

            return redirect()->route('admin.user-sites.index')->with('success', 'Site status updated successfully');
        } catch (\Exception $e) {
            return redirect()->route('admin.user-sites.index')->withErrors(['error' => 'Failed to update status: ' . $e->getMessage()]);
        }
    }

    /**
     * Get user sites statistics.
     */
    public function statistics()
    {
        $stats = [
            'total_sites' => UserSite::count(),
            'active_sites' => UserSite::where('status', 'Active')->count(),
            'inactive_sites' => UserSite::where('status', 'Inactive')->count(),
            'pending_sites' => UserSite::where('status', 'Pending')->count(),
            'connected_sites' => UserSite::where('is_connected', true)->count(),
            'total_clicks' => UserSite::sum('clicks'),
            'total_conversions' => UserSite::sum('conversions'),
            'sites_by_status' => UserSite::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status'),
            'sites_by_month' => UserSite::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, count(*) as count')
                ->groupBy('month')
                ->orderBy('month')
                ->pluck('count', 'month'),
        ];

        return response()->json($stats);
    }
}
