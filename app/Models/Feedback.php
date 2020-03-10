<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model//意见反馈表
{
    protected $table = 'chat_feedback';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];

}
