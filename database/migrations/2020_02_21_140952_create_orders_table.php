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
            $table->string('name');
            $table->unsignedMediumInteger('manager_id')->nullable(); // yet
            $table->unsignedMediumInteger('customer_id');
            $table->unsignedMediumInteger('payment_id');
            $table->unsignedMediumInteger('paper_joiner_id');
            $table->unsignedMediumInteger('package_id');
            $table->unsignedMediumInteger('delivery_id');
            $table->unsignedBigInteger('post_action_id');
            $table->timestamps();

            $table->foreign('manager_id')->references('id')->on('users');
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->foreign('payment_id')->references('id')->on('payments');
            $table->foreign('paper_joiner_id')->references('id')->on('paper_joiners');
            $table->foreign('package_id')->references('id')->on('packages');
            $table->foreign('delivery_id')->references('id')->on('deliveries');
            $table->foreign('post_action_id')->references('id')->on('post_actions');
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
