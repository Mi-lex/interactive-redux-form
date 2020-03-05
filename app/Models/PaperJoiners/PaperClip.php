<?php

namespace App\Models\PaperJoiners;

use App\AbstractClasses\ModelWithType;
use App\Models\PaperJoiner;

class PaperClip extends ModelWithType
{
    protected $guarded = [];
    public $timestamps = false;
    
    // public function paperJoiner()
    // {
    //     // $this->belongsTo(PaperJoiner::class);
    //     $this->morphOne(PaperJoner::class, 'paper_joiners', 'paper_joiners.type', 'paper_joiners.joinable_id');
    // }
}
