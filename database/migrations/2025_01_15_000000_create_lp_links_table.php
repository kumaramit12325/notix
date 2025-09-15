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
        Schema::create('lp_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('handle');
            $table->string('lp_link');
            $table->integer('desktop')->default(0);
            $table->integer('mobile')->default(0);
            $table->enum('status', ['Active', 'Paused'])->default('Active');
            $table->string('target_link')->nullable();
            $table->string('domain')->nullable();
            $table->text('prompt_text')->nullable();
            $table->integer('clicks')->default(0);
            $table->integer('conversions')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lp_links');
    }
};
