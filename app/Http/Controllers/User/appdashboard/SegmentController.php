<?php

namespace App\Http\Controllers\User\appdashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SegmentController extends Controller
{
 
    public function index()
{
    return Inertia::render('appdashboard/Segment/index');       
}
}