<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTermosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('termos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedMediumInteger('spine_width')->nullable();
            $table->boolean('flaps_cover')->default(false);
            $table->boolean('flush_with_block')->default(false);
            $table->boolean('braces')->default(false);

            $table->unsignedMediumInteger('paper_joiner_id');
            $table->foreign('paper_joiner_id')->references('id')->on('paper_joiners')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('termos');
    }
}
