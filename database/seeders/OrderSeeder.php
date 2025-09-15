<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        
        if ($users->isEmpty()) {
            $this->command->info('No users found. Please run UserSeeder first.');
            return;
        }

        $products = [
            ['name' => 'iPhone 15 Pro', 'price' => 999.99],
            ['name' => 'MacBook Air M2', 'price' => 1199.99],
            ['name' => 'iPad Air', 'price' => 599.99],
            ['name' => 'AirPods Pro', 'price' => 249.99],
            ['name' => 'Apple Watch Series 9', 'price' => 399.99],
        ];

        $statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
        $paymentStatuses = ['Pending', 'Paid', 'Failed'];

        foreach ($users as $user) {
            // Create 2-5 orders per user
            $orderCount = rand(2, 5);
            
            for ($i = 0; $i < $orderCount; $i++) {
                $product = $products[array_rand($products)];
                $quantity = rand(1, 3);
                $amount = $product['price'];
                $totalAmount = $amount * $quantity;
                
                $order = Order::create([
                    'user_id' => $user->id,
                    'order_number' => Order::generateOrderNumber(),
                    'product_name' => $product['name'],
                    'description' => 'Sample order for ' . $product['name'],
                    'amount' => $amount,
                    'quantity' => $quantity,
                    'total_amount' => $totalAmount,
                    'status' => $statuses[array_rand($statuses)],
                    'payment_status' => $paymentStatuses[array_rand($paymentStatuses)],
                    'order_date' => now()->subDays(rand(1, 30)),
                    'delivery_date' => rand(0, 1) ? now()->addDays(rand(1, 7)) : null,
                    'notes' => rand(0, 1) ? 'Sample order notes' : null,
                ]);
            }
        }

        $this->command->info('Sample orders created successfully!');
    }
}
