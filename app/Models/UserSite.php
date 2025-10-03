<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'site_name',
        'site_url',
        'script_token',
        'badge_icon_url',
        'notification_icon_url',
        'status',
        'is_connected',
        'clicks',
        'conversions',
        'remove_powered_by',
        'universal_subscription_link',
    ];

    protected $casts = [
        'is_connected' => 'boolean',
        'remove_powered_by' => 'boolean',
        'universal_subscription_link' => 'boolean',
        'clicks' => 'integer',
        'conversions' => 'integer',
    ];

    /**
     * Get the user that owns the site.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the site's display name (first letter of site name)
     */
    public function getDisplayName(): string
    {
        return strtoupper(substr($this->site_name, 0, 1));
    }

    /**
     * Get the site's domain from URL
     */
    public function getDomain(): string
    {
        $url = parse_url($this->site_url);
        return $url['host'] ?? $this->site_name;
    }
}
