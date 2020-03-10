<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentOperation extends Model
{
    protected $fillable = ['account_number', 'org_type', 'date'];
    public $timestamps = false;

    public function orgType(): BelongsTo
    {
        return $this->belongsTo(PaymentOrgType::class);
    }
}
