<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentOperation extends Model
{
    protected $fillable = ['account_number', 'org_type', 'date'];
    protected $dateFormat = 'd.m.y';

    public $timestamps = false;

    public function organization(): BelongsTo
    {
        return $this->belongsTo(PaymentOrgType::class, 'org_type');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }
}
