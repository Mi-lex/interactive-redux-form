<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentOperation extends Model
{
    protected $fillable = ['account_number', 'org_type_id', 'date'];
    public $timestamps = false;

    public function org_type()
    {
        return $this->belongsTo(PaymentOrgType::class); 
    }
}
