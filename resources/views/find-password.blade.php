<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
  	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title></title>
	<link rel="stylesheet" href="css/find-password.css" />
	<link rel="stylesheet" href="../layui/css/layui.css">
	<script type="text/javascript" src="js/jquery-2.1.0.js"></script>
	<script type="text/javascript" src="js/findpassword.js"></script>
	<input type="hidden" id="preUrl" value="{{$companyUrl}}">
</head>

<body>
	<div class="index">
		<!--头部-->
		<header>
			<!-- <div class="head_left">
					<a href="#">
						<< 首页</a>
				</div> -->
			<div class="head_right">
				<a><img src="img/login.png" /></a>
				<a class="head_right_r" href="../login?companyUrl={{$companyUrl}}">登录/注册</a>
				<!-- <a><img src="img/return.png" /></a>
					<a href="#">找回密码</a> -->
			</div>
		</header>



		<div class="find-password">
			<img src="img/title1.png"/ class="title">
			<img src="img/ser.png" class="title2" />
			<span class="title3">全鑫问答</span>
			<form>

				<div class="line-box">
					<div class="lable-box"><label for="input1">手机号：</label></div>

					<input maxlength="11"  type="text" id="input1" />
				</div>

				<div class="line-box">
					<div  class="lable-box"><label for="input2">新密码：</label></div>

					<input maxlength="16" minlength="6" type="password" id="input2" />
				</div>
				<div class="line-box">
					<div class="lable-box"><label for="input3">确认密码：</label></div>

					<input maxlength="16" minlength="6" type="password" id="input3" />
				</div>

				<div class="line-box">
					<div class="lable-box"><label for="input4">短信验证码：</label></div>

					<input  maxlength="6" type="text" id="input4" />
					<input type="button" class="gain-yan" value="获取验证码">
				</div>
				<div class="line-box">
					<div class="lable-box"> <label for="input5" class="lala">验证码：</label></div>

					<input maxlength="4" type="text" id="input5" class="lain" />
					<img id="verification-img" src="{{Captcha::src()}}" class="yan" />
				</div>
				<input type="button" value="确认修改" class="new-word-submit" />
			</form>
		</div>
	</div>
	</div>
	
	<script src="../layui/layui.js"></script>
</body>

</html>