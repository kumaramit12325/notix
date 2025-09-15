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
        Schema::table('you_tube_channels', function (Blueprint $table) {
            $table->enum('status', ['Active', 'Paused'])->default('Active')->after('logo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('you_tube_channels', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
