<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Automation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'schedule_text',
        'next_run',
        'domain',
        'type',
        'schedule',
        'user_id',
    ];
}


