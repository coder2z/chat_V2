<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TableVerify extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    //验证用户权限  true 为有权限
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
            'title'=>'required',
            'intro'=>'required',
            'Method'=>'required',
            'warning'=>'required'
        ];
    }

    public function messages()
    {
        return [
            'title.required'=>'标题不能为空',
            'intro.required'=>'简介不能为空',
            'Method.required'=>'方法步骤不能为空',
            'warning.required'=>'注意事项不能为空',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw (new HttpResponseException(response()->json([
            'code'=>100,
            $validator->errors()->all(),
        ],422)));
    }
}
