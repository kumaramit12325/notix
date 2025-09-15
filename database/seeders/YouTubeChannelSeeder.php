<?php

namespace Database\Seeders;

use App\Models\YouTubeChannel;
use App\Models\User;
use Illuminate\Database\Seeder;

class YouTubeChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        
        $channels = [
            [
                'title' => 'wwe',
                'domain' => 'All',
                'subscriber_count' => '50M',
                'logo' => 'WWE',
                'status' => 'Active',
                'user_id' => $users->first()?->id,
            ],
            [
                'title' => 'larapush',
                'domain' => 'All',
                'subscriber_count' => '10K',
                'logo' => 'LP',
                'status' => 'Active',
                'user_id' => $users->first()?->id,
            ],
            [
                'title' => 'ndtv',
                'domain' => 'All',
                'subscriber_count' => '25M',
                'logo' => 'ND',
                'status' => 'Active',
                'user_id' => $users->first()?->id,
            ],
            [
                'title' => 'invideoofficial',
                'domain' => 'All',
                'subscriber_count' => '2M',
                'logo' => 'IV',
                'status' => 'Active',
                'user_id' => $users->first()?->id,
            ],
            [
                'title' => 'kommuneindia',
                'domain' => 'All',
                'subscriber_count' => '500K',
                'logo' => 'KI',
                'status' => 'Active',
                'user_id' => $users->first()?->id,
            ],
            [
                'title' => 'watchcartvindia',
                'domain' => 'All',
                'subscriber_count' => '1M',
                'logo' => 'WC',
                'status' => 'Active',
                'user_id' => $users->first()?->id,
            ],
            [
                'title' => 'rankknar',
                'domain' => 'All',
                'subscriber_count' => '100K',
                'logo' => 'RK',
                'status' => 'Active',
                'user_id' => $users->first()?->id,
            ],
        ];

        foreach ($channels as $channelData) {
            YouTubeChannel::create($channelData);
        }
    }
}
