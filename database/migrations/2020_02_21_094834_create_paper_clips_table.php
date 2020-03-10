<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaperClipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paper_clips', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->boolean('auto')->default(0);
            $table->boolean('manual')->default(0);
            $table->unsignedInteger('quantity')->nullable();
            $table->unsignedBigInteger('width')->nullable();
            $table->unsignedBigInteger('drift')->nullable();

            $table->string('type')->nullable();
            $table->foreign('type')->references('alias')->on('paper_clip_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paper_clips');
    }
}
