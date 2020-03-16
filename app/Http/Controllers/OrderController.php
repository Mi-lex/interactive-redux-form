<?php

namespace App\Http\Controllers;

use App\Http\Requests\PassportUpdateRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderElement;
use App\Models\PostAction;

class OrderController extends Controller
{
    private function returnPassport($id)
    {
        return response()->json(Order::with(
            [
                'paperJoiner.body', 'customer',
                'payment.operation', 'package', 'delivery',
                'elements', 'postActions.body'
            ]
        )->whereId($id)->first());
    }
    /**
     * Return a list of orders
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Order::with(['manager', 'customer', 'payment.operation.organization'])
            ->get()->map(function ($order) {
                if ($order->manager !== null) {
                    $order->manager = $order->manager->only('second_name');
                }

                if ($order->customer !== null) {
                    $order->customer = $order->customer->only('name');
                }

                if ($order->payment !== null) {
                    $order->payment = $order->payment->only('payed_by_cash', 'operation');
                }

                return  $order->only(['name', 'id', 'type', 'manager', 'customer', 'payment', 'completion_date', 'created_at']);
            });
    }

    public function create()
    {
        $newOrder = Order::create();

        return $newOrder->only(['id', 'created_at']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->returnPassport($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PassportUpdateRequest $request, Order $order)
    {
        if (isset($request['customer'])) {
            $customer = Customer::firstOrCreate(["name" => $request['customer.name']]);
            $order->customer()->associate($customer);
        }

        $order->payment()->updateOrCreate([], $request['payment'] ?? []);

        $order->payment->operation()->delete();

        if (isset($request['payment.operation']) && $request['payment.payed_by_cash'] === false) {
            $order->payment->operation()->updateOrCreate([], $request['payment.operation']);
        }
        /*
         * if field exists in the request and it's empty
         * it means that paper_joiner was deleted
         * if it's not empty we still should delete it, coz it could be redefined
         */
        if (isset($request['paper_joiner'])) {
            $order->paperJoiner()->delete();

            if (!empty($request['paper_joiner'])) {
                $joinerType = array_key_first($request['paper_joiner']);

                $joinerModel = $order->paperJoiner()->make(["type" => $joinerType]);

                if (!empty($bodyInfo = $request['paper_joiner'][$joinerType])) {
                    $joinerModelBody = $joinerModel->body()->create($bodyInfo);
                    $joinerModel->body()->associate($joinerModelBody);
                    $joinerModel->body->save();
                }

                $joinerModel->save();
            }
        }
        /*
         * if field is set, delete all elements
         * if it's not empty update them
         */
        if (isset($request['elements'])) {
            $order->elements()->delete();

            if (!empty($request['elements'])) {
                $newElements = [];

                foreach ($request->elements as $element) {
                    $elementModel = OrderElement::make($element);
                    $newElements[] = $elementModel;
                }

                $order->elements()->saveMany($newElements);
            }
        }

        if (isset($request['post_actions'])) {
            $order->postActions()->delete();
            $postActions = [];

            foreach ($request['post_actions'] as $actionType => $actionItem) {
                $postAction = PostAction::make(['type' => $actionType])->fill($actionItem);

                if (!empty($actionItem['body'])) {
                    $bodyModel = $postAction->body()->updateOrCreate([], $actionItem['body']);
                    $postAction->body()->associate($bodyModel);
                }

                $postActions[] = $postAction;
            }

            $order->postActions()->saveMany($postActions);
        }

        $order->package()->updateOrCreate([], $request['package'] ?? []);

        $order->delivery()->updateOrCreate([], $request['delivery'] ?? []);

        $order->update($request->toArray());

        return $this->returnPassport($order->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
