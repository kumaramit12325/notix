<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\SegmentationRule;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SegmentationController extends Controller 
{
    public function index(Request $request)
    {
        $rules = SegmentationRule::latest()->get()->map(function ($r) {
            return [
                'id' => $r->id,
                'user_id' => $r->user_id,
                'name' => $r->name,
                'domains' => $r->domains,
                'condition' => $r->condition,
                'created_at' => optional($r->created_at)->format('Y-m-d H:i'),
            ];
        });

        return Inertia::render('segmentation/index', [
            'segmentationRules' => $rules
        ]);
    }

    public function create()
    {
        $users = User::select('id', 'name', 'email')->get();
        
        return Inertia::render('segmentation/create', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'domains' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'conditions' => 'nullable|array',
        ]);

        // Convert conditions array to JSON string
        $conditions = $validated['conditions'] ?? [];
        
        // Filter out empty conditions
        $filteredConditions = array_filter($conditions, function($condition) {
            return !empty($condition['property']) && !empty($condition['value']);
        });

        $validated['condition'] = json_encode(array_values($filteredConditions));
        unset($validated['conditions']);

        SegmentationRule::create($validated);

        return redirect()->route('segmentation.index')->with('success', 'Segmentation rule created successfully!');
    }

    public function edit(SegmentationRule $segmentation)
    {
        $users = User::select('id', 'name', 'email')->get();
        
        $rule = [
            'id' => $segmentation->id,
            'user_id' => $segmentation->user_id,
            'name' => $segmentation->name,
            'domains' => $segmentation->domains,
            'condition' => $segmentation->condition,
        ];

        return Inertia::render('segmentation/edit', [
            'segmentationRule' => $rule,
            'users' => $users
        ]);
    }

    public function update(Request $request, SegmentationRule $segmentation)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'domains' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'conditions' => 'nullable|array',
        ]);

        // Convert conditions array to JSON string
        $conditions = $validated['conditions'] ?? [];
        
        // Filter out empty conditions
        $filteredConditions = array_filter($conditions, function($condition) {
            return !empty($condition['property']) && !empty($condition['value']);
        });

        $validated['condition'] = json_encode(array_values($filteredConditions));
        unset($validated['conditions']);

        $segmentation->update($validated);

        return redirect()->route('segmentation.index')->with('success', 'Segmentation rule updated successfully!');
    }

    public function destroy(SegmentationRule $segmentation)
    {
        $segmentation->delete();

        return redirect()->route('segmentation.index')->with('success', 'Segmentation rule deleted successfully!');
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:segmentation_rules,id'
        ]);

        SegmentationRule::whereIn('id', $validated['ids'])->delete();

        return redirect()->route('segmentation.index')->with('success', 'Selected segmentation rules deleted successfully!');
    }
}
