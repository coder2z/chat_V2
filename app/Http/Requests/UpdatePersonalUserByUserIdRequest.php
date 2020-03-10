<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePersonalUserByUserIdRequest extends FormRequest
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
            'person_id'=>'required',
            'person_state'=>'required|in:0,1,2'
        ];
    }
    public function messages()
    {
        return [
            'person_id.required'=>'用户id不能为空',
            'person_state.required'=>'状态码不能为空',
            'person_state.in'=>'状态码只能为0或1'
        ];
    }

   protected function failedValidation(Validator $validator)
   {
       throw (new HttpResponseException(response()->fail(100,'失败！',$validator->errors()->all())));
   }
}
