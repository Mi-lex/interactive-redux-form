<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ExistInTypeTable implements Rule
{
    private $tableName;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($tableName)
    {
        $this->tableName = $tableName;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return \DB::table($this->tableName . '_types')->whereName($value)->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "Данный тип не был найдет в $this->tableName";
    }
}
