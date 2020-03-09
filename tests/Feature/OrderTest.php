<?php

namespace Tests\Feature;

use App\Models\Order;
use Carbon\Carbon;
use Error;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
    public function a_user_can_store_and_update_different_payment_type_info()
    {
        $this->withoutExceptionHandling();
        $payedWithCash = [
            "payment" => [
                'payed_by_cash' => true,
            ]
        ];

        $order = Order::create();

        $response = $this->patch("api/passport/$order->id", $payedWithCash, ["accept" => "application/json"]);
        $response->assertSuccessful();
        $payedWithCash['payment']['order_id'] = 1;

        $this->assertDatabaseHas('payments', $payedWithCash['payment']);

        $paydWithOperation = [
            "payment" => [
                'payed_by_cash' => false,
                'operation' => factory('App\Models\PaymentOperation')->raw()
            ]
        ];

        $org = \App\Models\PaymentOrgType::create(['name' => $this->faker->name]);

        $paydWithOperation['payment']['operation']['org_type'] = $org->name;

        $response = $this->patch("api/passport/$order->id", $paydWithOperation, ["accept" => "application/json"]);

        $paymentAttributes = [
            'order_id' =>   $order->id,
            'payed_by_cash' => false
        ];

        $this->assertDatabaseHas('payments', $paymentAttributes);
    }
}
