<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>登陆</title>
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/login.css">
      <link rel="stylesheet" href="../layui/css/layui.css">
  <script src="js/jquery.js"></script>
  <script src="js/js.js"></script>
  <input type="hidden" id="preUrl" value="{{$companyUrl}}">
</head>

<body>
  <div class="index">
    <!--头部-->
    <div class="header">
      <a style="float:left" href="{{$companyUrl}}" class="login-returnIndex"><< 主页</a>
      <a class="header-index-register">
        <img src="img/loginReg/register.png" alt="">
        <span class="header-index-logo-login">注册</span>
        <a class="login-findPassword"><img src="img/return.png" /></a>
        <a class="login-findPassword-word" href="../findPassword?companyUrl={{$companyUrl}}">找回密码</a>
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
        <!-- 主题form表单内容 -->
        <div class="index-content-form">
          <form action="#">
            <div class="phone-number">
              <label for="phone-number-id">手机号：</label>
              <input  maxlength="11" minlength="11" id="phone-number-id" type="text">
            </div>
            <div class="password">
              <label for="password-id">密&nbsp&nbsp 码：</label>
              <input  maxlength="16"  minlength="6" id="password-id" type="password">
            </div>
            <div class="verification">
              <label for="verification-id">验证码：</label>
              <input maxlength="4" minlength="4" id="verification-id" type="text">
              <img id="verification-img" src="{{Captcha::src()}}" alt="">
            </div>
            <input class="index-content-form-submit-login" type="button" value="登    录">
          </form>
        </div>
      </div>
    </div>
  </div>
  <script src="../layui/layui.js"></script>
</body>

</html>