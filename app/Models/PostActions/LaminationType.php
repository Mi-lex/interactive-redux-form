<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;

class LaminationType extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'alias';
    protected $keyType = 'string';
    public $timestamps = false;
    public $fillable = ['name', 'alias'];
}
