<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (!Schema::hasTable('candidates')) {
            Schema::create('candidates', function (Blueprint $table) {
                $table->id();
                $table->foreignId('position_id')->constrained()->onDelete('cascade');
                $table->string('name');
                $table->string('email');
                $table->string('phone')->nullable();
                $table->string('cv_path');
                $table->float('ai_rating')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
