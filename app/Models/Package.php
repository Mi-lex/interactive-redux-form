<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends Model
{
    protected $fillable = ['capacity', 'sort', 'sample', 'label', 'paletting', 'stretch_film', 'type'];
    public $timestamps = false;

    public function typeModel(): BelongsTo
    {
        return $this->belongsTo(PackageType::class);
    }

    protected $casts = [
        'sort' => 'boolean',
        'sample' => 'boolean',
        'label' => 'boolean',
        'paletting' => 'boolean',
        'stretch_film' => 'boolean',
    ];
}
