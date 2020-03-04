<?php

namespace App\Models\PaperJoiners;

use Illuminate\Database\Eloquent\Model;

class PaperClipType extends Model
{
    public function paper_clip()
    {
        return $this->belongsTo(PaperClip::class);
    }
}
