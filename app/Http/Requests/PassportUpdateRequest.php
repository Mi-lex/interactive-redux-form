<?php

namespace App\Http\Requests;

use App\Models\PaperJoiner;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PassportUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $paperJoinerNames = PaperJoiner::NAMES;

        return [
            'name' => ['string'],
            'type' => ['string'],
            'important_info' => ['string'],
            'completion_date' => ['date_format:d.m.y'],
            'completion_time' => ['date_format:H:i'],
            // implementation
            'is_cut' => ['boolean'],
            'circulation' => ['string'],
            "similar_order_id" => ['numeric'],
            // customer
            'customer.name' => ['string'],
            // payment
            'payment.payed_by_cash' => ['boolean'],
            'payment.operation' => ['array'],
            'payment.operation.org_type' => ['string', 'exists:payment_org_types,name', 'required_with:payment.operation'],
            'payment.operation.account_number' => ['numeric', 'required_with:payment.operation'],
            'payment.operation.date' => ['date_format:d.m.y', 'required_with:payment.operation'],
            // package
            'package' => ['array'],
            'package.capacity' => ['numeric'],
            'package.type' => ['string', 'exists:package_types,name'],
            'package.sample' => ['boolean'],
            'package.sort' => ['boolean'],
            'package.label' => ['boolean'],
            'package.paletting' => ['boolean'],
            'package.stretch_film' => ['boolean'],
            // delivery
            'delivery' => ['array'],
            'delivery.should_be_delivered' => ['boolean'],
            'delivery.address' => ['string'],
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
            /*
             * if it's paper_clip this line means that type name should exists in papre_clip_types table
             * if it's glue_bonding it's gonna check glue_bonding_types table etc
             */
            'paper_joiner.body' => ['array'],
            //  * type === 'paper_clip'
            'paper_joiner.body.auto' => ['boolean'],
            'paper_joiner.body.manual' => ['boolean'],
            'paper_joiner.body.width' => ['numeric'],
            'paper_joiner.body.drift' => ['numeric'],
            // * type === 'termo'
            'paper_joiner.body.spine_width' => ['numeric'],
            'paper_joiner.body.flaps_cover' => ['boolean'],
            'paper_joiner.body.flush_with_block' => ['boolean'],
            'paper_joiner.body.braces' => ['boolean'],
            // * type === 'spring'
            'paper_joiner.body.color' => ['string'],
            'paper_joiner.body.position' => ['string'],
            'paper_joiner.body.cover_block_difference' => ['string'],
            // * type === 'packet'
            'paper_joiner.body.grommet_color' => ['string'],
            'paper_joiner.body.hands_color' => ['string'],
            // * type === 'glue_bonding'
            'paper_joiner.body.special' => ['string'],

            // post actions
            'post_actions' => ['array'],
            'post_actions.*.elements' => ['string'],
            'post_actions.*.additional' => ['string'],

            'post_actions.creasing.body.parts' => ['string'],
            'post_actions.book_folding.body.type' => ['string', 'exists:book_folding_types,name'],
            'post_actions.book_folding.body.color' => ['string'],
            'post_actions.lamination.body.type' => ['string', 'exists:lamination_types,name'],
            'post_actions.revanishing.body.varnish_type' => ['string', 'exists:varnish_types,name'],
            'post_action.embossing.body.foil_type' => ['string', 'exists:foil_types,name'],
            'post_action.stamp_cut.body.name' => ['string'],
            'post_action.perforation.body.name' => ['string'],
        ];
    }
}
