<?php
namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\WelcomePush;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomePushController extends Controller 
{
    /**
     * Display a listing of welcome push notifications.
     */
    public function index(Request $request)
    {
        $query = WelcomePush::query();
        $perPage = (int) $request->input('per_page', 10);
        $items = $query->latest()->paginate($perPage);
        return Inertia::render('welcomepush/index', compact('items'));
    }

    /**
     * Show the form for creating a new welcome push notification.
     */
    public function create()
    {
        return Inertia::render('welcomepush/create');
    }

    /**
     * Store a newly created welcome push notification in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string|max:500',
            'url' => 'nullable|url|max:500',
            'domain' => 'required|string',
            'delay_seconds' => 'required|string',
            'image_url' => 'nullable|url|max:500',
            'button_text' => 'nullable|string|max:100',
            'button_url' => 'nullable|url|max:500',
        ]);

        WelcomePush::create($validated);

        return redirect()->route('welcomepush.index')
            ->with('success', 'Welcome push campaign created successfully!');
    }

    /**
     * Display the specified welcome push notification.
     */
    public function show(WelcomePush $welcomepush)
    {
        return Inertia::render('welcomepush/show', [
            'welcomepush' => $welcomepush
        ]);
    }

    /**
     * Show the form for editing the specified welcome push notification.
     */
    public function edit(WelcomePush $welcomepush)
    {
        return Inertia::render('welcomepush/edit', [
            'welcomepush' => $welcomepush
        ]);
    }

    /**
     * Update the specified welcome push notification in storage.
     */
    public function update(Request $request, WelcomePush $welcomepush)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string|max:500',
            'url' => 'nullable|url|max:500',
            'domain' => 'required|string',
            'delay_seconds' => 'required|string',
            'image_url' => 'nullable|url|max:500',
            'button_text' => 'nullable|string|max:100',
            'button_url' => 'nullable|url|max:500',
        ]);

        $welcomepush->update($validated);

        return redirect()->route('welcomepush.index')
            ->with('success', 'Welcome push campaign updated successfully!');
    }

    /**
     * Remove the specified welcome push notification from storage.
     */
    public function destroy(WelcomePush $welcomepush)
    {
        $welcomepush->delete();
        return redirect()->route('welcomepush.index')
            ->with('success', 'Welcome push campaign deleted successfully!');
    }
}