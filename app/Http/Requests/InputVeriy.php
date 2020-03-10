<?php

namespace App\Http\Requests;

use App\Http\Requests\Veriy;

class InputVeriy extends Veriy
{
    //
    public function rules()
    {
        return [
            'content' => 'required|string',
            'userId' => 'integer',
            'serviceId' => 'integer',
            'transfer' => 'integer'
        ];
    }
}
