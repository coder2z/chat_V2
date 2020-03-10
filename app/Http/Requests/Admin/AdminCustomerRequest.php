<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdminCustomerRequest extends FormRequest
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
            'customer_name' => 'required|string|between:1,255|unique:chat_user,cname',
            'customer_phone' => 'required|string|size:11|unique:chat_user,tel',
            'customer_company_id' => [
                'required', 'string', 'between:1,11',
                function ($attribute, $value, $fail) {
                    $result = User::where('id', $value)->first();
                    if ($result == false) {
                        return $fail('抱歉,没有该公司id');
                    } 
                    // else if ($result->status == 1) {
                    //     return $fail('抱歉,公司已被软删除');
                    // }
                }
            ],
            'customer_password' => 'required|string|between:1,255',
        ];
    }

    public function messages()
    {
        return [
            'customer_name.required' => '客户姓名不能为空',
            'customer_name.string' => '客户姓名仅支持字符串',
            'customer_name.between' => '客户姓名长度介于1-255之间',
            'customer_name.cname' => '客户姓名唯一',
            'customer_name.unique' => '客户姓名已经存在',

            'customer_password.required' => '密码不能为空',
            'customer_password.string' => '密码仅支持字符串',
            'customer_password.between' => '密码长度介于1-255之间',

            'customerm_company_id.required' => '客户所属公司id不能为空',
            'customerm_company_id.string' => '客户所属公司id仅支持字符串',
            'customerm_company_id.between' => '客户所属公司id长度介于1-11之间',

            'customer_phone.required' => '电话不能为空',
            'customer_phone.string' => '电话仅支持字符串',
            'customer_phone.size' => '电话长度为11位',
            'customer_phone.unique' => '电话重复',
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
