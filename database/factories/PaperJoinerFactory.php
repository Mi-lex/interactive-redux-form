<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\PaperJoiner;
use Faker\Generator as Faker;

$factory->define(PaperJoiner::class, function (Faker $faker) {
    $joinerType = $faker->randomElement(PaperJoiner::NAMES);

    $body = factory(Relation::getMorphedModel($joinerType))->create();

    return [
        'type' =>  $joinerType,
        'joinable_id' => $body->id,
        // this is not supposed to be here, but what if I want to make "request like" array real quick
        'body' => $body->toArray(),
        'order_id' => function() {
            return factory('App\Models\Order')->create()->id;
        }
    ];
});