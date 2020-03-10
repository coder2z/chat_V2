<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class RobotExtraQa extends Model//问答材料表
{
    protected $table = 'chat_robot_extra_qa';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];

}
