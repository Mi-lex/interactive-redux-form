<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Carbon\Carbon;
use App\Models\PaymentOperation;
use Faker\Generator as Faker;

$factory->define(PaymentOperation::class, function (Faker $faker) {
    return [
        "account_number" => $faker->randomDigit,
        "date" => $faker->date,
        "org_type" => function () use ($faker) {
            return \App\Models\PaymentOrgType::create(["alias" => $faker->word, "name" => $faker->word])->alias;
        },
        "payment_id" => function () {
            return factory('App\Models\Payment')->create(['payed_by_cash' => false])->id;
        }
    ];
});
