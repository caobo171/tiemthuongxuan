<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImportBillItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ImportBillItems', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('product_id');
            $table->integer('bill_id');
            $table->char('product_name',255);
            $table->char('status', 100);
            $table->integer('cost');
            $table->string('sku');
            $table->integer('quantity');

            $table->index(['product_id', 'bill_id']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ImportBillItems');
    }
}
