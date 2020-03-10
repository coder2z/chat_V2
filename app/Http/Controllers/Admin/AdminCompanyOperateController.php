<?php

namespace App\Http\Controllers\Admin;

use Validator;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminCompanyOperateRequest;
use App\Http\Requests\Admin\AdminCompanyUpdateRequest;
use App\Http\Requests\Admin\CompanyIdRequest;
use App\Http\Requests\Admin\CustomerIdRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;

class AdminCompanyOperateController extends Controller
{
    public function getAllCompany()
    {
        $data = User::where('type', 'company')->select('id','cname','status','type','tel','created_at')->paginate(10);
        $result = ['code' => '200', 'msg' => '成功', 'data' => $data];
        return response()->json($result);
    }
    public function addCompany(AdminCompanyOperateRequest $request)
    {
        $userCompany = new User();
        $userCompany->cname = $request->get('company_name'
    );
        $userCompany->password = bcrypt($request->get('password'));
        $userCompany->type = 'company';
        $userCompany->tel = $request->get('company_phone');
        $userCompany->created_at = date('Y-m-d h:i:s', time());
        $resultUserCompany = $userCompany->save();


        $companyId = User::where('cname', $request->get('company_name'))->value('id');
        // dd($companyId);

        $company = new Company();
        $company->company_name = $request->get('company_name');
        $company->url = $companyId;
        $company->created_at = date('Y-m-d h:i:s', time());
        $company->chat_user_id = $companyId;
        $resultCompany = $company->save();

        if ($resultUserCompany && $resultCompany) {
            $result = ['code' => '200', 'msg' => '成功', 'data' => null];
        } else {
            $result = ['code' => '100', 'msg' => '失败', 'data' => null];
        }

        return response()->json($result);
    }
    public function deleteCompanyByCompanyId(CompanyIdRequest $request)
    {
        $id = $request->get('company_id');

        $userCompany = User::where('id',$id)->first();
        if($userCompany){
            $custumer = User::where('type',$id)->delete();
        }
        $resultUserCompany = $userCompany->delete();
        

        $company = Company::where('chat_user_id', $id);
        $resultCompany = $company->delete();

        if ($resultUserCompany && $resultCompany && $custumer) {
            $result = ['code' => '100', 'msg' => '失败', 'data' => null];
        } else {
            $result = ['code' => '200', 'msg' => '成功', 'data' => null];
        }
        return response()->json($result);
    }
    public function changeCompanyState(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_id' =>'required|integer',
            'state' => 'required|min:0|max:2|integer'
        ]);
        if ($validator->fails()) {
            return response()->success(100,'失败!',null);
        }

        $id = $request->get('company_id');
        $state = $request->get('state');
        


        $userCompany = User::where('id',$id)->first();
        if($userCompany){
            $userCompany->status = $state;
        }
        $resultUserCompany = $userCompany->save();
        if ($resultUserCompany) {
            $result = ['code' => '200', 'msg' => '成功', 'data' => null];
        } else {
            $result = ['code' => '100', 'msg' => '失败', 'data' => null];
        }
        return response()->json($result);
    }

    //by 李承坤
    public function updateCompany(AdminCompanyUpdateRequest $request)
    {
        $companyId = $request->get('company_id');
        $userCompany = User::where('id',$companyId)->first();
       // dd($userCompany);
        $userCompany->cname = $request->get('company_name');
        //$userCompany->password = bcrypt($request->get('password'));
        $userCompany->type = 'company';
        $userCompany->tel = $request->get('company_phone');
        $userCompany->created_at = date('Y-m-d h:i:s', time());
        $resultUserCompany = $userCompany->save();


        //$companyId = User::where('cname', $request->get('company_name'))->value('id');
        // dd($companyId);

        $company = Company::where('chat_user_id',$companyId)->first();
        // dd($company);
        $company->company_name = $request->get('company_name');
        $company->created_at = date('Y-m-d h:i:s', time());
        $resultCompany = $company->save();

        if ($resultUserCompany && $resultCompany) {
            $result = ['code' => '200', 'msg' => '成功', 'data' => null];
        } else {
            $result = ['code' => '100', 'msg' => '失败', 'data' => null];
        }

        return response()->json($result);
    }



    
    public function getStatusCompany($id)
    {
        // dd($id);
        $data = User::where('type', 'company')->where('status', $id)->paginate(10);
        $result = ['code' => '200', 'msg' => '成功', 'data' => $data];
        return response()->json($result);
    }
}


