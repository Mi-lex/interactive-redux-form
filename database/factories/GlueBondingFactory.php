<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PaperJoiners\GlueBonding;
use Faker\Generator as Faker;

$factory->define(GlueBonding::class, function (Faker $faker) {
    return [
        'type' => $faker->name,
        'position' => $faker->name
    ];
});
