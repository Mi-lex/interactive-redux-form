<?php

namespace App\Models\PostActions;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revarnishing extends Model
{
    public $timestamps = false;
    protected $fillable = ['varnish_type'];

    public function varnish_type(): BelongsTo
    {
        return $this->belongsTo(VarnishType::class);
    }
}
