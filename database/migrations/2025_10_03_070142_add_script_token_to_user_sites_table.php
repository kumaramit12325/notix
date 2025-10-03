<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_sites', function (Blueprint $table) {
            $table->string('script_token')->nullable()->after('site_url');
        });
        
        DB::table('user_sites')->get()->each(function ($site) {
            DB::table('user_sites')
                ->where('id', $site->id)
                ->update(['script_token' => \Illuminate\Support\Str::random(32)]);
        });
        
        Schema::table('user_sites', function (Blueprint $table) {
            $table->string('script_token')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_sites', function (Blueprint $table) {
            $table->dropColumn('script_token');
        });
    }
};
