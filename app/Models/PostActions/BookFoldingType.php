<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;

class BookFoldingType extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'alias';
    protected $keyType = 'string';
}
