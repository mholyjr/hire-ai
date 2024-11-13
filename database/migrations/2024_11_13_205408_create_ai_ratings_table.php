<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ai_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->onDelete('cascade');
            $table->decimal('rating', 3, 1);
            $table->text('summary');
            $table->text('cons');
            $table->text('pros');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ai_ratings');
    }
};
