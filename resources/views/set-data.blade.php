<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
  		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta http-equiv="Access-Control-Allow-Origin" content="*">
		<link rel="stylesheet" type="text/css" href="css/set-data.css" />
		<script src="js/jquery-2.1.0.js"></script>
		<script type="text/javascript" src="js/set-data.js" ></script>
		<script type="text/javascript" src="js/set-data-myselfimg.js" ></script>
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
							<li><a href="questionsAndAnswers" >问答材料编辑</a></li>
							<li><a href="lookSolve" >查看客服回答</a></li>
							<li><a style="color: white;">数据设置统计</a></li>
							<li><a href="balckUser">黑名单</a></li>
						</ul>

						<!--主页开始-->
						<div class="content-main">
						<div class="set-data-left">
							<div class="click-set clleft">首句设置</div>
							<div class="click-question clleft">热门问题</div>
						</div>
						<div class="set-data-right sr-one" >
							<textarea class="first-set" placeholder="首句设置"></textarea>
							<div class="sure-modify">确定修改</div>
						</div>
							<div class="set-data-right sr-two" style="display: none;">
								<div class="hot-question">
									<ul>
										<li>ID</li>
										<li>问题</li>
										<li>热度</li>
										<li>操作</li>
									</ul>
									<!--<ul class="pacon">
										<li><input type="text" value="1"/></li>
										<li><input type="text" value="杨泽淼"/></li>
										<li><input type="text" value="2019"/></li>
										<li><span class="look-hot">查看</span></li>
									</ul>-->
								</div>
								
								
								
								<!--分页按钮-->
									<div class="hot-question-page">
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

					<!--查看问答部分-->
						<div class="Questions-content-content  look-two" style="display: none;">
							<div class="Questions-content-content-left look-two-left">
								<ul>
									<li>简介</li>
									<li>方法/步骤</li>
									<li>注意事项</li>
								</ul>
							</div>
							<div class="Questions-content-content-right">
								<!--简介开始-->
								<div class="Questions-content-content-right-content  look-two-right">
									<div class="Questions-content-content-right-content-top introduct">
											<div class="introduct-left">
												<div class="intrduct-title">
													<label for="ti">标题</label>
													<input type="text" placeholder="点击输入标题奥嗷嗷哦啊哦"  id="ti"/>
												</div>
												<div class="intrduct-intro">
														<label for="intro">简介</label>
												<textarea id="intro" placeholder="点击输入简介" class="please-jian"></textarea>
												</div>
											</div>
											<div class="introduct-right">
												<label for="send-i">
												<div class="send-img">
													<img src="img/shangchuantupian.png" class="shangchuan"/>
													
												</div>
												</label>
												<input type="file" onchange="selectImage(this);" style="display: none;" id="send-i"/>
											</div>
									</div>

								</div>
								<!--简介结束-->

								<!--方法步骤开始-->
								<div class="Questions-content-content-right-content  look-two-right" style="display: none;">
									<div class="Questions-content-content-right-content-top">
										<ul>
										</ul>
									</div>

								</div>
								<!--方法步骤结束-->

								<!--注意事项-->
								<div class="Questions-content-content-right-content  look-two-right" style="display: none;">
									<div class="Questions-content-content-right-content-top"">
										<div class="wirte-things-box">
											
										</div>
									
                                       <div class="add-things">+添加注意事项</div>
									</div>
									<div class="Questions-content-content-right-content-bottom things-need" >
										<ul>
											<li>提交审核</li>
											<li class="preview">预览</li>
											<li class="close-open">取消</li>
										</ul>
									</div>
								</div>
								<!--注意事项结束-->

							</div>
						</div>
						<!--查看问答部分结束-->
						

					</div>
				</div>
				
				
				
				

</body>
</html>