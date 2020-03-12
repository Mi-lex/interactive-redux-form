<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'name', 'type', 'important_info', 'completion_date', 'completion_time', 'is_cut', 'circulation', 'similar_order_id', 'is_similar_order', 'manager_id', 'customer_id',
    ];

    protected $casts = [
        'is_cut' => 'boolean',
        'is_similar_order' => 'boolean',
    ];
    
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
    public function elements(): HasMany
    {
        return $this->hasMany(OrderElement::class);
    }

    public function postActions(): HasMany
    {
        return $this->hasMany(PostAction::class);
    }

    public function paperJoiner(): HasOne
    {
        return $this->hasOne(PaperJoiner::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public function package(): HasOne
    {
        return $this->hasOne(Package::class);
    }

    public function delivery(): HasOne
    {
        return $this->hasOne(Delivery::class);
    }

    private function array_remove_null($item)
    {
        if (!is_array($item)) {
            return $item;
        }

        return collect($item)
            ->reject(function ($item) {
                return is_null($item);
            })
            ->flatMap(function ($item, $key) {

                return is_numeric($key)
                    ? [$this->array_remove_null($item)]
                    : [$key => $this->array_remove_null($item)];
            })
            ->toArray();
    }

    public function toArrayWithoutNulls()
    {
        return $this->array_remove_null(parent::toArray());
    }

    // rewrite parent method to get clean json
    public function jsonSerialize()
    {
        return $this->toArrayWithoutNulls();
    }
}
