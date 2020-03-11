<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\PostAction;
use Faker\Generator as Faker;

$factory->define(PostAction::class, function (Faker $faker) {
    $postActionType = $faker->randomElement(PostAction::NAMES);

    $body = factory(Relation::getMorphedModel($postActionType))->create();

    return [
        'type' =>  $postActionType,
        'additional' => $this->faker->text,
        'elements' => $this->faker->text,
        'actionable_id' => $body->id,
        'order_id' => function () {
            return factory('App\Models\Order')->create()->id;
        }
    ];
});
