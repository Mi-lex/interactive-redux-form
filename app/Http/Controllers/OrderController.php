<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderElement;
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
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => ['string'],
            'type' => ['string'],
            'important_info' => ['string'],
            'completion_date' => ['date_format:d.m.y'],
            'completion_time' => ['date_format:H:i'],
            'is_cut' => ['boolean'],
            'circulation' => ['string'],
            "similar_order_id" => ['numeric'],

            'elements' => ['array'],
            'elements.*.name' => ['string', 'required'],
            'elements.*.stripes' => ['string', 'required'],
            'elements.*.material' => ['string', 'required'],
            'elements.*.print_type' => ['string', 'required', 'exists:print_types,name'],
            'elements.*.brightness' => ['string', 'required'],
            'elements.*.color_interpretation' => ['string', 'required'],
        ]);

        $order = Order::find($id);

        $order->elements()->delete();

        // Updating order elements
        if (isset($request['elements'])) {
            $newElements = [];

            foreach ($request->elements as $element) {
                $elementModel = OrderElement::make($element);
                unset($elementModel->print_type);

                $elementModel->print_type_id = PrintType::whereName($element['print_type'])->first()->id;
                $newElements[] = $elementModel;
            }

            unset($request['elements']);

            $order->elements()->saveMany($newElements);
        }

        $order->update(
            $request->toArray()
        );

        return response()->json([$order, $request->toArray()]);
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
