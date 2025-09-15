<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\LPLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LPLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = LPLink::query();
        
        // Search functionality
        if (request('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('handle', 'like', "%{$search}%");
            });
        }
        
        // Status filter
        if (request('status') && request('status') !== 'all') {
            $query->where('status', request('status'));
        }
        
        // Get per_page parameter, default to 10
        $perPage = request('per_page', 10);
        
        $channels = $query->latest()->paginate($perPage);
        
        return Inertia::render('lplink/index', compact('channels'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('lplink/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'target_link' => ['required', 'url'],
            'domain' => ['nullable', 'string', 'max:255'],
            'prompt_text' => ['required', 'string', 'max:500'],
        ]);

        return redirect()->route('lplinks.index')
            ->with('success', 'LP Link created successfully (demo).');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('lplink/show', [
            'id' => $id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('lplink/edit', [
            'id' => $id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'target_link' => ['sometimes', 'required', 'url'],
            'domain' => ['nullable', 'string', 'max:255'],
            'prompt_text' => ['sometimes', 'required', 'string', 'max:500'],
        ]);

        return redirect()->route('lplinks.show', $id)
            ->with('success', 'LP Link updated successfully (demo).');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return redirect()->route('lplinks.index')
            ->with('success', 'LP Link deleted successfully (demo).');
    }
}

 