<?php

namespace App\Models\PaperJoiners;

use App\AbstractClasses\TypeModel;

class PaperClipType Extends TypeModel
{
    public function paper_clip()
    {
        return $this->belongsTo(PaperClip::class);
    }
}
