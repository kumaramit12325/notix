<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserSite;

class UserSiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user (or create one if none exists)
        $user = User::first();
        
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Test User',
                'email' => 'user@example.com',
                'role' => 'User'
            ]);
        }

        // Create sample sites for the user
        UserSite::create([
            'user_id' => $user->id,
            'site_name' => 'thedevelopershouse',
            'site_url' => 'https://thedevelopershouse.com',
            'badge_icon_url' => 'https://example.com/badge.png',
            'notification_icon_url' => 'https://example.com/notification.png',
            'status' => 'Active',
            'is_connected' => false,
            'clicks' => 0,
            'conversions' => 0,
        ]);

        UserSite::create([
            'user_id' => $user->id,
            'site_name' => 'myblog',
            'site_url' => 'https://myblog.com',
            'badge_icon_url' => 'https://example.com/badge2.png',
            'notification_icon_url' => 'https://example.com/notification2.png',
            'status' => 'Active',
            'is_connected' => true,
            'clicks' => 15,
            'conversions' => 3,
        ]);
    }
}
