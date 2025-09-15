<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $fillable = [
        'domain',
        'desktop_count',
        'mobile_count',
        'total_count',
        'status',
        'has_warning',
        'is_wordpress',
        'is_default'
    ];

    protected $casts = [
        'has_warning' => 'boolean',
        'is_wordpress' => 'boolean',
        'is_default' => 'boolean',
        'desktop_count' => 'integer',
        'mobile_count' => 'integer',
        'total_count' => 'integer'
    ];
}
