<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class Veriy extends FormRequest
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
        return [];
    }

    public function messages(){
        return [
            '输入的数据不符合规则，请查验后重新输入！',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw(new HttpResponseException(response()->json(['message' => $validator->errors()->all()[0], 'code' => '100'])));
    }

}
