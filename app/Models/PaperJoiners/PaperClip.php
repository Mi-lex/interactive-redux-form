<?php

namespace App\Models\PaperJoiners;

use App\AbstractClasses\ModelWithTypes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaperClip extends ModelWithTypes
{
    protected $fillable = ['auto', 'manual', 'quantity', 'width', 'drift', 'type_id'];
    public $timestamps = false;

    protected $typeMap = [
        'type' => 'paper_clip_types'
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(PaperClipType::class); 
    }
}
