<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // You can fetch and pass dashboard data here if needed
        return Inertia::render('appdashboard/dashboard');
    }
}
