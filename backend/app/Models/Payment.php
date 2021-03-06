<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['payed_by_cash', 'order_id'];
    public $timestamps = false;

    public function operation()
    {
        return $this->hasOne(PaymentOperation::class);    
    } 

    protected $casts = [
        'payed_by_cash' => 'boolean',
    ];
}
