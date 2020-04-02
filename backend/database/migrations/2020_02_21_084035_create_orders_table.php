<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->string('type')->nullable();
            $table->text('important_info')->nullable();
            $table->timestamps();
            $table->date('completion_date')->nullable();
            $table->time('completion_time')->nullable();
            /**
             * implementation details. Might be a good idea to move
             * details of implementation into separate table, might not ¯\_(ツ)_/¯ 
             */
            $table->boolean('is_similar_order')->default(false);
            $table->unsignedBigInteger('similar_order_id')->nullable();
            $table->string('is_cut')->nullable();
            $table->string('circulation')->nullable();

            $table->unsignedBigInteger('manager_id');
            $table->unsignedBigInteger('customer_id')->nullable();

            $table->foreign('manager_id')->references('id')->on('users');
            $table->foreign('customer_id')->references('id')->on('customers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
