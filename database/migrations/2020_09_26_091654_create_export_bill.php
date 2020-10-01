<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExportBill extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ExportBills', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->timestamps();
            $table->integer('cost');
            $table->char('status', 100);
            $table->integer('customer_id');
            $table->string('data');
            $table->integer('extra_cost');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ExportBills');
    }
}
