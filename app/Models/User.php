<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the orders for the user.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the payments for the user.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(UserPayment::class);
    }

    /**
     * Get the sites for the user.
     */
    public function sites(): HasMany
    {
        return $this->hasMany(UserSite::class);
    }

    /**
     * Get total amount spent by user
     */
    public function getTotalSpent(): float
    {
        return $this->payments()->where('status', 'Completed')->sum('amount');
    }

    /**
     * Get total orders count
     */
    public function getTotalOrders(): int
    {
        return $this->orders()->count();
    }

    /**
     * Get completed orders count
     */
    public function getCompletedOrders(): int
    {
        return $this->orders()->where('status', 'Completed')->count();
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'Admin';
    }

    /**
     * Check if the user is a regular user.
     */
    public function isUser(): bool
    {
        return $this->role === 'User';
    }

    /**
     * Check if the user is an agent.
     */
    public function isAgent(): bool
    {
        return $this->role === 'Agent';
    }
}
