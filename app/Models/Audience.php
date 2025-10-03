<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Audience extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_site_id',
        'name',
        'description',
    ];

    public function userSite(): BelongsTo
    {
        return $this->belongsTo(UserSite::class);
    }
}
