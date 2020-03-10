<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderElement extends Model
{
    protected $fillable = ['name', 'stripes', 'material', 'print_type', 'brightness', 'color_interpretation', 'order_id'];
    public $timestamps = false;

    public function printType(): BelongsTo
    {
        return $this->belongsTo(PrintType::class, 'alias');
    }
}
