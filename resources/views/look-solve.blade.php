<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
  		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta http-equiv="Access-Control-Allow-Origin" content="*">
		<link rel="stylesheet" type="text/css" href="css/look-solve.css" />
		<script src="js/jquery-2.1.0.js"></script>
		<script type="text/javascript" src="js/look-solve.js"></script>
 		<input type="hidden" id="companyId" value="{{$companyId}}">
		<scr </head>

			<body>
				<div class="index">
					<!--头部-->
					<header>
						<div class="head_left">
							<a href="loginOut">
								<< 退出 </a>
						</div>
						<div class="head_right">
							<div class="head_right-left">
								<img src="img/783A406729BFC674666C7579630EFB8B.jpg" />
							</div>
							<div class="head_right-right">
								<p><span>{{$userName}}</span> <span style="font-size: 16px;">管理员</span></p>
								<p>欢迎登录</p>
							</div>
						</div>
					</header>

					<div class="Questions-content">
						<ul class="choice-ul">
							<li>
								<a href="questionsAndAnswers">问答材料编辑</a>
							</li>
							<li>
								<a  style="color: white;">查看客服回答</a>
							</li>
							<li>
								<a href="setData">数据设置统计</a>
							</li>
							<li>
								<a href="balckUser">黑名单</a>
							</li>
						</ul>

						<!--主页开始-->
						<div class="content-main main-one">
							<div class="content-main-content">
								<div class="content-main-content-top">
									<div class="content-main-content-top-div-box">
										<div class="box-son">
											<ul>
												<li>客户ID</li>
												<li>客服</li>
												<li>客服ID</li>
												<li>时间</li>
												<li>用户</li>
												<li>操作</li>
											</ul>
														<!--<ul class="pacon">				
												<li><input type="text" value="1" readonly=""/></li>
												<li><input type="text" value="杨泽淼"readonly=""/></li>
												<li><input type="text" value="2019"readonly=""/></li>
												<li><input type="text" value="张傲"readonly=""/></li>
												<li><span>查看</span></li>
											</ul>-->
										</div>

									</div>
								</div>
								<div class="content-main-content-bottom">
									<div class="content-main-content-bottom-bottom">
										<div class="last-page pp">上一页</div>
									<div class="dian">...</div>
										<div class="jump">
											<input type="text" />
											<span class="nowpage">1</span>/<span class="pagez"></span>页
										</div>
										<div class="next-page">下一页</div>
									</div>
								</div>
							</div>

							<!--主页结束-->

						</div>

						<!--弹出框-->
						<div class="content-main main-two" style="display: none;">
							<div class="look-talk-left">
								<div class="look-talk-left-content">
									<!--聊天内容-->
									<div class="chatContent">
										<div class="chatContent_div">
											

										</div>

									</div>

								</div>
							</div>
{{--							<div class="look-talk-right">--}}
{{--								<img src="img/close.png" class="hide-talk"/>--}}
{{--								<p>意见反馈:</p>--}}
{{--								<textarea disabled></textarea>--}}
{{--							</div>--}}
						</div>

					</div>

</html>