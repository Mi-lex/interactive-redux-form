<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Order;
use App\Models\User;
use App\Models\Customer;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    $orderAttributes = [
        "name" => $faker->name,
        'type' => $faker->name,
        "important_info" => $faker->text,
        "completion_date" => $faker->date,
        "completion_time" => $faker->time,
        "is_cut" => $faker->word,
        "circulation" => $faker->name,
        // should change it when there will be links to actual orders
        "is_similar_order" => $faker->boolean,
        'manager_id' => function () {
            return factory(User::class)->create()->id;
        },
        'customer' => function () {
            return factory(Customer::class)->create()->id;
        }
    ];

    if ($orderAttributes["is_similar_order"]) {
        $orderAttributes["similar_order_id"] = $faker->randomDigit;
    }

    return $orderAttributes;
});
