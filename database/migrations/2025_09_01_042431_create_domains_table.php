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
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->string('domain');
            $table->integer('desktop_count')->default(0);
            $table->integer('mobile_count')->default(0);
            $table->integer('total_count')->default(0);
            $table->enum('status', ['Active', 'Inactive', 'Pending'])->default('Active');
            $table->boolean('has_warning')->default(false);
            $table->boolean('is_wordpress')->default(false);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};
