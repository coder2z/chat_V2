<?php

namespace App\Http\Requests;

use App\Http\Requests\Veriy;

class GetVeriy extends Veriy
{
    //
    public function rules()
    {
        return [
            'userId' => 'integer',
            'serviceId' => 'integer'
        ];
    }
}
