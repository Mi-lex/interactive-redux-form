<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreasingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('creasings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('parts');

            $table->unsignedBigInteger('post_action_id');
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
        Schema::dropIfExists('creasings');
    }
}
