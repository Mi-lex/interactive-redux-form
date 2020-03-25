<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PostActions\StampCut;
use Faker\Generator as Faker;

$factory->define(StampCut::class, function (Faker $faker) {
    return [
        'name' => $faker->word
    ];
});
