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
        return $this->hasMany('App\Models\OrderElement');
    }
}
