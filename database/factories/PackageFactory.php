<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Package;
use Faker\Generator as Faker;

$factory->define(Package::class, function (Faker $faker) {
    return [
        'capacity' => $faker->randomDigit,
        'sort' => $faker->boolean,
        'sample' => $faker->boolean,
        'label' => $faker->boolean,
        'paletting' => $faker->boolean,
        'stretch_film' => $faker->boolean,
        'type_id' => $faker->randomDigit,
        'order_id' => $faker->randomDigit,
    ];
});
