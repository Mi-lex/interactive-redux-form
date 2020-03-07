<?php

namespace App\Models;

use App\AbstractClasses\ModelWithTypes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends ModelWithTypes
{
    protected $fillable = ['capacity', 'sort', 'sample', 'label', 'paletting', 'stretch_film', 'type_id'];
    public $timestamps = false;

    protected $typeMap = [
        'type' => 'package_types'
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(PackageType::class);
    }
}
