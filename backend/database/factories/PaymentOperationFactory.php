<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\Models\PaymentOperation;

$factory->define(PaymentOperation::class, function (Faker $faker) {
    return [
        "account_number" => $faker->randomDigit,
        "date" => $faker->date,
        "org_type" => function () use ($faker) {
            return \App\Models\PaymentOrgType::create(["alias" => Str::random(5), "name" => $faker->word])->alias;
        },
        "payment_id" => function () {
            return factory('App\Models\Payment')->create(['payed_by_cash' => false])->id;
        }
    ];
});
