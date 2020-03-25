<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PostActions\BookFolding;
use App\Models\PostActions\BookFoldingType;
use Faker\Generator as Faker;

$factory->define(BookFolding::class, function (Faker $faker) {
    return [
        'color' => $faker->colorName,
        'type' => function() use ($faker) {
            return BookFoldingType::create([
                'name' => $faker->word,
                'alias' => $faker->word
            ])->alias;
        }
    ];
});
