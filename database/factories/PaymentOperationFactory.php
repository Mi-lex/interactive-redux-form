<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Carbon\Carbon;
use App\Models\PaymentOperation;
use Faker\Generator as Faker;

$factory->define(PaymentOperation::class, function (Faker $faker) {
    $org_types = DB::table('payment_org_types')->get()->pluck('name');

    return [
        "org_type" => $faker->randomElement($org_types),
        "account_number" => $faker->randomDigit,
        "date" => Carbon::now()->format('d.m.y')
    ];
});
