<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\YouTubeChannel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class YouTubePushController extends Controller
{
    /**
     * Display a listing of YouTube channels.
     */
    public function index(Request $request)
    {
        $channels = YouTubeChannel::latest()->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'title' => $c->title,
                'domain' => $c->domain,
                'subscriber_count' => $c->subscriber_count,
                'created' => optional($c->created_at)->format('Y-m-d H:i'),
                'logo' => $c->logo ?? strtoupper(substr($c->title, 0, 1)),
            ];
        });

        return Inertia::render('youtubpush/index', compact('channels'));
    }

    /**
     * Show the form for creating a new YouTube channel.
     */
    public function create()
    {
        return Inertia::render('youtubpush/create');
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
        ]);

        YouTubeChannel::create($validated);

        return redirect()->route('youtubpush.index')
            ->with('success', 'YouTube channel created successfully!');
    }

    /**
     * Display the specified YouTube channel.
     */
    public function show(YouTubeChannel $youtubpush)
    {
        $channel = $youtubpush;
        return Inertia::render('youtubpush/show', compact('channel'));
    }

    /**
     * Show the form for editing the specified YouTube channel.
     */
    public function edit(YouTubeChannel $youtubpush)
    {
        $channel = $youtubpush;
        return Inertia::render('youtubpush/edit', compact('channel'));
    }

    /**
     * Update the specified YouTube channel in storage.
     */
    public function update(Request $request, YouTubeChannel $youtubpush)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'subscriber_count' => 'nullable|string|max:50',
            'logo' => 'nullable|string|max:10',
        ]);

        $youtubpush->update($validated);

        return redirect()->route('youtubpush.index')
            ->with('success', 'YouTube channel updated successfully!');
    }

    /**
     * Remove the specified YouTube channel from storage.
     */
    public function destroy(YouTubeChannel $youtubpush)
    {
        $youtubpush->delete();
        return redirect()->route('youtubpush.index')
            ->with('success', 'YouTube channel deleted successfully!');
    }
}
