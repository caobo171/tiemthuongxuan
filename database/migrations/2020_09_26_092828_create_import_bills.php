<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImportBills extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ImportBills', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->timestamps();
            $table->integer('cost');
            $table->char('status', 100);
            $table->integer('provider_id');
            $table->string('provider_name');
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
        Schema::dropIfExists('ImportBills');
    }
}
