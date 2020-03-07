<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $fillable = ['should_be_delivered', 'address'];
    public $timestamps = false;
}
