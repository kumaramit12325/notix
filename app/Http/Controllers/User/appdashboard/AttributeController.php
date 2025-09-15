<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeController extends Controller     
{
    public function index()
    {
        $query = Attribute::query();
        
        // Search functionality
        if (request('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('tag', 'like', "%{$search}%");
            });
        }
        
        // Get per_page parameter, default to 10
        $perPage = request('per_page', 10);
        
        $attributes = $query->latest()->paginate($perPage);
        
        return Inertia::render('appdashboard/attribute/index', compact('attributes'));
    }

    public function create()
    {
        return Inertia::render('appdashboard/attribute/create');       
    }
}