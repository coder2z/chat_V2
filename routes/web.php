<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return response()->success();
// });

//total 42
// Route::group(['middleware' => ['check.pic.upload.power']],function(){
    //更新图片
    Route::post('/picture/updatepicture','Picture\PictureUpdateController@updatePicture');
// });
//输出图片
//Route::GET('/picture/showpicture/{name}','Picture\PictureUpdateController@showPicture');//不能读取图片


//吕永杰 2
Route::post('/register' , 'User\LoginController@register');//个人账号注册
Route::post('/uploadPassword' , 'User\LoginController@uploadPassword');//找回密码
Route::post('/getCaptcha' , 'User\LoginController@getCaptcha');//获取验证码
Route::post('/login' , 'User\LoginController@login');//账号登陆
Route::get('/loginOut' , 'User\LoginController@loginOut');//账号注销
Route::group(['middleware' => ['login']],function(){
	Route::post('/suggest' , 'User\LoginController@suggestReturn');//意见反馈
});
Route::get('/findPassword','ViewsController@findPassword');//找回密码
Route::get('/companys/{id}' , 'User\LoginController@getCompanysInfo');//获取指定企业信息  
//只能够企业客服上传自己企业的黑名单
Route::group(['middleware' => ['check.customer.company']],function(){
    Route::post('/services/uploadBlackList' , 'Service\ServiceController@uploadBlackList');//上传黑名单申请
});
Route::group(['middleware' => ['check.found.company']],function(){
    //李承坤 公司查看客服回答
    Route::post("/company/dialog","Auth\CompanyDialogController@getDialog");//通过客服id 用户id查找对应对话
    Route::get("/company/dialog/feedback","Auth\CompanyDialogController@getDialogFeedback");//通过客服id 用户id查找对应的反馈
});
//郑如缘4
Route::group(["prefix"=>"companies"],function(){
    Route::group(['middleware' => ['check.question.id']],function(){
        //通过问题id查找问题详细 by 李磊&李承坤
        Route::post('/questions/detail','Admin\AdminQuestionOperateController@getQuestionDetailByQuestionId');
    });
    Route::group(['middleware' => ['check.question.company.id']],function(){
        //获取所有当前企业的问题
        Route::get("/{companyid}/questions","Auth\CompanyController@getAllQuestionsInfo");
        //获取所有当前企业的问题 with State
        Route::post("/{companyid}/questions/state","Auth\CompanyController@getAllQuestionsInfoByState");
        //新增问题
        Route::post("/{companyid}/addQuestion","Auth\CompanyController@addQuestion");//能给普通用户添加问题
        //查看客服问答
        Route::get("/{companyid}/showQuestions","Auth\CompanyController@showQuestions");
        //获取首句内容
        Route::get("/{companyid}/getFirstContent","Auth\CompanyController@getFirstContent");
        //修改首句内容put
        Route::put("/{companyid}/updateFirstContent","Auth\CompanyController@updateFirstContent");
        //显示热门问题get
        Route::get("/{companyid}/showHotQuestions","Auth\CompanyController@showHotQuestions");
    });
});
Route::group(['middleware' => ['check.question.company.id']],function(){
    //返回指定客服聊天记录
    Route::get("/records/{companyid}","Auth\CompanyController@getRecordDetail");
    //显示所有黑名单
    Route::get("/blacklists/{companyid}","Auth\CompanyController@getAllBalckLists");
    //模糊搜索
    Route::post("/blacklists/search/{companyid}","Auth\CompanyController@searchInfo");
    //显示指定公司状态的信息
    Route::post("/blacklists/state/{companyid}","Auth\CompanyController@showInfo");
    //李承坤 公司查看客服回答
    Route::get("/company/getCustumerList/{companyid}","Auth\CompanyDialogController@getCustumerList");//通过公司id查找对应的客服id找到所有对话 返回客服名，用户名，时间
});
Route::group(['middleware' => ['check.black.id']],function(){
    //显示指定黑名单详细内容
    Route::get("/blacklists/detail/{id}","Auth\CompanyController@showBlackList");
    //将指定黑名单人员移除黑名单
    Route::delete("/blacklists/{id}","Auth\CompanyController@removeBlackList");
    //将指定黑名单人员加入黑名单put
    Route::put("/blacklists/{id}","Auth\CompanyController@addBlackList");
});
//黑名单状态更新，黑名单公司验证
Route::group(['middleware' => ['check.black.company']],function(){
    //修改指定黑名单id 的状态  by lck
    Route::post("/blacklists/updateState","Auth\CompanyController@updateBalckList");
});
//admin 权限中间件
Route::group(['middleware' => ['chech.admin.power']],function(){
    //李磊
    //搜索问题
    Route::get('/admin/questions/search','Admin\AdminQuestionOperateController@searchQuestion');
    //获取全部问题
    Route::get('/admin/questions','Admin\AdminQuestionOperateController@getAllQuestions');
    //通过id获取信息
    Route::post('/admin/questions/detail','Admin\AdminQuestionOperateController@getQuestionDetailByQuestionId');
    //通过审核
    Route::post('/admin/questions/access','Admin\AdminQuestionOperateController@accessQuestionByQuestionId');
    //取消通过审核
    Route::post('/admin/questions/changeState','Admin\AdminQuestionOperateController@changeQuestionStateByQuestionId');
    //删除问题
    Route::delete('/admin/questions','Admin\AdminQuestionOperateController@deleteQuestionByQuestionId');

    //易康
    Route::group(['prefix' => 'admin'], function () {
        Route::get('company', 'Admin\AdminCompanyOperateController@getAllCompany');
        Route::post('company', 'Admin\AdminCompanyOperateController@addCompany');
        Route::post('updateCompany', 'Admin\AdminCompanyOperateController@updateCompany');//传入公司信息
        Route::post('changeCompanyState', 'Admin\AdminCompanyOperateController@changeCompanyState');//lck 传入company_id 和 state 修改状态
        Route::delete('company', 'Admin\AdminCompanyOperateController@deleteCompanyByCompanyId');
        Route::get('customer', 'Admin\AdminCustomerController@getAllCustomersByCompanyId');
        Route::get('customer/detail', 'Admin\AdminCustomerController@getCustomerInfoByCustomerId');
        Route::post('customer', 'Admin\AdminCustomerController@addCustomer');//没有做唯一验证
        Route::post('customer/changeCustomerState', 'Admin\AdminCustomerController@changeCustomerState');
        Route::delete('customer', 'Admin\AdminCustomerController@deleteCustomer');
        Route::get('company/{status}', 'Admin\AdminCompanyOperateController@getStatusCompany');
        Route::post('customer/search', 'Admin\AdminCustomerController@Search');
    });

    //向良峰
    Route::get('/admin/person/search','Admin\AdminPersonOperateController@searchPersonalUser');
    Route::get('/admin/person','Admin\AdminPersonOperateController@getAllPersonalUser');
    Route::post('/admin/person','Admin\AdminPersonOperateController@addPersonalUser');
    Route::post('/admin/person/state/update','Admin\AdminPersonOperateController@updatePersonalUserByUserId');

    //聂鹏郦
    //获取短信接口
    Route::get('/admin/other/sms','Admin\AdminOtherSettingController@getSmsInfo');
    //修改短信接口
    Route::post('/admin/other/sms','Admin\AdminOtherSettingController@updateSmsInfo');
    //获取ws地址
    Route::get('/admin/other/ws','Admin\AdminOtherSettingController@getWsInfo');
    //修改ws地址
    Route::post('/admin/other/ws','Admin\AdminOtherSettingController@updateWsInfo');
});
//机器人及客服
Route::any('/RobotChat','Robot\RobotChatController@getQuestionId');
Route::get('/Service/getContent', 'Service\ContentController@getContent');
Route::post('/Service/inputContent', 'Service\ContentController@save_message');
Route::get('Service/getUser','Service\MessageController@getUser');
// Route::get('/','Service\IMController@customer');
Route::get('Service/isRead','Service\ContentController@isRead');

//视图处理
Route::get('/register','ViewsController@showRegister');
Route::get('/login','ViewsController@showLogin');
Route::get('/service','Service\IMController@serviceIndex');
// Route::get('/',function(){
//     return view('customer')->with(['href'=>null,'userId'=>null,'serId'=>null,'userName'=>null,'serName'=>null,'companyId'=>null,'companyName'=>null,'defaultReply'=>null,'companyUrl'=>null]);
// });
Route::get('/',function(){
    return response()->view('errors404');
});

//admin权限
Route::group(['middleware' => ['chech.admin.power']],function(){
    Route::get('/admin/companyOperate','ViewsController@companyOperate');
    Route::get('/admin/serviceManage','ViewsController@serviceManage');
    Route::get('/admin/materialEdit','ViewsController@materialEdit');
    Route::get('/admin/personalAccount','ViewsController@personalAccount');
    Route::get('/admin/otherSetting','ViewsController@otherSetting');
});
//文章路由
Route::group(['middleware' => ['check.article.power']],function(){
    Route::get('/articles/{answerId}','ViewsController@showArticles');
    Route::post('/questions/detail','Admin\AdminQuestionOperateController@getQuestionDetailByQuestionId');
});
Route::group(['middleware' => ['check.company.power']],function(){
    Route::get('/balckUser','ViewsController@balckUser');
    Route::get('/questionsAndAnswers','ViewsController@questionsAndAnswers');
    Route::get('/lookSolve','ViewsController@lookSolve');
    Route::get('/setData','ViewsController@setData');
});

//图片验证码
Route::get('/image_captcha', 'ImageCaptcha\imageCaptchaController@captcha');


Route::get('/{url}','Service\IMController@customer');


