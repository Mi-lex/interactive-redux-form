<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PaperJoiners\PaperClip;
use Faker\Generator as Faker;

$factory->define(PaperClip::class, function (Faker $faker) {
    return [
        'auto' => $faker->boolean,
        'manual' => $faker->boolean,
        'quantity' => $faker->randomDigit,
        'width' => $faker->randomDigit,
        'drift' => $faker->randomDigit,
        'type' => function () use ($faker) {
            return \App\Models\PaperJoiners\PaperClipType::create(['name' => $faker->name, 'alias' => $faker->text(5)])->alias;
        }
    ];
});
