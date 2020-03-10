<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdminCompanyOperateRequest extends FormRequest
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
            'company_name' => 'required|string|between:1,255|unique:chat_user,cname',
            'password' => 'required|string|between:1,255',
            'company_phone' => 'required|string|size:11|unique:chat_user,tel'
        ];
    }
    public function messages()
    {
        return [
            'company_name.required' => '公司名不能为空',
            'company_name.string' => '公司名仅支持字符串',
            'company_name.between' => '公司名长度介于1-255之间',
            'company_name.cname' => '公司名唯一',
            'company_name.unique' => '公司名已经存在',

            'password.required' => '密码不能为空',
            'password.string' => '密码仅支持字符串',
            'password.between' => '密码长度介于1-255之间',

            'company_phone.required' => '电话不能为空',
            'company_phone.string' => '电话仅支持字符串',
            'company_phone.size' => '电话长度为11位',
            'company_phone.unique' => '电话重复'
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw (new HttpResponseException(response()->json([
            'code' => 100,
            'msg' => '失败',
            'data' => $validator->errors()->all()
        ], 422)));
    }
}
