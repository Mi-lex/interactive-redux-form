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
            $table->date('completion_date')->nullabe();
            $table->time('completion_time')->nullable();
            /**
             * implementation details. Might be a good idea to move
             * details of implementation into separate table, might not ¯\_(ツ)_/¯ 
             */
            $table->boolean('is_cut')->default(false);
            $table->string('circulation')->nullable();
            $table->unsignedBigInteger('similar_order_id')->nullable();

            $table->unsignedMediumInteger('manager_id')->nullable();
            $table->unsignedMediumInteger('customer_id')->nullable();
            $table->unsignedMediumInteger('payment_id')->nullable();
            $table->unsignedMediumInteger('package_id')->nullable();
            $table->unsignedMediumInteger('paper_joiner_id')->nullable();
            $table->unsignedMediumInteger('delivery_id')->nullable();
            $table->unsignedBigInteger('post_action_id')->nullable();

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
