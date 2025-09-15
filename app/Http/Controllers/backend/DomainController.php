<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Domain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DomainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Domain::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where('domain', 'like', '%' . $request->search . '%');
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $domains = $query->orderBy('created_at', 'desc')->paginate($perPage);

        // Determine which view to render based on the route
        $routeName = $request->route()->getName();
        $viewName = 'domains/modify/index';
        
        if ($routeName === 'domains.integration') {
            $viewName = 'domains/integration/index';
        } elseif ($routeName === 'domains.import-export') {
            $viewName = 'domains/import-export/index';
        }

        return Inertia::render($viewName, [
            'domains' => $domains
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('domains/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'domain' => 'required|string|max:255|unique:domains',
            'desktop_count' => 'integer|min:0',
            'mobile_count' => 'integer|min:0',
            'status' => 'in:Active,Inactive,Pending',
            'has_warning' => 'boolean',
            'is_wordpress' => 'boolean',
            'is_default' => 'boolean'
        ]);

        $data = $request->all();
        $data['total_count'] = ($data['desktop_count'] ?? 0) + ($data['mobile_count'] ?? 0);

        Domain::create($data);

        return redirect()->route('domains.modify')->with('success', 'Domain created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $domain = Domain::findOrFail($id);
        return Inertia::render('domains/show', [
            'domain' => $domain
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $domain = Domain::findOrFail($id);
        return Inertia::render('domains/edit', [
            'domain' => $domain
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $domain = Domain::findOrFail($id);

        $request->validate([
            'domain' => 'required|string|max:255|unique:domains,domain,' . $id,
            'desktop_count' => 'integer|min:0',
            'mobile_count' => 'integer|min:0',
            'status' => 'in:Active,Inactive,Pending',
            'has_warning' => 'boolean',
            'is_wordpress' => 'boolean',
            'is_default' => 'boolean'
        ]);

        $data = $request->all();
        $data['total_count'] = ($data['desktop_count'] ?? 0) + ($data['mobile_count'] ?? 0);

        $domain->update($data);

        return redirect()->route('domains.modify')->with('success', 'Domain updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $domain = Domain::findOrFail($id);
        $domain->delete();

        return redirect()->route('domains.modify')->with('success', 'Domain deleted successfully.');
    }

    /**
     * Copy domain
     */
    public function copy(string $id)
    {
        $originalDomain = Domain::findOrFail($id);
        
        $newDomain = $originalDomain->replicate();
        $newDomain->domain = $originalDomain->domain . '_copy';
        $newDomain->desktop_count = 0;
        $newDomain->mobile_count = 0;
        $newDomain->total_count = 0;
        $newDomain->is_default = false;
        $newDomain->save();

        return redirect()->route('domains.modify')->with('success', 'Domain copied successfully.');
    }

    /**
     * Pause/Resume domain
     */
    public function pause(string $id)
    {
        $domain = Domain::findOrFail($id);
        $domain->status = $domain->status === 'Active' ? 'Inactive' : 'Active';
        $domain->save();

        return redirect()->route('domains.modify')->with('success', 'Domain status updated successfully.');
    }

    /**
     * Broadcast domain
     */
    public function broadcast(string $id)
    {
        $domain = Domain::findOrFail($id);
        // Add your broadcast logic here
        return redirect()->route('domains.modify')->with('success', 'Domain broadcast initiated successfully.');
    }

    /**
     * Refresh domain
     */
    public function refresh(string $id)
    {
        $domain = Domain::findOrFail($id);
        // Add your refresh logic here
        return redirect()->route('domains.modify')->with('success', 'Domain refreshed successfully.');
    }
}
