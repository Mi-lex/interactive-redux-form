<?php

namespace App\Models\PaperJoiners;

use Illuminate\Database\Eloquent\Model;

class GlueBonding extends Model
{
    protected $fillable = ['type', 'position'];
    public $timestamps = false;
}
