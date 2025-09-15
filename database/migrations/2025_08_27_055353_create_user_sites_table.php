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
        Schema::create('user_sites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('site_name');
            $table->string('site_url');
            $table->string('badge_icon_url')->nullable();
            $table->string('notification_icon_url')->nullable();
            $table->enum('status', ['Active', 'Inactive', 'Pending'])->default('Active');
            $table->boolean('is_connected')->default(false);
            $table->integer('clicks')->default(0);
            $table->integer('conversions')->default(0);
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index('is_connected');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_sites');
    }
};
