<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('credit_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->integer('credits');
            $table->string('stripe_payment_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('credit_purchases');
    }
};