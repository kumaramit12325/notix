<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PricingPlan::create([
            'name' => 'Startup v5',
            'slug' => 'startup',
            'description' => 'Perfect for small projects getting started',
            'price' => 499.00,
            'currency' => 'USD',
            'billing_period' => 'one-time',
            'features' => [
                'Unlimited Domains',
                'Unlimited Subscribers',
                'Unlimited Notification',
                'Customizable Prompt',
                'Project Cloning & Retargetting',
                'Basic Analytics',
                'Medium Sending Speed'
            ],
            'is_active' => true,
            'is_featured' => false,
            'sort_order' => 1,
            'cta_text' => 'Buy Startup',
        ]);

        PricingPlan::create([
            'name' => 'Pro v5',
            'slug' => 'pro',
            'description' => 'Best value for growing teams',
            'price' => 799.00,
            'currency' => 'USD',
            'billing_period' => 'one-time',
            'features' => [
                'Unlimited Domains',
                'Unlimited Subscribers',
                'Unlimited Notification',
                'Customizable Prompt',
                'Project Cloning & Retargetting',
                'Advanced Statistics',
                'Customizable Speed',
                'AutoMagic Push',
                'Schedule Notifications',
                'Wordpress Plugin',
                'Segmentation',
                'Import Export',
                'AMP Addition',
                'API For Developers'
            ],
            'is_active' => true,
            'is_featured' => true,
            'sort_order' => 2,
            'cta_text' => 'Buy Pro',
        ]);
    }
}
