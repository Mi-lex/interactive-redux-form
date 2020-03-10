<?php

namespace App\Models\PaperJoiners;

use Illuminate\Database\Eloquent\Model;

class PaperClipType extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'alias';
    protected $keyType = 'string';
    public $timestamps = false;

    public $fillable = ['name', 'alias'];

    public function paper_clip()
    {
        return $this->belongsTo(PaperClip::class);
    }
}
