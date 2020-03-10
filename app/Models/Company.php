<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model//企业表
{
    protected $table = 'chat_company';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];

}
