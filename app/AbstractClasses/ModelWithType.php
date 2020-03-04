<?php

namespace App\AbstractClasses;

use Illuminate\Database\Eloquent\Model;

abstract class ModelWithType extends Model
{
    private $TypeClassName;

    public function __construct()
    {
        $this->TypeClassName = get_class($this) . 'Type';
    }

    protected function type()
    {
        return $this->belongsTo($this->TypeClassName);
    }

    public function associateTypeByName($typeName)
    {
        $typeModel = $this->TypeClassName::whereName($typeName)->first();
        $this->type()->associate($typeModel);
    }
}
