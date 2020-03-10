<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PaperJoiners\Spring;
use Faker\Generator as Faker;

$factory->define(Spring::class, function (Faker $faker) {
    return [
        "color" => $faker->colorName,
        'position' => $faker->word,
        'cover_block_difference' => $faker->randomDigit
    ];
});
