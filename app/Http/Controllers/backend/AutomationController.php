<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Automation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AutomationController extends Controller 
{
    public function index(Request $request)
    {
        $query = Automation::query();

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('domain', 'like', "%{$search}%")
                  ->orWhere('type', 'like', "%{$search}%");
            });
        }

        $perPage = (int) $request->input('per_page', 10);
        $items = $query->latest()->paginate($perPage);

        return Inertia::render('automation/index', compact('items'));
    }
    
    public function create()
    {
        return Inertia::render('automation/create');
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'schedule_text' => 'nullable|string|max:255',
            'next_run' => 'nullable|date',
            'domain' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'schedule' => 'nullable|string|max:255',
        ]);

        Automation::create($validated);

        return redirect()->route('automation.index')->with('success', 'Automation created successfully');
    }
    
    public function show(Automation $automation)
    {
        return Inertia::render('automation/show', ['automation' => $automation]);
    }
    
    public function edit(Automation $automation)
    {
        return Inertia::render('automation/edit', ['automation' => $automation]);
    }
    
    public function update(Request $request, Automation $automation)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'schedule_text' => 'nullable|string|max:255',
            'next_run' => 'nullable|date',
            'domain' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'schedule' => 'nullable|string|max:255',
        ]);

        $automation->update($validated);

        return redirect()->route('automation.index')->with('success', 'Automation updated successfully');
    }
    
    public function destroy(Automation $automation)
    {
        $automation->delete();
        return redirect()->route('automation.index')->with('success', 'Automation deleted successfully');
    }
}


