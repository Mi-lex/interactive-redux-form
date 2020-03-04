<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PaperJoiner;
use App\Rules\ExistInTypeTable;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
        $paperJoinerNames = PaperJoiner::NAMES;

        $request->validate([
            'name' => ['string'],
            'type' => ['string'],
            'important_info' => ['string'],
            'completion_date' => ['date_format:d.m.y'],
            'completion_time' => ['date_format:H:i'],
            // implementation
            'is_cut' => ['boolean'],
            'circulation' => ['string'],
            "similar_order_id" => ['numeric'],
            // elements
            'elements' => ['array'],
            'elements.*.name' => ['string', 'required'],
            'elements.*.stripes' => ['string', 'required'],
            'elements.*.material' => ['string', 'required'],
            'elements.*.print_type' => ['string', 'required', 'exists:print_types,name'],
            'elements.*.brightness' => ['string', 'required'],
            'elements.*.color_interpretation' => ['string', 'required'],
            // paper joiner
            'paper_joiner' => ['array'],
            'paper_joiner.name' => ['string', 'required', Rule::in($paperJoinerNames)],
            'paper_joiner.body' => ['array', ''],
            //  * type === 'paper_clip'
            'paper_joiner.body.auto' => ['boolean'],
            'paper_joiner.body.manual' => ['boolean'],
            'paper_joiner.body.type' => ['string', new ExistInTypeTable($request['paper_joiner.name'])],
            'paper_joiner.body.width' => ['numeric'],
            'paper_joiner.body.drift' => ['numeric'],
            // * type === 'termo'

        ]);

        $order = Order::find($id);
        // deleting joiner
        $order->paperJoiner()->delete();

        if (!empty($request['paper_joiner'])) {
            $joinerType = $request['paper_joiner.name'];

            $joinerModel = $order->paperJoiner()->create(["type" => $joinerType]);

            if (!empty($joinerBody = $request['paper_joiner.body'])) {
                $joinerBodyModel = $joinerModel->body()->make();

                switch ($joinerModel->type) {
                    case PaperJoiner::PAPER_CLIP:
                        $paperClipTypeName = $joinerBody['type'];

                        $joinerBodyModel->associateTypeByName($paperClipTypeName);

                        unset($joinerBody['type']);

                        break;
                    case PaperJoiner::GLUE_BONDING:
                    case PaperJoiner::SPRING:
                }

                $joinerBodyModel->fill($joinerBody);
                $joinerBodyModel->save();
            }

            unset($request['paper_joiner']);
        }

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

        $order->save();

        // return response()->json(Order::with(['paperJoiner', 'paperJoiner.body'])->with('paperJoiner.body')->get());
        return response()->json([$order->with('paperJoiner', 'paperJoiner.body')->get(), $request->toArray()]);
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
