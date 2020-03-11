<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRevarnishingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('revarnishings', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('varnish_type')->nullable();
            $table->foreign('varnish_type')->references('alias')->on('varnish_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('revarnishings');
    }
}
