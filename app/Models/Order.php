<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    // protected $guarded = [];
    protected $fillable = [
        'name', 'type', 'importaint_info', 'completion_date', 'completion_time', 'is_cut', 'circulation', 'similar_order_id', 'manager_id', 'customer_id',
    ];

    protected $casts = [
        'is_cut' => 'booleadn',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
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
}
