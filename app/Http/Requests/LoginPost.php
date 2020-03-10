<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class LoginPost extends FormRequest
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
            'suggestion' => 'required',
            'companyId' => 'required',
        ];
    }

    public function massages(){
        return [
            'suggestion.required' => '意见不能为空',
            'companyId.required' => 'id名称不能为空',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $data = $validator->errors()->all();
        throw (new HttpResponseException(response()->json([
            'code'=>100,
            'msg' => '失败',
            'data'=> $data
        ],422)));
    }
}