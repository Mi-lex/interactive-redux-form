<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['name'];
    public $timestamps = false;

    public function orders()
    {
        $this->hasMany(Order::class);
    }
}
