<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRevanishingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('revanishings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('description');

            $table->unsignedBigInteger('post_action_id');
            $table->foreign('post_action_id')->references('id')->on('post_actions');

            $table->unsignedTinyInteger('varnish_type_id');
            $table->foreign('varnish_type_id')->references('id')->on('varnish_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('revanishings');
    }
}
