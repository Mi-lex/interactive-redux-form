<?php

namespace App\Models;

use App\AbstractClasses\ModelWithTypes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentOperation extends ModelWithTypes
{
    protected $fillable = ['account_number', 'org_type_id', 'date'];
    public $timestamps = false;

    protected $typeMap = [
        'org_type' => 'payment_org_types'
    ];

    public function orgType(): BelongsTo
    {
        return $this->belongsTo(PaymentOrgType::class);
    }
}
