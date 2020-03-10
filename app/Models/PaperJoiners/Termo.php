<?php

namespace App\Models\PaperJoiners;

use Illuminate\Database\Eloquent\Model;

class Termo extends Model
{
    protected $fillable = ['spine_width', 'flaps_cover', 'flush_with_block', 'braces'];
    public $timestamps = false;
}
