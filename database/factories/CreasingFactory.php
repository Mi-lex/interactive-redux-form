<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PostActions\Creasing;
use Faker\Generator as Faker;

$factory->define(Creasing::class, function (Faker $faker) {
    return [
        'parts' => $faker->word
    ];
});
