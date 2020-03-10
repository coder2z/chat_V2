<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddPersonalUserRequest extends FormRequest
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
            'person_name'=>'required',
            'person_state'=>'required|in:0,1',
            'person_phone'=>'required|size:11|unique:chat_user,tel',
            'person_password'=>'required|min:6'
        ];
    }
    public function messages()
    {
        return [
            'person_name.required'=>'名字不能为空',
            'person_state.required'=>'状态码不能为空',
            'person_state.in'=>'状态码只能为0或1',
            'person_phone.required'=>'电话号码不能为空',
            'person_phone.size'=>'电话号码错误,请检查格式',
            'person_phone.unique'=>'电话号码已被注册,请重新输入',
            'person_password'=>'密码不能为空',
            'person_password.alpha_dash'=>'密码必须为数字和字母的组合',
            'person_password.min'=>'密码长度不能小于6位'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw (new HttpResponseException(response()->fail(100,'失败！',$validator->errors()->all())));
    }
}
