<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaperJoiner extends Model
{
    const PAPER_CLIP = 'paper_clip';
    const TERMO = 'termo';
    const SPRING = 'spring';
    const PACKET = 'packet';
    const GLUE_BONDING = 'glue_bonding';
    const BINDING = 'binding';
    const PAPER_FILE = 'paper_file';
    const SPECIAL = 'special';

    const NAMES = [self::TERMO, self::SPECIAL, self::PAPER_CLIP,  self::SPRING, self::PACKET, self::GLUE_BONDING, self::BINDING, self::PAPER_FILE];

    protected $fillable = ['type', 'order_id', 'joinable_id'];
    public $timestamps = false;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function body()
    {
        return $this->morphTo('body', 'type', 'joinable_id');
    }

    public static function boot()
    {
        parent::boot();
        self::deleting(function ($joiner) {
            $joiner->joinable_id = 666;
            $joiner->body()->delete();
        });
    }
}
