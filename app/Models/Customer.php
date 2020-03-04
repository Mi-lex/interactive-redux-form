<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['name', 'contact_id'];
    public $timestamps = false;

    public function orders()
    {
        $this->hasMany(Order::class);
    }
}
