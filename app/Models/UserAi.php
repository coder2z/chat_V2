<?php
/**
 * Created by PhpStorm.
 * User: JiangWei
 * Date: 2019/9/4
 * Time: 15:57
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class UserAi extends Model
{
    protected $table = 'chat_user';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = ['id','name','status','password','type'];

}