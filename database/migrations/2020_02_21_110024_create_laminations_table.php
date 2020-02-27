<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLaminationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('laminations', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('post_action_id');
            $table->foreign('post_action_id')->references('id')->on('post_actions');

            $table->unsignedTinyInteger('lamination_type_id');
            $table->foreign('lamination_type_id')->references('id')->on('lamination_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('laminations');
    }
}
