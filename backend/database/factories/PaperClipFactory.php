<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Models\PaperJoiners\PaperClip;

$factory->define(PaperClip::class, function (Faker $faker) {
    return [
        'auto' => $faker->boolean,
        'manual' => $faker->boolean,
        'quantity' => $faker->randomDigit,
        'width' => $faker->randomDigit,
        'drift' => $faker->randomDigit,
        'type' => function () use ($faker) {
            return \App\Models\PaperJoiners\PaperClipType::create(['name' => $faker->name, 'alias' => Str::random(5)])->alias;
        }
    ];
});
