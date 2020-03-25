<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PaperJoiners\Packet;
use Faker\Generator as Faker;

$factory->define(Packet::class, function (Faker $faker) {
    return [
        'grommet_color' => $faker->colorName,
        'hands_color' => $faker->colorName,
    ];
});
