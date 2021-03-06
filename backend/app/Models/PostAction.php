<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostAction extends Model
{
    protected $fillable = ['type', 'elements', 'additional', 'actionable_id'];
    public $timestamps = false;

    const CREASING = 'creasing';
    const BOOK_FOLDING = 'book_folding';
    const LAMINATION = 'lamination';
    const REVARNISHING = 'revarnishing';
    const EMBOSSING = 'embossing';
    const STAMP_CUT = 'stamp_cut';
    const PERFORATION = 'perforation';
    const HOT_STAMP = 'hot_stamp';

    const NAMES = [self::CREASING, self::BOOK_FOLDING, self::LAMINATION, self::REVARNISHING, self::EMBOSSING, self::STAMP_CUT, self::PERFORATION, self::HOT_STAMP];

    public function body()
    {
        return $this->morphTo('body', 'type', 'actionable_id');
    }

    public static function boot() {
        parent::boot();
        self::deleting(function($postAction) {
           $postAction->actionable_id = 666;
           $postAction->body()->delete();
        });
    }
}
