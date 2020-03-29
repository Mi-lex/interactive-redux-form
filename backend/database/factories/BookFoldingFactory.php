<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Models\PostActions\BookFolding;
use App\Models\PostActions\BookFoldingType;

$factory->define(BookFolding::class, function (Faker $faker) {
    return [
        'color' => $faker->colorName,
        'type' => function() use ($faker) {
            return BookFoldingType::create([
                'name' => $faker->word,
                'alias' => Str::random(5)
            ])->alias;
        }
    ];
});
