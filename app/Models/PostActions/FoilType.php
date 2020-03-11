<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;

class FoilType extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'alias';
    protected $keyType = 'string';
    public $fillable = ['name', 'alias'];
    public $timestamps = false;
}
