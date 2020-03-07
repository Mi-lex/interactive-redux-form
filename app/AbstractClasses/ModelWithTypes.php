<?php

namespace App\AbstractClasses;

use Error;
use Illuminate\Database\Eloquent\Model;

abstract class ModelWithTypes extends Model
{
    // i.e. [ 'print_type' => 'print_types', 'org_type' => 'payment_org_types, etc ]
    protected $typeMap = [];

    public function associateTypeByName(string $columnName = 'type', string $typeValue)
    {
        $typeId = \DB::table($this->typeMap[$columnName])->whereName($typeValue)->select('id')->first()->id;

        if ($typeId) {
            $typeIdName = $columnName . '_id';
            $this->$typeIdName = $typeId;
        } else {
            throw new Error("There is no such type name: \"$columnName\" in \"table $this->typeMap[$columnName]\"");
        }

        return $this;
    }

    public function fill(array $attributes)
    {
        foreach ($attributes as $key => $value) {
            if (array_key_exists($key, $this->typeMap)) {
                $this->associateTypeByName($key, $value);
            }
        }

        return parent::fill($attributes);
    }
}
