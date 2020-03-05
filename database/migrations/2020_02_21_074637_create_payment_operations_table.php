<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentOperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_operations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('account_number');

            $table->unsignedBigInteger('payment_id')->nullable();
            $table->foreign('payment_id')->references('id')->on('payments')->onDelete('cascade');

            $table->date('date')->nullable();

            $table->unsignedTinyInteger('org_type_id');
            $table->foreign('org_type_id')->references('id')->on('payment_org_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_operations');
    }
}
