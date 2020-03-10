<?php
/**
 * Created by PhpStorm.
 * User: JiangWei
 * Date: 2019/9/5
 * Time: 13:59
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class ChatCommunication extends Model
{
    protected $table = 'chat_communication';

    protected $primaryKey = 'id';

    public $timestamps = true;

    protected $fillable = ['id','fromid','fromname','toid','toname','content','time','isread','type'];


}