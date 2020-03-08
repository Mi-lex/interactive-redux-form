<?php

namespace App\Models\PostActions;

use App\AbstractClasses\ModelWithTypes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revanishing extends ModelWithTypes
{
    protected $fillable = ['varnish_type'];

    protected $typeMap = [
        'varnish_type' => 'varnish_types'
    ];

    public function varnish_type(): BelongsTo
    {
        return $this->belongsTo(VarnishType::class);
    }
}
