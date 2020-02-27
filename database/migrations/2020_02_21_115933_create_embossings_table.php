<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmbossingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('embossings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('post_action_id');
            $table->foreign('post_action_id')->references('id')->on('post_actions');
            
            $table->unsignedTinyInteger('type_id');
            $table->foreign('type_id')->references('id')->on('embossing_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('embossings');
    }
}
