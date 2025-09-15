<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Attribute;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = [
            [
                'name' => 'First name',
                'tag' => '{{first_name}}',
                'description' => 'Subscriber\'s first name',
            ],
            [
                'name' => 'Last name',
                'tag' => '{{last_name}}',
                'description' => 'Subscriber\'s last name',
            ],
            [
                'name' => 'Email',
                'tag' => '{{email}}',
                'description' => 'Subscriber\'s email address',
            ],
            [
                'name' => 'Phone',
                'tag' => '{{phone}}',
                'description' => 'Subscriber\'s phone number',
            ],
            [
                'name' => 'Gender',
                'tag' => '{{gender}}',
                'description' => 'Subscriber\'s gender',
            ],
            [
                'name' => 'Date Of birth',
                'tag' => '{{dob}}',
                'description' => 'Subscriber\'s date of birth',
            ],
            [
                'name' => 'Language',
                'tag' => '{{language}}',
                'description' => 'Subscriber\'s preferred language',
            ],
            [
                'name' => 'Profile ID',
                'tag' => '{{profile_id}}',
                'description' => 'Unique profile identifier',
            ],
            [
                'name' => 'Country',
                'tag' => '{{country}}',
                'description' => 'Subscriber\'s country',
            ],
            [
                'name' => 'City',
                'tag' => '{{city}}',
                'description' => 'Subscriber\'s city',
            ],
            [
                'name' => 'Age',
                'tag' => '{{age}}',
                'description' => 'Subscriber\'s age',
            ],
            [
                'name' => 'Occupation',
                'tag' => '{{occupation}}',
                'description' => 'Subscriber\'s occupation',
            ],
            [
                'name' => 'Company',
                'tag' => '{{company}}',
                'description' => 'Subscriber\'s company name',
            ],
            [
                'name' => 'Industry',
                'tag' => '{{industry}}',
                'description' => 'Subscriber\'s industry',
            ],
            [
                'name' => 'Interests',
                'tag' => '{{interests}}',
                'description' => 'Subscriber\'s interests',
            ],
            [
                'name' => 'Website',
                'tag' => '{{website}}',
                'description' => 'Subscriber\'s website URL',
            ],
            [
                'name' => 'Social Media',
                'tag' => '{{social_media}}',
                'description' => 'Subscriber\'s social media handles',
            ],
            [
                'name' => 'Subscription Date',
                'tag' => '{{subscription_date}}',
                'description' => 'Date when subscriber joined',
            ],
            [
                'name' => 'Last Activity',
                'tag' => '{{last_activity}}',
                'description' => 'Last activity timestamp',
            ],
            [
                'name' => 'Campaign Source',
                'tag' => '{{campaign_source}}',
                'description' => 'Source of the campaign',
            ],
            [
                'name' => 'Referral Code',
                'tag' => '{{referral_code}}',
                'description' => 'Referral code used',
            ],
            [
                'name' => 'User Agent',
                'tag' => '{{user_agent}}',
                'description' => 'Browser user agent string',
            ],
            [
                'name' => 'IP Address',
                'tag' => '{{ip_address}}',
                'description' => 'Subscriber\'s IP address',
            ],
            [
                'name' => 'Timezone',
                'tag' => '{{timezone}}',
                'description' => 'Subscriber\'s timezone',
            ],
        ];

        foreach ($attributes as $attribute) {
            Attribute::create($attribute);
        }
    }
}
