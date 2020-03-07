<?php

namespace App\Models;

use App\AbstractClasses\ModelWithType;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends ModelWithType
{
    protected $fillable = ['capacity', 'sort', 'sample', 'label', 'paletting', 'stretch_film', 'type_id'];
    public $timestamps = false;

    public function type(): BelongsTo
    {
        return $this->belongsTo(PackageType::class);
    }
}
