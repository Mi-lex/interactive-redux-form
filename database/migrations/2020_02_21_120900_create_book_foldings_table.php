<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookFoldingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_foldings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('color');
            $table->text('description');

            $table->unsignedBigInteger('post_action_id');
            $table->foreign('post_action_id')->references('id')->on('post_actions');

            $table->unsignedTinyInteger('book_folding_type_id');
            $table->foreign('book_folding_type_id')->references('id')->on('book_folding_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('book_foldings');
    }
}
