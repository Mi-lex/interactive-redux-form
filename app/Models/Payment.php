<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['payed_by_cash', 'payment_date', 'account_id'];
}
