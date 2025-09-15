<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WelcomePush extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'message',
        'url',
        'domain',
        'delay_seconds',
        'image_url',
        'button_text',
        'button_url',
        'user_id',
    ];
}


