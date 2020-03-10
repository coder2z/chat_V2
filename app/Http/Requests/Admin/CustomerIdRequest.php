<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CustomerIdRequest extends FormRequest
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
            'state' => 'integer|required|max:2|min:0',
            'customer_id' => [
                'required', 'integer',
                function ($attribute, $value, $fail) {
                    $result = User::where('id', $value)->first();
                    // dd($result);
                    if ($result == false) {
                        return $fail('抱歉,没有该客服id');
                    } else if (!is_numeric($result->type)) {
                        return $fail('抱歉,该id的\'type\'字段不正确,请查证后输入准确的客服id');
                    }
                }
            ]
        ];
    }
    public function messages()
    {
        return [
            'customer_id.required' => '客服id不能为空',
            'customer_id.integer' => '客服id必须为整数'
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
