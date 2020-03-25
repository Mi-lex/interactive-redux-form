<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Payment;
use Faker\Generator as Faker;

$factory->define(Payment::class, function (Faker $faker) {
    $payed_by_cash = $faker->boolean;
    $attributes = [
        "payed_by_cash" => $payed_by_cash,
        "order_id" => function() {
            return factory('App\Models\Order')->create()->id;
        }
    ];

    return $attributes;
});
