<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Models\PostActions\Revarnishing;

$factory->define(Revarnishing::class, function (Faker $faker) {
    return [
        'varnish_type' => function () use ($faker) {
            return  \App\Models\PostActions\VarnishType::create([
                'name' => $faker->word,
                'alias' => Str::random(5),
            ])->alias;
        }
    ];
});
