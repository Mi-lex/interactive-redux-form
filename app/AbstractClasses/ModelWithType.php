<?php

namespace App\AbstractClasses;

use Illuminate\Database\Eloquent\Model;

abstract class ModelWithType extends Model
{
    private string $TypeClassName;

    public function __construct()
    {
        $this->TypeClassName = get_class($this) . 'Type';
    }

    public function type()
    {
        return $this->belongsTo($this->TypeClassName);
    }

    public function associateTypeByName(string $typeName, ?string $typeTable = null)
    {
        if ($typeTable) {
            $typeModel = \DB::table($typeTable)->whereName($typeName)->first();
        } else {
            $typeModel = $this->TypeClassName::whereName($typeName)->first();
        }

        return $this->type()->associate($typeModel);
    }

    // update method uses fill method
    public function fill(array $attributes)
    {
        $typeName = isset($attributes['type']) ? $attributes['type'] : null;
        unset($attributes['type']);

        parent::fill($attributes);

        if ($typeName) {
            $this->associateTypeByName($typeName);
        }

        return $this;
    }
}
