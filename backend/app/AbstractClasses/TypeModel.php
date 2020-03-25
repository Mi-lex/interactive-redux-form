<?php

namespace App\AbstractClasses;

use Illuminate\Database\Eloquent\Model;

abstract class TypeModel extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'alias';
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = ['alias', 'name'];
}
