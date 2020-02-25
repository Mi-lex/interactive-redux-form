<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderElementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_elements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedMediumInteger('stripes')->nullable();
            $table->string('material');
            $table->unsignedTinyInteger('print_type_id');
            $table->unsignedSmallInteger('brightness');
            $table->string('color_interpretation');
            $table->unsignedBigInteger('order_id');

            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('print_type_id')->references('id')->on('print_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_elements');
    }
}
