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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();
            $table->string('product_name');
            $table->text('description')->nullable();
            $table->decimal('amount', 10, 2);
            $table->integer('quantity')->default(1);
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['Pending', 'Processing', 'Completed', 'Cancelled'])->default('Pending');
            $table->string('payment_status')->default('Pending'); // Pending, Paid, Failed
            $table->timestamp('order_date')->useCurrent();
            $table->timestamp('delivery_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['user_id', 'status']);
            $table->index('order_number');
            $table->index('order_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
