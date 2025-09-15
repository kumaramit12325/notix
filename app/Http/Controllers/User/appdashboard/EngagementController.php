<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EngagementController extends Controller
{
    public function index()
    {
        // You can fetch and pass dashboard data here if needed
        return Inertia::render('appdashboard/engagements/index');
    }

    public function create()
    {
        return Inertia::render('appdashboard/engagements/create');
    }

    public function store(Request $request)
    {
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
        // TODO: Save to Engagement model/table
        // For now, just return a success response
        return redirect()->back()->with('success', 'Engagement (Push Notification) saved successfully!');
    }
}
