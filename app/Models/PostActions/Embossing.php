<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Embossing extends Model
{
    public function foilType(): BelongsTo
    {
        return $this->belongsTo(FoilType::class);
    }
}
