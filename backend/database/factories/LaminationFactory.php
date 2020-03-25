<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PostActions\Lamination;
use Faker\Generator as Faker;

$factory->define(Lamination::class, function (Faker $faker) {
    return [
        'type' => function() use ($faker) {
            return \App\Models\PostActions\LaminationType::create([
                'name' => $faker->word,
                'alias' => $faker->word,
            ])->alias;
        }
    ];
});
