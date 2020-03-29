<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Models\PostActions\Lamination;

$factory->define(Lamination::class, function (Faker $faker) {
    return [
        'type' => function() use ($faker) {
            return \App\Models\PostActions\LaminationType::create([
                'name' => $faker->word,
                'alias' => Str::random(5),
            ])->alias;
        }
    ];
});
