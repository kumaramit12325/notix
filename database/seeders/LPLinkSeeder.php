<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LPLink;
use App\Models\User;

class LPLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user or create one if none exists
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create();
        }

        $sampleData = [
            [
                'name' => 'wwe',
                'handle' => '@wwe',
                'lp_link' => 'https://demo.larapu.sh/yt/4SlikplR',
                'desktop' => 4,
                'mobile' => 1,
                'status' => 'Active',
                'target_link' => 'https://wwe.com',
                'domain' => 'wwe.com',
                'prompt_text' => 'Check out WWE content',
            ],
            [
                'name' => 'larapush',
                'handle' => '@larapush',
                'lp_link' => 'https://demo.larapu.sh/yt/VCDTmBTp',
                'desktop' => 2,
                'mobile' => 0,
                'status' => 'Active',
                'target_link' => 'https://larapush.com',
                'domain' => 'larapush.com',
                'prompt_text' => 'Laravel development services',
            ],
            [
                'name' => 'ndtv',
                'handle' => '@ndtv',
                'lp_link' => 'https://demo.larapu.sh/yt/antPdliy',
                'desktop' => 0,
                'mobile' => 0,
                'status' => 'Active',
                'target_link' => 'https://ndtv.com',
                'domain' => 'ndtv.com',
                'prompt_text' => 'Latest news from NDTV',
            ],
            [
                'name' => 'invideoofficial',
                'handle' => '@invideoofficial',
                'lp_link' => 'https://demo.larapu.sh/yt/5BV2IiTt',
                'desktop' => 0,
                'mobile' => 0,
                'status' => 'Active',
                'target_link' => 'https://invideo.io',
                'domain' => 'invideo.io',
                'prompt_text' => 'Create amazing videos',
            ],
            [
                'name' => 'kommuneindia',
                'handle' => '@kommuneindia',
                'lp_link' => 'https://demo.larapu.sh/yt/QTr0p1Ng',
                'desktop' => 0,
                'mobile' => 0,
                'status' => 'Active',
                'target_link' => 'https://kommune.in',
                'domain' => 'kommune.in',
                'prompt_text' => 'Indian music and culture',
            ],
            [
                'name' => 'watchcartvindia',
                'handle' => '@watchcartvindia',
                'lp_link' => 'https://demo.larapu.sh/yt/IfdPdWFj',
                'desktop' => 1,
                'mobile' => 0,
                'status' => 'Active',
                'target_link' => 'https://watchcartv.com',
                'domain' => 'watchcartv.com',
                'prompt_text' => 'Watch Cartoon TV India',
            ],
            [
                'name' => 'rankknar',
                'handle' => '@rankknar',
                'lp_link' => 'https://demo.larapu.sh/yt/2KSBUq4R',
                'desktop' => 1,
                'mobile' => 0,
                'status' => 'Active',
                'target_link' => 'https://rankknar.com',
                'domain' => 'rankknar.com',
                'prompt_text' => 'Gaming and entertainment',
            ],
            [
                'name' => 'techcrunch',
                'handle' => '@techcrunch',
                'lp_link' => 'https://demo.larapu.sh/yt/techcrunch123',
                'desktop' => 5,
                'mobile' => 2,
                'status' => 'Paused',
                'target_link' => 'https://techcrunch.com',
                'domain' => 'techcrunch.com',
                'prompt_text' => 'Latest tech news and startups',
            ],
            [
                'name' => 'verge',
                'handle' => '@verge',
                'lp_link' => 'https://demo.larapu.sh/yt/verge456',
                'desktop' => 3,
                'mobile' => 1,
                'status' => 'Active',
                'target_link' => 'https://theverge.com',
                'domain' => 'theverge.com',
                'prompt_text' => 'Technology, science, art, and culture',
            ],
            [
                'name' => 'wired',
                'handle' => '@wired',
                'lp_link' => 'https://demo.larapu.sh/yt/wired789',
                'desktop' => 2,
                'mobile' => 0,
                'status' => 'Active',
                'target_link' => 'https://wired.com',
                'domain' => 'wired.com',
                'prompt_text' => 'In-depth reporting on technology',
            ],
            [
                'name' => 'mashable',
                'handle' => '@mashable',
                'lp_link' => 'https://demo.larapu.sh/yt/mashable101',
                'desktop' => 4,
                'mobile' => 1,
                'status' => 'Active',
                'target_link' => 'https://mashable.com',
                'domain' => 'mashable.com',
                'prompt_text' => 'Digital culture and technology',
            ],
            [
                'name' => 'engadget',
                'handle' => '@engadget',
                'lp_link' => 'https://demo.larapu.sh/yt/engadget202',
                'desktop' => 1,
                'mobile' => 0,
                'status' => 'Paused',
                'target_link' => 'https://engadget.com',
                'domain' => 'engadget.com',
                'prompt_text' => 'Consumer electronics and gadgets',
            ],
        ];

        foreach ($sampleData as $data) {
            LPLink::create(array_merge($data, ['user_id' => $user->id]));
        }
    }
}
