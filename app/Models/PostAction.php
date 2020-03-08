<?php

namespace App\Models;

use App\Models\PostActions\BookFolding;
use App\Models\PostActions\Creasing;
use Illuminate\Database\Eloquent\Model;

class PostAction extends Model
{
    protected $fillable = ['type', 'elements', 'additional'];
    public $timestamps = false;

    const CREASING = 'creasing';
    const BOOK_FOLDING = 'book_folding';
    const LAMITATION = 'lamitation';
    const REVANISHING = 'revanishing';
    const EMBOSSING = 'embossing';
    const STAMP_CUT = 'stamp_cut';
    const PERFORATION = 'perforation';
    const HOT_STAMP = 'hot_stamp';

    const NAMES = [self::CREASING, self::BOOK_FOLDING, self::LAMITATION, self::REVANISHING, self::EMBOSSING, self::STAMP_CUT, self::PERFORATION, self::HOT_STAMP];

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
