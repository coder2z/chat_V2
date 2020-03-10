<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RobotChatExtraModel extends Model
{
  protected $table = 'chat_robot_extra_qa';
  protected $primaryKey = 'id';
  public $timestamps = false;
  protected $fillable = ['id','question','answer'];
}
