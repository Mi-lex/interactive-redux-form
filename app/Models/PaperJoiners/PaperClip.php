<?php

namespace App\Models\PaperJoiners;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaperClip extends Model
{
    protected $fillable = ['auto', 'manual', 'quantity', 'width', 'drift', 'type'];
    public $timestamps = false;

    public function type(): BelongsTo
    {
        return $this->belongsTo(PaperClipType::class); 
    }

    protected $casts = [
        'auto' => 'boolean', 
        'manual' => 'boolean'
    ];
}
