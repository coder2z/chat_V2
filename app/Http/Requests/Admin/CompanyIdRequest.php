<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CompanyIdRequest extends FormRequest
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
            'company_id' => [
                'required', 'integer',
                function ($attribute, $value, $fail) {
                    $result = User::where('id', $value)->first();
                    if ($result == false) {
                        return $fail('抱歉,没有该公司id');
                    } else if ($result->type != 'company') {
                        return $fail('抱歉,该id的\'type\'字段不是\'company\',请查证后输入准确的公司id');
                    } 
                    // elseif ($result->status == 2) {
                    //     return $fail('抱歉,公司已被软删除');
                    // }
                }
            ]
        ];
    }
    public function messages()
    {
        return [
            'company_id.required' => '公司id不能为空',
            'company_id.integer' => '公司id必须为整数'
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
