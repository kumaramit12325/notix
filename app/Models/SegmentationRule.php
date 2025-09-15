<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SegmentationRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'domains',
        'condition',
        'user_id',
    ];
}


