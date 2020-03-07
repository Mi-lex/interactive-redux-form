<?php

namespace App\Http\Controllers;

use App\Http\Requests\PassportUpdateRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderElement;
use App\Models\PaperJoiner;
use App\Models\PrintType;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function store()
    {
        $newOrder = Order::create();

        return $newOrder;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return $order;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PassportUpdateRequest $request, $id)
    {
        $order = Order::find($id);

        if (isset($request['customer'])) {
            $customer = Customer::firstOrCreate(["name" => $request['customer.name']]);
            $order->customer()->associate($customer);
        }

        $order->payment()->updateOrCreate([], $request['payment'] ?? []);

        if (isset($request['payment.operation'])) {
            $order->payment->operation()->updateOrCreate([], $request['payment.operation']);
        }

        /*
         * if field exists in the request it can be empty
         * it means that paper_joiner was deleted
         * if it's not empty we still should delete it, coz it could be redefined
         */
        if (isset($request['paper_joiner'])) {
            $order->paperJoiner()->delete();

            if (!empty($request['paper_joiner'])) {
                $joinerType = $request['paper_joiner.name'];

                $joinerModel = $order->paperJoiner()->make(["type" => $joinerType]);
                $joinerModelBody = $joinerModel->body()->updateOrCreate([], $request['paper_joiner.body'] ?? []);

                $joinerModel->body()->associate($joinerModelBody);
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

                    $elementModel->print_type_id = PrintType::whereName($element['print_type'])->first()->id;
                    $newElements[] = $elementModel;
                }

                $order->elements()->saveMany($newElements);
            }
        }

        $order->package()->updateOrCreate([], $request['package'] ?? []);

        $order->delivery()->updateOrCreate([], $request['delivery'] ?? []);

        $order->update($request->toArray());

        return Order::with('paperJoiner', 'paperJoiner.body', 'customer', 'payment', 'payment.operation', 'package', 'package.type', 'delivery', 'elements', 'elements.printType')->find($order);
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
