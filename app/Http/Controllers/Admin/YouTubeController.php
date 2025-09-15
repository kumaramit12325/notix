<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\YouTubeChannel;
use App\Models\LPLink;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class YouTubeController extends Controller
{
    /**
     * Display a listing of all YouTube channels for admin.
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
        
        // User filter
        if ($request->filled('user_id') && $request->get('user_id') !== 'all') {
            $query->where('user_id', $request->get('user_id'));
        }
        
        $perPage = $request->get('per_page', 15);
        $channels = $query->paginate($perPage);
        
        // Get all users for filter dropdown
        $users = User::select('id', 'name', 'email')->get();
        
        // Transform data for admin view
        $channels->getCollection()->transform(function ($channel) {
            $lpLink = LPLink::where('type', 'youtube')
                           ->where('reference_id', $channel->id)
                           ->first();
            
            return [
                'id' => $channel->id,
                'title' => $channel->title,
                'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)),
                'lp_link' => $lpLink ? $lpLink->lp_link : 'N/A',
                'desktop' => rand(0, 15), // Mock data
                'mobile' => rand(0, 8),   // Mock data
                'status' => $channel->status ?? 'Active',
                'created_at' => $channel->created_at->toISOString(),
                'subscriber_count' => $channel->subscriber_count,
                'domain' => $channel->domain,
                'logo' => $channel->logo,
                'user' => $channel->user ? [
                    'id' => $channel->user->id,
                    'name' => $channel->user->name,
                    'email' => $channel->user->email
                ] : null
            ];
        });
        
        return Inertia::render('admin/youtube/index', compact('channels', 'users'));
    }

    /**
     * Show the form for creating a new YouTube channel.
     */
    public function create()
    {
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('admin/youtube/create', compact('users'));
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
            'status' => 'required|in:Active,Paused',
            'lp_link' => 'nullable|string|max:500'
        ]);

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

        return redirect()->route('admin.youtube.index')
            ->with('success', 'YouTube channel created successfully!');
    }

    /**
     * Display the specified YouTube channel.
     */
    public function show(YouTubeChannel $youtube)
    {
        $channel = $youtube->load('user');
        $lpLink = LPLink::where('type', 'youtube')
                       ->where('reference_id', $youtube->id)
                       ->first();
        
        $channelData = [
            'id' => $channel->id,
            'title' => $channel->title,
            'handle' => '@' . strtolower(str_replace(' ', '', $channel->title)),
            'lp_link' => $lpLink ? $lpLink->lp_link : 'N/A',
            'desktop' => rand(0, 15),
            'mobile' => rand(0, 8),
            'status' => $channel->status ?? 'Active',
            'created_at' => $channel->created_at->toISOString(),
            'subscriber_count' => $channel->subscriber_count,
            'domain' => $channel->domain,
            'logo' => $channel->logo,
            'lp_link_custom' => $lpLink ? $lpLink->lp_link : null,
            'user' => $channel->user ? [
                'id' => $channel->user->id,
                'name' => $channel->user->name,
                'email' => $channel->user->email
            ] : null
        ];
        
        return Inertia::render('admin/youtube/show', compact('channelData'));
    }

    /**
     * Show the form for editing the specified YouTube channel.
     */
    public function edit(YouTubeChannel $youtube)
    {
        $channel = $youtube;
        $lpLink = LPLink::where('type', 'youtube')
                       ->where('reference_id', $youtube->id)
                       ->first();
        
        if ($lpLink) {
            $channel->lp_link = $lpLink->lp_link;
        }
        
        $users = User::select('id', 'name', 'email')->get();
        return Inertia::render('admin/youtube/edit', compact('channel', 'users'));
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
            'user_id' => 'nullable|exists:users,id',
            'status' => 'required|in:Active,Paused',
            'lp_link' => 'nullable|string|max:500'
        ]);

        $youtube->update($validated);

        // Update or create LP link
        $lpLink = LPLink::where('type', 'youtube')
                       ->where('reference_id', $youtube->id)
                       ->first();

        if ($lpLink) {
            if ($request->filled('lp_link')) {
                $lpLink->update([
                    'lp_link' => $request->lp_link,
                    'user_id' => $request->user_id ?: null
                ]);
            }
        } else {
            // Create new LP link if it doesn't exist
            if ($request->filled('lp_link')) {
                LPLink::create([
                    'type' => 'youtube',
                    'reference_id' => $youtube->id,
                    'user_id' => $request->user_id ?: null,
                    'name' => $youtube->title,
                    'handle' => '@' . strtolower(str_replace(' ', '', $youtube->title)),
                    'lp_link' => $request->lp_link,
                    'status' => 'Active'
                ]);
            } else {
                // Auto-generate LP link
                LPLink::create([
                    'type' => 'youtube',
                    'reference_id' => $youtube->id,
                    'user_id' => $request->user_id ?: null,
                    'name' => $youtube->title,
                    'handle' => '@' . strtolower(str_replace(' ', '', $youtube->title)),
                    'lp_link' => 'https://demo.larapu.sh/yt/' . substr(md5($youtube->id . time()), 0, 8),
                    'status' => 'Active'
                ]);
            }
        }

        return redirect()->route('admin.youtube.index')
            ->with('success', 'YouTube channel updated successfully!');
    }

    /**
     * Remove the specified YouTube channel from storage.
     */
    public function destroy(YouTubeChannel $youtube)
    {
        $youtube->delete();
        return redirect()->route('admin.youtube.index')
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

        return redirect()->route('admin.youtube.index')
            ->with('success', 'Channel status updated successfully!');
    }

    /**
     * Bulk delete channels
     */
    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:you_tube_channels,id'
        ]);

        YouTubeChannel::whereIn('id', $validated['ids'])->delete();

        return redirect()->route('admin.youtube.index')
            ->with('success', 'Selected channels deleted successfully!');
    }

    /**
     * Bulk update status
     */
    public function bulkUpdateStatus(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:you_tube_channels,id',
            'status' => 'required|in:Active,Paused'
        ]);

        YouTubeChannel::whereIn('id', $validated['ids'])
            ->update(['status' => $validated['status']]);

        return redirect()->route('admin.youtube.index')
            ->with('success', 'Selected channels status updated successfully!');
    }
}
