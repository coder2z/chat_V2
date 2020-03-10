<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Captcha extends Model//验证码表
{
    protected $table = 'chat_captcha';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];

}
