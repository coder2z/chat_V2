<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PictureRequest extends FormRequest
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
            'picture'=>'required|image|max:10240',
        ];
    }

    public function messages()
    {
       return [
           'picture.image'=>'不是正确的图片格式，请重试!',
           'picture.required'=>'对不起，没有文件，请重试！',
           'picture.max'=>'图片大于10M，请重试！',
       ];
    }

    public function failedValidation(Validator $validator)
    {
        throw(new HttpResponseException(response()->fail(
           100,'失败',$validator->errors()->all()
        )));
    }

}
