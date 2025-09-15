<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AudienceController extends Controller
{
 
    public function index()
{
    return Inertia::render('appdashboard/audience/index');       
}

    public function create()
{
    return Inertia::render('appdashboard/audience/create');       
}
}