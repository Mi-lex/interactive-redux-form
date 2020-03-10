<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookFolding extends Model
{
    protected $fillable = ['color', 'type'];
    public $timestamps = false;

    public function type(): BelongsTo
    {
        return $this->belongsTo(BookFoldingType::class);
    }
}
