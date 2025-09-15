<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('segmentation_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('domains')->default('All');
            $table->text('condition');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('segmentation_rules');
    }
};


