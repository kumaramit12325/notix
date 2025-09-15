<?php

namespace Database\Seeders;

use App\Models\Domain;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DomainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $domains = [
            [
                'domain' => 'naughtytalk.s6-tastewp.com',
                'desktop_count' => 1,
                'mobile_count' => 0,
                'total_count' => 1,
                'status' => 'Active',
                'has_warning' => true,
                'is_wordpress' => true,
                'is_default' => false,
            ],
            [
                'domain' => 'test5.larapush.com',
                'desktop_count' => 0,
                'mobile_count' => 0,
                'total_count' => 0,
                'status' => 'Active',
                'has_warning' => true,
                'is_wordpress' => true,
                'is_default' => false,
            ],
            [
                'domain' => 'eu2.wpsandbox.org',
                'desktop_count' => 23,
                'mobile_count' => 5,
                'total_count' => 28,
                'status' => 'Active',
                'has_warning' => true,
                'is_wordpress' => true,
                'is_default' => false,
            ],
            [
                'domain' => 'entranced-scarab-b5c838.instawp.xyz',
                'desktop_count' => 2,
                'mobile_count' => 0,
                'total_count' => 2,
                'status' => 'Active',
                'has_warning' => true,
                'is_wordpress' => true,
                'is_default' => false,
            ],
            [
                'domain' => 'test1.larapu.sh',
                'desktop_count' => 50,
                'mobile_count' => 18,
                'total_count' => 68,
                'status' => 'Active',
                'has_warning' => false,
                'is_wordpress' => true,
                'is_default' => false,
            ],
            [
                'domain' => 'Default',
                'desktop_count' => 13,
                'mobile_count' => 1,
                'total_count' => 14,
                'status' => 'Active',
                'has_warning' => false,
                'is_wordpress' => true,
                'is_default' => true,
            ],
        ];

        foreach ($domains as $domainData) {
            Domain::create($domainData);
        }
    }
}
