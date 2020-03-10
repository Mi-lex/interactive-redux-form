<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\PaperJoiners\Special;
use Faker\Generator as Faker;

$factory->define(Special::class, function (Faker $faker) {
    return [
        'description' => $faker->text
    ];
});
