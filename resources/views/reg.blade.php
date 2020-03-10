<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
  	<meta name="csrf-token" content="{{ csrf_token() }}">
    <title>注册</title>
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/login.css">
     <link rel="stylesheet" href="../layui/css/layui.css">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script src="js/js.js"></script>
 <input type="hidden" id="preUrl" value="{{$companyUrl}}">
</head>

<body>
    <div class="index">
        <!--头部-->
        <div class="header">
            <a class="header-index-logo" href="../login?companyUrl={{$companyUrl}}">
                <img src="img/loginReg/register.png" alt="">
                <span class="header-index-logo-login">登陆</span>
            </a>
        </div>
        <!--主体内容-->
        <div class="index-content">
            <div class="index-container">
                <!-- content-logo -->
                <div class="index-content-logo">
                    <img src="img/loginReg/service.png" alt="">
                    &nbsp&nbsp&nbsp&nbsp全鑫问答
                </div>
                <!-- 中间主体的content -->
                <div class="index-content-form">
                    <form action="" onsubmit="return false;">
                        <div class="username">
                            <label for="username-id">用户名：</label>
                            <input maxlength="30"  name="user" id="username-id" type="text">
                        </div>
                        <div class="password">
                            <label for="password-id">密&nbsp&nbsp 码：</label>
                            <input maxlength="16" minlength="6" name="password" id="password-id" type="password">
                        </div>
                        <div class="phone-number">
                            <label for="phone-number-id">手机号：</label>
                            <input maxlength="11" minlength="11" name="number" id="phone-number-id" type="tel">
                        </div>
                        <div class="verification">
                            <label for="verification-id">验证码：</label>
                            <input maxlength="6" minlength="6" name="verification" id="verification-id" type="text">
                            <button  type="button" class="is-verification">获取验证码</button>
                        </div>
                        <!-- 注册按钮 -->
                        <input class="index-content-form-submit" type="submit" value="提交注册">
                    </form>
                </div>
            </div>
        </div>
    </div>
      <script src="../layui/layui.js"></script>
</body>

</html>