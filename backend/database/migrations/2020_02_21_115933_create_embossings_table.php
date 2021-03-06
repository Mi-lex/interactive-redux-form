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
            
            $table->string('foil_type')->nullable();
            $table->foreign('foil_type')->references('alias')->on('foil_types');
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
