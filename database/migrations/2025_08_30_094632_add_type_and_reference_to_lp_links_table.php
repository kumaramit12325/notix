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
        Schema::table('lp_links', function (Blueprint $table) {
            $table->string('type')->nullable()->after('id'); // youtube, general, etc.
            $table->unsignedBigInteger('reference_id')->nullable()->after('type'); // ID of the referenced model
            $table->string('url')->nullable()->after('reference_id'); // For YouTube channels, this will be the LP link URL
            
            // Add indexes for better performance
            $table->index(['type', 'reference_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lp_links', function (Blueprint $table) {
            $table->dropIndex(['type', 'reference_id']);
            $table->dropColumn(['type', 'reference_id', 'url']);
        });
    }
};
