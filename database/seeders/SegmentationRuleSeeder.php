<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SegmentationRule;

class SegmentationRuleSeeder extends Seeder
{
    public function run(): void
    {
        $rules = [
            [
                'name' => 'Mobile Users',
                'domains' => 'All',
                'condition' => json_encode([
                    ['property' => 'device', 'operator' => 'contains', 'value' => 'mobile']
                ])
            ],
            [
                'name' => 'Chrome Browser Users',
                'domains' => 'Selective',
                'condition' => json_encode([
                    ['property' => 'browser', 'operator' => 'contains', 'value' => 'chrome']
                ])
            ],
            [
                'name' => 'US Visitors',
                'domains' => 'All',
                'condition' => json_encode([
                    ['property' => 'country', 'operator' => 'equals', 'value' => 'US']
                ])
            ],
            [
                'name' => 'Desktop Users',
                'domains' => 'All',
                'condition' => json_encode([
                    ['property' => 'device', 'operator' => 'contains', 'value' => 'desktop']
                ])
            ],
            [
                'name' => 'Firefox Users',
                'domains' => 'Selective',
                'condition' => json_encode([
                    ['property' => 'browser', 'operator' => 'contains', 'value' => 'firefox']
                ])
            ]
        ];

        foreach ($rules as $rule) {
            SegmentationRule::create($rule);
        }
    }
}
