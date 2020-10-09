<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('cost');
            $table->integer('quantity');
            $table->string('image')->nullable();
            $table->string('description')->nullable();
            $table->char('name', 100);
            $table->char('sku', 100);
            $table->string('history_price')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Products');
    }
}
