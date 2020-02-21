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
            $table->string('type')->nullable(); // ??
            $table->boolean('auto')->default(false);
            $table->boolean('manual')->default(false);
            $table->unsignedInteger('quantity')->nullable();
            $table->unsignedMediumInteger('width')->nullable();
            $table->unsignedMediumInteger('drift')->nullable();

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
        Schema::dropIfExists('paper_clips');
    }
}
