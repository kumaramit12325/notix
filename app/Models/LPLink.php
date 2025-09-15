<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LPLink extends Model
{
    use HasFactory;

    protected $table = 'lp_links';

    protected $fillable = [
        'type',
        'reference_id',
        'url',
        'name',
        'handle',
        'lp_link',
        'desktop',
        'mobile',
        'status',
        'user_id',
    ];

    protected $casts = [
        'reference_id' => 'integer',
        'desktop' => 'integer',
        'mobile' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
