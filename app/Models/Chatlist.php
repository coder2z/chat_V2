<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chatlist extends Model
{
    protected $table = 'chatlist';

    protected $primaryKey = 'chatID';

    public $timestamps = false;

    protected $fillable = ['chatID','chatTime','chatContent','userID','serID','chatStatus','chatTransfer'];

}
