<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lamination extends Model
{
    protected $fillable = ['type_id'];

    public function type(): BelongsTo
    {
        return $this->belongsTo(LaminationType::class);
    }
}
