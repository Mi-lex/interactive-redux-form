<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PaperJoiners\Termo;
use Faker\Generator as Faker;

$factory->define(Termo::class, function (Faker $faker) {
    return [
        'spine_width' => $faker->randomDigit,
        'flaps_cover' => $faker->boolean,
        'flush_with_block' => $faker->boolean,
        'braces' => $faker->boolean,
    ];
});
