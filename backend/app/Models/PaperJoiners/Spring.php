<?php

namespace App\Models\PaperJoiners;

use Illuminate\Database\Eloquent\Model;

class Spring extends Model
{
    protected $fillable= ['color', 'position', 'cover_block_difference'];
    public $timestamps = false;
}
