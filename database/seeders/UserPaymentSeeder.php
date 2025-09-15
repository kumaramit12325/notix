<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use App\Models\UserPayment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPaymentSeeder extends Seeder
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

        $paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];
        $statuses = ['Pending', 'Completed', 'Failed', 'Refunded'];

        foreach ($users as $user) {
            // Get user's orders
            $orders = $user->orders;
            
            foreach ($orders as $order) {
                // Create payment for each order
                $payment = UserPayment::create([
                    'user_id' => $user->id,
                    'order_id' => $order->id,
                    'payment_number' => UserPayment::generatePaymentNumber(),
                    'amount' => $order->total_amount,
                    'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                    'status' => $statuses[array_rand($statuses)],
                    'transaction_id' => 'TXN' . strtoupper(substr(md5(uniqid()), 0, 10)),
                    'gateway_response' => rand(0, 1) ? 'Payment processed successfully' : null,
                    'payment_date' => $order->order_date,
                    'notes' => rand(0, 1) ? 'Sample payment notes' : null,
                ]);

                // Update order payment status based on payment status
                if ($payment->status === 'Completed') {
                    $order->update(['payment_status' => 'Paid']);
                } elseif ($payment->status === 'Failed') {
                    $order->update(['payment_status' => 'Failed']);
                }
            }
        }

        $this->command->info('Sample payments created successfully!');
    }
}
