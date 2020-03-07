<?php

namespace App\Http\Controllers;

use App\Http\Requests\PassportUpdateRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderElement;
use App\Models\PaymentOrgType;
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

        if (isset($request['customer'])) {
            $customerInfo = $request['customer'];

            if (isset($customerInfo['name'])) {
                $customer = Customer::firstOrCreate(["name" => $request['customer.name']]);
                $order->customer()->associate($customer);
            }
        }

        if (isset($request['payment'])) {
            $operation = isset($request['payment.operation']) ? $request['payment.operation'] : null;

            $order->payment()->updateOrCreate([], $request['payment']);
            if ($operation) {
                $operationModel = $order->payment->operation()->make([
                    'date' => $operation['date'],
                    'account_number' => $operation['account_number'],
                ]);
                $operationModel->org_type()->associate(PaymentOrgType::whereName($operation['org_type'])->first());

                $operationModel->save();
            }
        }

        if (isset($request['package'])) {
            $packageInfo = $request['package'];
            $package = $order->package;

            if (!empty($package)) {
                $package->update($packageInfo);
            } else {
                $package = $order->package()->make()->fill($packageInfo);
            }

            $package->save();
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
                    $joinerModelBody->update($joinerBody);
                }

                $joinerModel->body()->associate($joinerModelBody);
                $joinerModel->save();
            }
        }

        $order->elements()->delete();

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

        $order->update(
            $request->toArray()
        );

        $order->save();

        return response()->json([$order->with('paperJoiner', 'paperJoiner.body', 'customer', 'payment', 'payment.operation', 'package', 'package.type')->get(), $request->toArray()]);
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
