<?php

namespace App\Models\PostActions;

use App\AbstractClasses\ModelWithTypes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Embossing extends ModelWithTypes
{
    protected $typeMap = [
        'foil_type' => 'foil_types'
    ];

    public function foil_type(): BelongsTo
    {
        return $this->belongsTo(FoilType::class);
    }
}
