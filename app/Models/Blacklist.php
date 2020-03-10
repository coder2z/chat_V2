<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blacklist extends Model//黑名单表
{
    protected $table = 'chat_blacklist';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];
}