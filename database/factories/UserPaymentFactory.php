<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserPayment>
 */
class UserPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'order_id' => Order::factory(),
            'payment_number' => 'PAY-' . $this->faker->unique()->numberBetween(1000, 9999),
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'payment_method' => $this->faker->randomElement(['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet']),
            'status' => $this->faker->randomElement(['Pending', 'Completed', 'Failed', 'Refunded']),
            'transaction_id' => $this->faker->unique()->regexify('[A-Z0-9]{10}'),
            'gateway_response' => $this->faker->optional()->sentence(),
            'notes' => $this->faker->optional()->sentence(),
            'payment_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the payment is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Completed',
        ]);
    }

    /**
     * Indicate that the payment is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Pending',
        ]);
    }

    /**
     * Indicate that the payment failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Failed',
        ]);
    }
} 