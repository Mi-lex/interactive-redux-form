<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PostActions\Embossing;
use Faker\Generator as Faker;
use App\Models\PostActions\FoilType;

$factory->define(Embossing::class, function (Faker $faker) {
    return [
        'foil_type' => function () use ($faker) {
            return FoilType::create([
                "name" => $faker->word,
                "alias" => $faker->word
            ])->alias;
        }
    ];
});
