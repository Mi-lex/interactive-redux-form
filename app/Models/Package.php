<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\AbstractClasses\ModelWithType;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends ModelWithType 
{
    protected $guarded = [];
    public $timestamps = false;

    public function type(): BelongsTo
    {
        return $this->belongsTo(PackageType::class);
    }
}
