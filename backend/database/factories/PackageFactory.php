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
        'order_id' => $faker->randomDigit,
        'type' => function () use ($faker) {
            return \App\Models\PackageType::create(["alias" => $faker->word, "name" => $faker->word])->alias;
        }
    ];
});
