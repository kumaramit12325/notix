<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Models\User;
use App\Models\UserPayment;
use Illuminate\Console\Command;

class DemoOrderPayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'demo:order-payment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Demonstrate Order and Payment functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Order and Payment System Demonstration ===');
        $this->newLine();

        // Get all users
        $users = User::all();
        if ($users->isEmpty()) {
            $this->error('No users found. Please run UserSeeder first.');
            return;
        }

        $this->info('📊 Overall Statistics:');
        $this->showOverallStats();
        $this->newLine();

        $this->info('👥 User-wise Statistics:');
        foreach ($users as $user) {
            $this->showUserStats($user);
        }
        $this->newLine();

        $this->info('📋 Recent Orders:');
        $this->showRecentOrders();
        $this->newLine();

        $this->info('💰 Recent Payments:');
        $this->showRecentPayments();
        $this->newLine();

        $this->info('✅ Demonstration completed successfully!');
    }

    private function showOverallStats()
    {
        $totalUsers = User::count();
        $totalOrders = Order::count();
        $completedOrders = Order::where('status', 'Completed')->count();
        $totalRevenue = Order::where('payment_status', 'Paid')->sum('total_amount');
        $totalPayments = UserPayment::count();
        $completedPayments = UserPayment::where('status', 'Completed')->count();

        $this->line("Total Users: {$totalUsers}");
        $this->line("Total Orders: {$totalOrders}");
        $this->line("Completed Orders: {$completedOrders}");
        $this->line("Total Revenue: $" . number_format($totalRevenue, 2));
        $this->line("Total Payments: {$totalPayments}");
        $this->line("Completed Payments: {$completedPayments}");
    }

    private function showUserStats(User $user)
    {
        $totalOrders = $user->getTotalOrders();
        $completedOrders = $user->getCompletedOrders();
        $totalSpent = $user->getTotalSpent();
        $totalPayments = $user->payments()->count();
        $completedPayments = $user->payments()->where('status', 'Completed')->count();

        $this->line("User: {$user->name} ({$user->email})");
        $this->line("  - Orders: {$totalOrders} (Completed: {$completedOrders})");
        $this->line("  - Total Spent: $" . number_format($totalSpent, 2));
        $this->line("  - Payments: {$totalPayments} (Completed: {$completedPayments})");
        $this->newLine();
    }

    private function showRecentOrders()
    {
        $orders = Order::with('user')->latest()->take(5)->get();
        
        foreach ($orders as $order) {
            $statusColor = $this->getStatusColor($order->status);
            $paymentColor = $this->getPaymentStatusColor($order->payment_status);
            
            $this->line("Order #{$order->order_number} - {$order->product_name}");
            $this->line("  User: {$order->user->name}");
            $this->line("  Amount: $" . number_format($order->total_amount, 2));
            $this->line("  Status: <fg={$statusColor}>{$order->status}</>");
            $this->line("  Payment: <fg={$paymentColor}>{$order->payment_status}</>");
            $this->line("  Date: {$order->order_date->format('Y-m-d H:i')}");
            $this->newLine();
        }
    }

    private function showRecentPayments()
    {
        $payments = UserPayment::with(['user', 'order'])->latest()->take(5)->get();
        
        foreach ($payments as $payment) {
            $statusColor = $this->getPaymentStatusColor($payment->status);
            
            $this->line("Payment #{$payment->payment_number}");
            $this->line("  User: {$payment->user->name}");
            $this->line("  Amount: $" . number_format($payment->amount, 2));
            $this->line("  Method: {$payment->payment_method}");
            $this->line("  Status: <fg={$statusColor}>{$payment->status}</>");
            if ($payment->order) {
                $this->line("  Order: #{$payment->order->order_number}");
            }
            $this->line("  Date: {$payment->payment_date->format('Y-m-d H:i')}");
            $this->newLine();
        }
    }

    private function getStatusColor(string $status): string
    {
        return match($status) {
            'Completed' => 'green',
            'Processing' => 'yellow',
            'Pending' => 'blue',
            'Cancelled' => 'red',
            default => 'white'
        };
    }

    private function getPaymentStatusColor(string $status): string
    {
        return match($status) {
            'Paid', 'Completed' => 'green',
            'Pending' => 'yellow',
            'Failed' => 'red',
            default => 'white'
        };
    }
}
