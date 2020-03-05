<?php

namespace App\Http\Controllers;

use App\Http\Requests\PassportUpdateRequest;
use App\Models\Order;
use App\Models\OrderElement;
use App\Models\PaperJoiner;
use App\Models\PrintType;
use Illuminate\Http\Request;

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
        // return $order->customer;
        if (isset($request['customer'])) {
            $customerInfo = $request['customer'];

            if (!empty($order->customer)) {
                $order->customer->update($customerInfo);
            } else {
                $customer = $order->customer()->create($customerInfo);
                $order->customer()->associate($customer);
            }
            unset($request['customer']);
        }

        /**
         * if field exists in the request it can be empty
         * it means that paper_joiner was deleted
         * if it's not empty we still should delete it, coz it could be redefined
         */
        if (isset($request['paper_joiner'])) {
            $order->paperJoiner()->delete();

            if (!empty($request['paper_joiner'])) {
                $joinerType = $request['paper_joiner.name'];

                $joinerModel = $order->paperJoiner()->make(["type" => $joinerType]);
                $joinerModelBody = $joinerModel->body()->create();

                if (!empty($joinerBody = $request['paper_joiner.body'])) {
                    switch ($joinerType) {
                        case PaperJoiner::PAPER_CLIP:
                            $paperClipTypeName = $joinerBody['type'];

                            $joinerModelBody->associateTypeByName($paperClipTypeName);

                            unset($joinerBody['type']);

                            break;
                    }

                    $joinerModelBody->update($joinerBody);
                }

                $joinerModel->body()->associate($joinerModelBody);
                $joinerModel->save();
            }

            unset($request['paper_joiner']);
        }

        $order->elements()->delete();

        if (isset($request['elements'])) {
            $order->elements()->delete();

            if (!empty($request['elements'])) {
                $newElements = [];

                foreach ($request->elements as $element) {
                    $elementModel = OrderElement::make($element);
                    unset($elementModel->print_type);

                    $elementModel->print_type_id = PrintType::whereName($element['print_type'])->first()->id;
                    $newElements[] = $elementModel;
                }

                $order->elements()->saveMany($newElements);
            }

            unset($request['elements']);
        }

        $order->update(
            $request->toArray()
        );

        $order->save();

        // return response()->json(Order::with(['paperJoiner', 'paperJoiner.body'])->with('paperJoiner.body')->get());
        return response()->json([$order->with('paperJoiner', 'paperJoiner.body', 'customer')->get(), $request->toArray()]);
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
