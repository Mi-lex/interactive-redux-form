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
            $table->string('color')->nullable();

            $table->unsignedTinyInteger('type_id')->nullable();
            $table->foreign('type_id')->references('id')->on('book_folding_types');
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
