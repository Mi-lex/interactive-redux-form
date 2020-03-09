<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Carbon\Carbon;
use App\Models\Order;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    return [
        "name" => $faker->name,
        'type' => $faker->name,
        "important_info" => $faker->text,
        "completion_date" => Carbon::now()->format('d.m.y'),
        "completion_time" => Carbon::now()->format('H:i'),
        "is_cut" => $faker->boolean,
        "circulation" => $faker->name,
        // should change it when there will be links to actual orders
        "similar_order_id" => $faker->randomDigit
    ];
});
