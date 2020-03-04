<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_cut' => 'booleadn',
    ];

    public function elements()
    {
        return $this->hasMany(OrderElement::class);
    }

    public function postActions()
    {
        return $this->hasMany(PostAction::class);
    }

    public function paperJoiner()
    {
        return $this->hasOne(PaperJoiner::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function package()
    {
        return $this->hasOne(Package::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
