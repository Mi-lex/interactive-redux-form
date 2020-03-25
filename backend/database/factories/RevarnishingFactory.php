<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PostActions\Revarnishing;
use Faker\Generator as Faker;

$factory->define(Revarnishing::class, function (Faker $faker) {
    return [
        'varnish_type' => function () use ($faker) {
            return  \App\Models\PostActions\VarnishType::create([
                'name' => $faker->word,
                'alias' => $faker->word,
            ])->alias;
        }
    ];
});
