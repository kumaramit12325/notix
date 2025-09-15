<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller 
{
    public function index(Request $request)
    {
        $query = Campaign::query();

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('domain_segment', 'like', "%{$search}%")
                  ->orWhere('source', 'like', "%{$search}%");
            });
        }

        $perPage = (int) $request->input('per_page', 10);
        $campaigns = $query->latest()->paginate($perPage);

        return Inertia::render('campaigns/index', compact('campaigns'));
    }

    public function create()
    {
        return Inertia::render('campaigns/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'domain_segment' => 'nullable|string|max:255',
            'sent' => 'nullable|integer|min:0',
            'clicks' => 'nullable|integer|min:0',
            'source' => 'nullable|string|max:255',
        ]);

        $validated['domain_segment'] = $validated['domain_segment'] ?? 'All';
        $validated['source'] = $validated['source'] ?? 'LaraPush Panel';

        $campaign = Campaign::create($validated);

        return redirect()->route('campaigns.index')->with('success', 'Campaign created successfully');
    }

    public function show(Campaign $campaign)
    {
        return Inertia::render('campaigns/show', compact('campaign'));
    }

    public function edit(Campaign $campaign)
    {
        return Inertia::render('campaigns/edit', compact('campaign'));
    }

    public function update(Request $request, Campaign $campaign)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'domain_segment' => 'nullable|string|max:255',
            'sent' => 'nullable|integer|min:0',
            'clicks' => 'nullable|integer|min:0',
            'source' => 'nullable|string|max:255',
        ]);

        $campaign->update($validated);

        return redirect()->route('campaigns.index')->with('success', 'Campaign updated successfully');
    }

    public function destroy(Campaign $campaign)
    {
        $campaign->delete();
        return redirect()->route('campaigns.index')->with('success', 'Campaign deleted successfully');
    }
}
