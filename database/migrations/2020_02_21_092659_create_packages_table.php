<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('capacity')->nullable();
            $table->boolean('sort')->default(false);
            $table->boolean('sample')->default(false);
            $table->boolean('label')->default(false);
            $table->boolean('paletting')->default(false);
            $table->boolean('stretch_film')->default(false);

            $table->unsignedTinyInteger('type_id');
            $table->foreign('type_id')->references('id')->on('package_types');

            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('packages');
    }
}
