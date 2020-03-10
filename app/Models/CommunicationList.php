<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommunicationList extends Model
{
    protected $table = 'chat_Communication_list';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded=[];
}
