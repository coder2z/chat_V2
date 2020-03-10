<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class SetUp extends Model//系统编制表
{
    protected $table = 'chat_set_up';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];
    protected $fillable=['id','message_api','ws_url']; 
}
