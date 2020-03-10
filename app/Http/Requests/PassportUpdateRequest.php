<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'payment.operation.org_type' => ['string', 'exists:payment_org_types,alias', 'required_with:payment.operation'],
            'payment.operation.account_number' => ['numeric', 'required_with:payment.operation'],
            'payment.operation.date' => ['date_format:d.m.y', 'required_with:payment.operation'],
            // package
            'package' => ['array'],
            'package.capacity' => ['numeric'],
            'package.type' => ['string', 'exists:package_types,alias'],
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
            'elements.*.name' => ['string', 'required_with:elements'],
            'elements.*.stripes' => ['string', 'required_with:elements'],
            'elements.*.material' => ['string', 'required_with:elements'],
            'elements.*.print_type' => ['string', 'required_with:elements', 'exists:print_types,alias'],
            'elements.*.brightness' => ['string', 'required_with:elements'],
            'elements.*.color_interpretation' => ['string', 'required_with:elements'],
            // paper joiner
            'paper_joiner' => ['array'],
            /*
             * if it's paper_clip this line means that type name should exists in paper_clip_types table
             * if it's glue_bonding it's gonna check glue_bonding_types table etc
             */
            // 'paper_joiner.*' => ['array'],
            //  * type === 'paper_clip'
            'paper_joiner.paper_clip.type' => ['string', 'exists:paper_clip_types,alias'],
            'paper_joiner.paper_clip.auto' => ['boolean'],
            'paper_joiner.paper_clip.quantity' => ['numeric'],
            'paper_joiner.paper_clip.manual' => ['boolean'],
            'paper_joiner.paper_clip.width' => ['numeric'],
            'paper_joiner.paper_clip.drift' => ['numeric'],
            // * type === 'termo'
            'paper_joiner.termo.spine_width' => ['numeric'],
            'paper_joiner.termo.flaps_cover' => ['boolean'],
            'paper_joiner.termo.flush_with_block' => ['boolean'],
            'paper_joiner.termo.braces' => ['boolean'],
            // * type === 'spring'
            'paper_joiner.spring.color' => ['string'],
            'paper_joiner.spring.position' => ['string'],
            'paper_joiner.spring.cover_block_difference' => ['numeric'],
            // * type === 'packet'
            'paper_joiner.packet.grommet_color' => ['string'],
            'paper_joiner.packet.hands_color' => ['string'],
            // * type === 'glue_bonding'
            'paper_joiner.glue_bonding.type' => ['string'],
            'paper_joiner.glue_bonding.position' => ['string'],
            // * type === 'special'
            'paper_joiner.special.description' => ['string'],

            // post actions
            'post_actions' => ['array'],
            'post_actions.*.elements' => ['string'],
            'post_actions.*.additional' => ['string'],

            'post_actions.creasing.body.parts' => ['string'],
            'post_actions.book_folding.body.type' => ['string', 'exists:book_folding_types,alias'],
            'post_actions.book_folding.body.color' => ['string'],
            'post_actions.lamination.body.type' => ['string', 'exists:lamination_types,alias'],
            'post_actions.revanishing.body.varnish_type' => ['string', 'exists:varnish_types,alias'],
            'post_action.embossing.body.foil_type' => ['string', 'exists:foil_types,alias'],
            'post_action.stamp_cut.body.name' => ['string'],
            'post_action.perforation.body.name' => ['string'],
        ];
    }
}
