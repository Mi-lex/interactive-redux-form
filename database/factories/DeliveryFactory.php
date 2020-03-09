<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Delivery;
use Faker\Generator as Faker;

$factory->define(Delivery::class, function (Faker $faker) {
    $shouldBeDelivered = $faker->boolean;

    $attributes = [
        "should_be_delivered" => $shouldBeDelivered,
    ];

    if ($shouldBeDelivered) {
        $attributes['address'] = $faker->text;
    }

    return $attributes;
});
