<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;

class StampCut extends Model
{
    public $timestamps = false;
    protected $fillable = ['name'];
}
