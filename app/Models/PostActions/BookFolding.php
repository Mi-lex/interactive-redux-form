<?php

namespace App\Models\PostActions;

use App\AbstractClasses\ModelWithTypes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookFolding extends ModelWithTypes
{
    protected $fillable = ['color', 'type_id'];
    public $timestamps = false;

    protected $typeMap = [
        'type' => 'book_foldint_types'
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(BookFoldingType::class);
    }
}
