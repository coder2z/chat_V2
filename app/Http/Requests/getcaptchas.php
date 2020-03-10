<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class getcaptchas extends FormRequest
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
            'tel' => 'required|min:11|max:11',
            'type' => 'required',
        ];
    }

    public function massages(){
        return [
            'tel.unique' => '电话重复',
            'tel.required' => '电话号码为11位',
            'type.required' => 'type名称不能为空',
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