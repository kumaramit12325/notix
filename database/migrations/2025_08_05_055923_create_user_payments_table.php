<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained()->onDelete('set null');
            $table->string('payment_number')->unique();
            $table->decimal('amount', 10, 2);
            $table->enum('payment_method', ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'])->default('Cash');
            $table->enum('status', ['Pending', 'Completed', 'Failed', 'Refunded'])->default('Pending');
            $table->string('transaction_id')->nullable();
            $table->string('gateway_response')->nullable();
            $table->timestamp('payment_date')->useCurrent();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['user_id', 'status']);
            $table->index('payment_number');
            $table->index('transaction_id');
            $table->index('payment_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_payments');
    }
};
