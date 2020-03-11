<?php

namespace Tests\Feature;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Order;
use App\Models\PaperJoiner;
use App\Models\PostAction;

class OrderTest extends TestCase
{
    use DatabaseMigrations, WithFaker;

    /** @test */
    public function a_user_can_create_an_order()
    {
        $this->withoutExceptionHandling();

        $content = $this->post('/api/passport')->decodeResponseJson();
        $this->assertDatabaseHas('orders', $content);
    }

    /** @test */
    public function a_user_can_update_direct_order_attribute()
    {
        $this->withoutExceptionHandling();

        $order = factory('App\Models\Order')->create();

        $response = $this->patch("api/passport/$order->id", $order->toArray(), ["accept" => "application/json"]);

        $response->assertSuccessful();

        $this->assertDatabaseHas('orders', [
            "name" => $order['name'],
            "type" => $order['type']
        ]);
    }

    /** @test */
    public function a_user_can_store_and_update_different_payment_type()
    {
        $this->withoutExceptionHandling();

        $order = Order::create();

        $paymentAttributes = [
            [
                "payed_by_cash" => false,
                "operation" => factory('App\Models\PaymentOperation')->raw(),
            ],
            [
                "payed_by_cash" => true
            ]
        ];

        foreach ($paymentAttributes as $payment) {
            $response = $this->patch("api/passport/$order->id", ["payment" => $payment], ["accept" => "application/json"]);
            $response->assertSuccessful();

            $payment['order_id'] = $order->id;

            unset($payment['operation']);

            $this->assertDatabaseHas('payments', $payment);
        }
    }

    /** @test */
    public function a_user_can_store_and_update_package_info()
    {
        $this->withoutExceptionHandling();

        $order = Order::create();

        $packageAttributes = factory('App\Models\Package', 2)->make()->toArray();

        foreach ($packageAttributes as $package) {
            $response = $this->patch("api/passport/$order->id", ["package" => $package], ["accept" => "application/json"]);

            $response->assertSuccessful();

            $package['order_id'] = $order->id;

            $this->assertDatabaseHas('packages', $package);
        }
    }

    /** @test */
    public function a_user_can_store_and_update_delivery_info()
    {
        $this->withoutExceptionHandling();

        $order = Order::create();

        $deliveryAttributes = factory('App\Models\Delivery', 3)->make()->toArray();

        foreach ($deliveryAttributes as $delivery) {
            $response = $this->patch("api/passport/$order->id", ["delivery" => $delivery], ["accept" => "application/json"]);

            $response->assertSuccessful();

            $delivery['order_id'] = $order->id;

            $this->assertDatabaseHas('deliveries', $delivery);
        }
    }

    /** @test */
    public function a_user_can_store_and_update_paper_joiner_info()
    {
        $this->withoutExceptionHandling();

        $order = Order::create();

        foreach (PaperJoiner::NAMES as $joinerType) {
            $body = factory(Relation::getMorphedModel($joinerType))->create();

            $rawBody = $body->toArray();
            unset($rawBody['id']);

            $joinerRequestParams = [
                $joinerType => $rawBody
            ];

            $response = $this->patch("api/passport/$order->id", ["paper_joiner" => $joinerRequestParams], ["accept" => "application/json"]);

            $response->assertSuccessful();

            $this->assertDatabaseHas('paper_joiners', ['type' => $joinerType, 'order_id' => $order->id]);
            // check created joiner body existence
            $this->assertDatabaseHas($body->getTable(), $rawBody);
        }
    }

    /** @test */
    public function a_user_can_store_and_update_element()
    {
        $this->withoutExceptionHandling();

        $elementQuantities = [3, 1];

        $order = Order::create();

        foreach ($elementQuantities as $quantity) {
            $elements = factory('App\Models\OrderElement', $quantity)->raw();
            $response = $this->patch("api/passport/$order->id", ["elements" => $elements], ["accept" => "application/json"]);

            $response->assertSuccessful();

            foreach ($elements as $element) {
                unset($element['order_id']);
                $this->assertDatabaseHas('order_elements', $element);
            }

            $elementCount = Order::find($order->id)->elements->count();
            $this->assertEquals($quantity, $elementCount);
        }
    }

    // wtf with this name right
    /**
     * if column doesn't have specific values (yet) there is no need to create table for
     * that and store only ids.
     */
    private function assertUpdatingPostActionSuccess(string $postActionType, bool $isTableEmpty = false): void
    {
        $this->withoutExceptionHandling();

        $order = Order::create();

        $bodyModelName = Relation::getMorphedModel($postActionType);
        $body = factory($bodyModelName)->make();
        $rawBody = $body->toArray();

        $postActionAttributes = [
            $postActionType => [
                'additional' => $this->faker->text,
                'elements' => $this->faker->text,
                'body' => $rawBody
            ]
        ];

        $response = $this->patch("api/passport/$order->id", ["post_actions" => $postActionAttributes], ["accept" => "application/json"]);

        $response->assertSuccessful();

        unset($postActionAttributes[$postActionType]['body']);

        $this->assertDatabaseHas('post_actions', $postActionAttributes[$postActionType]);

        if (!$isTableEmpty) {
            $this->assertDatabaseHas($body->getTable(), $rawBody);
        }
    }

    // post actions:

    /** @test */
    public function a_user_can_store_and_update_book_folding_info()
    {
        $type = PostAction::BOOK_FOLDING;
        $this->assertUpdatingPostActionSuccess($type);
    }

    /** @test */
    public function a_user_can_store_and_update_creasing_info()
    {
        $type = PostAction::CREASING;
        $this->assertUpdatingPostActionSuccess($type);
    }

    /** @test */
    public function a_user_can_store_and_update_embossing_info()
    {
        $type = PostAction::EMBOSSING;
        $this->assertUpdatingPostActionSuccess($type);
    }

    /** @test */
    public function a_user_can_store_and_update_hot_stamp_info()
    {
        $type = PostAction::HOT_STAMP;
        $this->assertUpdatingPostActionSuccess($type, true);
    }

    /** @test */
    public function a_user_can_store_and_update_lamination_info()
    {
        $type = PostAction::LAMINATION;
        $this->assertUpdatingPostActionSuccess($type);
    }

    /** @test */
    public function a_user_can_store_and_update_perforation_info()
    {
        $type = PostAction::PERFORATION;
        $this->assertUpdatingPostActionSuccess($type, true);
    }

    /** @test */
    public function a_user_can_store_and_update_revarnishing_info()
    {
        $type = PostAction::REVARNISHING;
        $this->assertUpdatingPostActionSuccess($type);
    }

    /** @test */
    public function a_user_can_store_and_update_stamp_cut_info()
    {
        $type = PostAction::STAMP_CUT;
        $this->assertUpdatingPostActionSuccess($type);
    }

    /** @test */
    public function a_user_can_store_and_update_several_post_actions()
    {
        $this->withoutExceptionHandling();

        $order = Order::create();

        for ($i = 0; $i < 2; $i++) {
            // get random quantity of different post actions
            $postActionBodyNames = $this->faker->randomElements(PostAction::NAMES, $this->faker->numberBetween(1, count(PostAction::NAMES)));

            $bodies = collect($postActionBodyNames)->mapWithKeys(function ($postActionName) {
                return [$postActionName => factory(Relation::getMorphedModel($postActionName))->create()];
            });

            $postActionsAttributes = $bodies->mapWithKeys(function ($postAction, $postActionName) {
                $postActionBodyArr = $postAction->toArray();
                unset($postActionBodyArr['id']);
                return [$postActionName => [
                    'body' => $postActionBodyArr,
                    'additional' => $this->faker->text,
                    'elements' => $this->faker->text,
                ]];
            })->toArray();

            $response = $this->patch("api/passport/$order->id", ["post_actions" => $postActionsAttributes], ["accept" => "application/json"]);
            $response->assertSuccessful();

            //  just assert that array lengths are equals 
            $updatedOrder = Order::find($order->id);

            $this->assertEquals($bodies->count(), $updatedOrder->postActions->count());
        }
    }
}
