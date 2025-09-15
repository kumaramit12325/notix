<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class YouTubeChannel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'domain',
        'subscriber_count',
        'logo',
        'user_id',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the YouTube channel.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the LP link for this channel.
     */
    public function lpLink()
    {
        return $this->hasOne(LPLink::class, 'reference_id')->where('type', 'youtube');
    }
}


