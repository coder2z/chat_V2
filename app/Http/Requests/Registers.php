<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class Registers extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'cname' => 'required|min:1|max:10',
            'password' => 'required|min:6|max:20',
            'tel' => 'required|min:11|max:11|unique:chat_user,tel',
            'code' => 'required|min:6|max:6',
        ];
    }

    public function massages(){
        return [
            'cname.required' => '名字不能为空且不能太长',
            'password.required' => '密码必须是6~20位！',
            'tel.required' => '号码是11位！',
            'code.required' => '验证吗为5位！',
            'url.required' => 'url不能为空！'
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        $data = $validator->errors()->all();
        throw (new HttpResponseException(response()->json([
            'code'=>100,
            'msg' => '注册失败',
            'data'=> $data
        ],422)));
    }
}