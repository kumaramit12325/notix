<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\YouTubeChannel;
use App\Models\LPLink;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class YouTubeController extends Controller
{
    /**
     * Display a listing of YouTube channels.
     */
    public function index(Request $request)
    {
        $query = YouTubeChannel::with('user')->latest();
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('domain', 'like', "%{$search}%");
            });
        }
        
        // Status filter
        if ($request->filled('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }
        
        $perPage = $request->get('per_page', 10);
        $channels = $query->paginate($perPage);
        
        // Transform data to match frontend expectations
        $channels->getCollection()->transform(function ($channel) {
            // Generate LP link for the channel
            $lpLink = LPLink::where('type', 'youtube')
                           ->where('reference_id', $channel->id)
                           ->first();
            
            if (!$lpLink) {
                // Create a new LP link if it doesn't exist
                $lpLink = LPLink::create([
                    'type' => 'youtube',
                    'reference_id' => $channel->id,
                    'user_id' => $channel->user_id,
                    'name' => $channel->title, // Add the missing name field
                    'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)), // Add handle field
                    'lp_link' => 'https://demo.larapu.sh/yt/' . substr(md5($channel->id . time()), 0, 8),
                    'status' => 'Active'
                ]);
            }
            
            return [
                'id' => $channel->id,
                'name' => $channel->title,
                'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)),
                'lp_link' => $lpLink->lp_link,
                'desktop' => rand(0, 10), // Mock data for now
                'mobile' => rand(0, 5),   // Mock data for now
                'status' => $channel->status ?? 'Active',
                'created_at' => $channel->created_at->toISOString(),
                'subscriber_count' => $channel->subscriber_count,
                'domain' => $channel->domain,
                'logo' => $channel->logo
            ];
        });
        
        return Inertia::render('youtube/index', compact('channels'));
    }

    /**
     * Show the form for creating a new YouTube channel.
     */
    public function create()
    {
        $users = [];
        $isAdmin = false;
        
        if (Auth::check() && Auth::user()->isAdmin()) {
            $users = \App\Models\User::select('id', 'name', 'email')->get();
            $isAdmin = true;
        }
        
        return Inertia::render('youtube/create', compact('users', 'isAdmin'));
    }

    /**
     * Store a newly created YouTube channel in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'subscriber_count' => 'nullable|string|max:50',
            'logo' => 'nullable|string|max:10',
            'user_id' => 'nullable|exists:users,id',
            'status' => 'nullable|in:Active,Paused',
            'lp_link' => 'nullable|string|max:500'
        ]);

        // Set default values
        $validated['user_id'] = $validated['user_id'] ?: Auth::id();
        $validated['status'] = $validated['status'] ?? 'Active';

        $channel = YouTubeChannel::create($validated);

        // Create LP link if provided or auto-generate
        if ($request->filled('lp_link')) {
            LPLink::create([
                'type' => 'youtube',
                'reference_id' => $channel->id,
                'user_id' => $channel->user_id,
                'name' => $channel->title,
                'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)),
                'lp_link' => $request->lp_link,
                'status' => 'Active'
            ]);
        } else {
            // Auto-generate LP link
            LPLink::create([
                'type' => 'youtube',
                'reference_id' => $channel->id,
                'user_id' => $channel->user_id,
                'name' => $channel->title,
                'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)),
                'lp_link' => 'https://demo.larapu.sh/yt/' . substr(md5($channel->id . time()), 0, 8),
                'status' => 'Active'
            ]);
        }

        return redirect()->route('youtube.index')
            ->with('success', 'YouTube channel created successfully!');
    }

    /**
     * Display the specified YouTube channel.
     */
    public function show(YouTubeChannel $youtube)
    {
        $channel = $youtube->load('user');
        return Inertia::render('youtube/show', compact('channel'));
    }

    /**
     * Show the form for editing the specified YouTube channel.
     */
    public function edit(YouTubeChannel $youtube)
    {
        $channel = $youtube;
        return Inertia::render('youtube/edit', compact('channel'));
    }

    /**
     * Update the specified YouTube channel in storage.
     */
    public function update(Request $request, YouTubeChannel $youtube)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'subscriber_count' => 'nullable|string|max:50',
            'logo' => 'nullable|string|max:10',
        ]);

        $youtube->update($validated);

        return redirect()->route('youtube.index')
            ->with('success', 'YouTube channel updated successfully!');
    }

    /**
     * Remove the specified YouTube channel from storage.
     */
    public function destroy(YouTubeChannel $youtube)
    {
        $youtube->delete();
        return redirect()->route('youtube.index')
            ->with('success', 'YouTube channel deleted successfully!');
    }

    /**
     * Toggle channel status
     */
    public function toggleStatus(YouTubeChannel $youtube)
    {
        $youtube->update([
            'status' => $youtube->status === 'Active' ? 'Paused' : 'Active'
        ]);

        return redirect()->route('youtube.index')
            ->with('success', 'Channel status updated successfully!');
    }

    /**
     * Display a listing of YouTube channels for the authenticated user.
     */
    public function userIndex(Request $request)
    {
        $query = YouTubeChannel::where('user_id', Auth::id())->latest();
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('domain', 'like', "%{$search}%");
            });
        }
        
        // Status filter
        if ($request->filled('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }
        
        $perPage = $request->get('per_page', 10);
        $channels = $query->paginate($perPage);
        
        // Transform data to match frontend expectations
        $channels->getCollection()->transform(function ($channel) {
            // Generate LP link for the channel
            $lpLink = LPLink::where('type', 'youtube')
                           ->where('reference_id', $channel->id)
                           ->first();
            
            if (!$lpLink) {
                // Create a new LP link if it doesn't exist
                $lpLink = LPLink::create([
                    'type' => 'youtube',
                    'reference_id' => $channel->id,
                    'user_id' => $channel->user_id,
                    'name' => $channel->title,
                    'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)),
                    'lp_link' => 'https://demo.larapu.sh/yt/' . substr(md5($channel->id . time()), 0, 8),
                    'status' => 'Active'
                ]);
            }
            
            return [
                'id' => $channel->id,
                'name' => $channel->title,
                'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)),
                'lp_link' => $lpLink->lp_link,
                'desktop' => rand(0, 10), // Mock data for now
                'mobile' => rand(0, 5),   // Mock data for now
                'status' => $channel->status ?? 'Active',
                'created_at' => $channel->created_at->toISOString(),
                'subscriber_count' => $channel->subscriber_count,
                'domain' => $channel->domain,
                'logo' => $channel->logo
            ];
        });
        
        return Inertia::render('youtube/index', compact('channels'));
    }

    /**
     * Show the form for creating a new YouTube channel for the authenticated user.
     */
    public function userCreate()
    {
        return Inertia::render('youtube/create');
    }

    /**
     * Store a newly created YouTube channel for the authenticated user.
     */
    public function userStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'subscriber_count' => 'nullable|string|max:50',
            'logo' => 'nullable|string|max:10',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'Active';

        $channel = YouTubeChannel::create($validated);

        return redirect()->route('user.youtube.index')
            ->with('success', 'YouTube channel created successfully!');
    }

    /**
     * Display the specified YouTube channel for the authenticated user.
     */
    public function userShow(YouTubeChannel $youtube)
    {
        // Ensure user can only view their own channel
        if ($youtube->user_id !== Auth::id()) {
            abort(403);
        }
        
        $channel = $youtube->load('user');
        return Inertia::render('youtube/show', compact('channel'));
    }

    /**
     * Show the form for editing the specified YouTube channel for the authenticated user.
     */
    public function userEdit(YouTubeChannel $youtube)
    {
        // Ensure user can only edit their own channel
        if ($youtube->user_id !== Auth::id()) {
            abort(403);
        }
        
        $channel = $youtube;
        return Inertia::render('youtube/edit', compact('channel'));
    }

    /**
     * Update the specified YouTube channel for the authenticated user.
     */
    public function userUpdate(Request $request, YouTubeChannel $youtube)
    {
        // Ensure user can only update their own channel
        if ($youtube->user_id !== Auth::id()) {
            abort(403);
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'subscriber_count' => 'nullable|string|max:50',
            'logo' => 'nullable|string|max:10',
        ]);

        $youtube->update($validated);

        return redirect()->route('user.youtube.index')
            ->with('success', 'YouTube channel updated successfully!');
    }

    /**
     * Remove the specified YouTube channel for the authenticated user.
     */
    public function userDestroy(YouTubeChannel $youtube)
    {
        // Ensure user can only delete their own channel
        if ($youtube->user_id !== Auth::id()) {
            abort(403);
        }
        
        $youtube->delete();
        return redirect()->route('user.youtube.index')
            ->with('success', 'YouTube channel deleted successfully!');
    }

    /**
     * Toggle channel status for the authenticated user.
     */
    public function userToggleStatus(YouTubeChannel $youtube)
    {
        // Ensure user can only toggle status of their own channel
        if ($youtube->user_id !== Auth::id()) {
            abort(403);
        }
        
        $youtube->update([
            'status' => $youtube->status === 'Active' ? 'Paused' : 'Active'
        ]);

        return redirect()->route('user.youtube.index')
            ->with('success', 'Channel status updated successfully!');
    }
}
