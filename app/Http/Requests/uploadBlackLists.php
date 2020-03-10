<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class uploadBlackLists extends FormRequest
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
            'personId' => 'required',
            'imgUrl' => 'required',
            'content' => 'required',
            'serviceId' => 'required'
        ];
    }

    public function massages(){
        return [
            'password.required' => '用户id不能为空!',
            'imgUrl.required' => '图片地址不能为空!',
            'content.required' => '凭证不能为空!',
            'serviceId.required' => '客服id不能为空!'

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