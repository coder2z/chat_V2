<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Communication extends Model//聊天记录表
{
    protected $table = 'chat_Communication';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];

}
