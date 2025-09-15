<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->randomFloat(2, 10, 500);
        $quantity = $this->faker->numberBetween(1, 10);
        
        return [
            'user_id' => User::factory(),
            'order_number' => 'ORD-' . $this->faker->unique()->numberBetween(1000, 9999),
            'product_name' => $this->faker->words(3, true),
            'description' => $this->faker->optional()->sentence(),
            'amount' => $amount,
            'quantity' => $quantity,
            'total_amount' => $amount * $quantity,
            'status' => $this->faker->randomElement(['Pending', 'Processing', 'Completed', 'Cancelled']),
            'payment_status' => $this->faker->randomElement(['Pending', 'Paid', 'Failed']),
            'order_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'delivery_date' => $this->faker->optional()->dateTimeBetween('now', '+1 month'),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the order is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'Paid',
        ]);
    }

    /**
     * Indicate that the order is pending payment.
     */
    public function pendingPayment(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'Pending',
        ]);
    }
} 