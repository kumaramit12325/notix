<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample users
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'phone' => '1234567890',
            'role' => 'Admin',
            'status' => 'Active',
        ]);

        User::create([
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'phone' => '1234567890',
            'role' => 'User',
            'status' => 'Active',
        ]);

        User::create([
            'name' => 'Test Agent',
            'email' => 'agent@example.com',
            'password' => Hash::make('password'),
            'phone' => null,
            'role' => 'Agent',
            'status' => 'Active',
        ]);

        User::create([
            'name' => 'demo user',
            'email' => 'demouser@gmail.com',
            'password' => Hash::make('password'),
            'phone' => '1234567890',
            'role' => 'User',
            'status' => 'Active',
        ]);

        // Create additional random users
        User::factory(10)->create();
    }
}
