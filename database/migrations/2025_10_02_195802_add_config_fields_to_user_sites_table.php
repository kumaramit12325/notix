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
        Schema::table('user_sites', function (Blueprint $table) {
            $table->boolean('remove_powered_by')->default(false)->after('is_connected');
            $table->boolean('universal_subscription_link')->default(false)->after('remove_powered_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_sites', function (Blueprint $table) {
            $table->dropColumn(['remove_powered_by', 'universal_subscription_link']);
        });
    }
};
