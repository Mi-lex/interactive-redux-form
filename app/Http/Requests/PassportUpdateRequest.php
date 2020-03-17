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
        //
        // si
        /**
         * I would probably recommend to make almost every input values nullable
         * since user can just delete random input and update it
         * and they are supposed to be nullables according to requirements
         */
        return [
            'name' => ['nullable','string'],
            'type' => ['nullable','string'],
            'important_info' => ['nullable', 'string'],
            'completion_date' => ['nullable', 'date'],
            'completion_time' => ['nullable', 'date'],
            'is_similar_order' => ['boolean'],
            'similar_order_id' => ['nullable', 'numeric'],
            // implementation
            'is_cut' => ['boolean'],
            'circulation' => ['nullable', 'string'],
            "similar_order_id" => ['nullable','numeric'],
            // customer
            'customer.name' => ['nullable', 'string'],
            // payment
            'payment.payed_by_cash' => ['boolean'],
            'payment.operation' => ['array'],
            'payment.operation.org_type' => ['string', 'exists:payment_org_types,alias'],
            'payment.operation.account_number' => ['numeric'],
            'payment.operation.date' => ['date'],
            // package
            'package' => ['array'],
            'package.capacity' => ['nullable','numeric'],
            'package.type' => ['string', 'exists:package_types,alias'],
            'package.sample' => ['boolean'],
            'package.sort' => ['boolean'],
            'package.label' => ['boolean'],
            'package.paletting' => ['boolean'],
            'package.stretch_film' => ['boolean'],
            // delivery
            'delivery' => ['array'],
            'delivery.should_be_delivered' => ['boolean'],
            'delivery.address' => ['nullable', 'string'],
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
            'paper_joiner.paper_clip.quantity' => ['nullable','numeric'],
            'paper_joiner.paper_clip.manual' => ['boolean'],
            'paper_joiner.paper_clip.width' => ['nullable', 'numeric'],
            'paper_joiner.paper_clip.drift' => ['nullable', 'numeric'],
            // * type === 'termo'
            'paper_joiner.termo.spine_width' => ['nullable','numeric'],
            'paper_joiner.termo.flaps_cover' => ['boolean'],
            'paper_joiner.termo.flush_with_block' => ['boolean'],
            'paper_joiner.termo.braces' => ['boolean'],
            // * type === 'spring'
            'paper_joiner.spring.color' => ['nullable','string'],
            'paper_joiner.spring.position' => ['string'],
            'paper_joiner.spring.cover_block_difference' => ['nullable','numeric'],
            // * type === 'packet'
            'paper_joiner.packet.grommet_color' => ['nullable','string'],
            'paper_joiner.packet.hands_color' => ['nullable','string'],
            // * type === 'glue_bonding'
            'paper_joiner.glue_bonding.type' => ['string'],
            'paper_joiner.glue_bonding.position' => ['string'],
            // * type === 'special'
            'paper_joiner.special.description' => ['string'],

            // post actions
            'post_actions' => ['array'],
            'post_actions.*.elements' => ['nullable','string'],
            'post_actions.*.additional' => ['nullable','string'],

            'post_actions.creasing.body.parts' => ['nullable','string'],
            'post_actions.book_folding.body.type' => ['string', 'exists:book_folding_types,alias'],
            'post_actions.book_folding.body.color' => ['string'],
            'post_actions.lamination.body.type' => ['string', 'exists:lamination_types,alias'],
            'post_actions.revarnishing.body.varnish_type' => ['string', 'exists:varnish_types,alias'],
            'post_action.embossing.body.foil_type' => ['string', 'exists:foil_types,alias'],
            'post_action.stamp_cut.body.name' => ['string'],
        ];
    }
}
