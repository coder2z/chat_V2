<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class GetQuestionDetailByQuestionIdRequest extends FormRequest
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
            'question_id'=>'required',
        ];
    }

    public function messages()
    {
        return [
            'question_id.required'=>'问题id不能为空!',
        ];
    }


    public function failedValidation(Validator $validator)
    {
       throw(new HttpResponseException(response()->fail( 100,'失败',$validator->errors()->all())));
    }


}
