<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\OrderElement;
use Faker\Generator as Faker;

$factory->define(OrderElement::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'stripes' => $faker->word,
        'material' => $faker->word,
        'print_type' => function () use ($faker) {
            return \App\Models\PrintType::create([
                'name' => $faker->name,
                'alias' => $faker->word
            ])->alias;
        },
        'brightness' => $faker->text(10),
        'color_interpretation' => $faker->word,
        'order_id' => function () {
            return \App\Models\Order::create()->id;
        }
    ];
});
