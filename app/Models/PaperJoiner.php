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
    const FILE = 'file';
    const SPECIAL = 'special';

    const NAMES = [self::PAPER_CLIP, self::TERMO, self::SPRING, self::PACKET, self::GLUE_BONDING, self::BINDING, self::FILE, self::SPECIAL];

    protected $guarded = [];
    public $timestamps = false;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function body()
    {
        $camelCasedTypeName = str_replace('_', '', ucwords($this->type, '_'));

        $model = 'App\Models\PaperJoiners\\' . $camelCasedTypeName; 

        return $this->hasOne($model);
    }
}
