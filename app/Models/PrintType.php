<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrintType extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'alias';
    protected $keyType = 'string';
    protected $fillabe = ['alias', 'name'];
    public $timestamps = false;
}
