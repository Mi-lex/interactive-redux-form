<?php

namespace Tests\Feature;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Order;
use App\Models\PaperJoiner;

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

            $rowBody = $body->toArray();
            unset($rowBody['id']);

            $joinerRequestParams = [
                $joinerType => $rowBody
            ];

            $response = $this->patch("api/passport/$order->id", ["paper_joiner" => $joinerRequestParams], ["accept" => "application/json"]);

            $response->assertSuccessful();

            $this->assertDatabaseHas('paper_joiners', ['type' => $joinerType, 'order_id' => $order->id]);
            // check created joiner body existence
            $this->assertDatabaseHas($body->getTable(), $rowBody);
        }
    }

    // There could be a lot of elements right
    // so we just need to create a case with one element and several
    // try to save them and check the existence of elements and their quantity 
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
            $this->assertEquals($elementCount, $quantity);
        }
    }
}
