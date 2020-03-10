<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
  		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta http-equiv="Access-Control-Allow-Origin" content="*">
		<link rel="stylesheet" type="text/css" href="css/Questions-and-answers.css" />
				<link rel="stylesheet" type="text/css" href="css/preview.css" />

		<script src="js/jquery-2.1.0.js"></script>
		<script type="text/javascript" src="js/Questions-and-answers.js"></script>
		<script src="js/Questions-myself-img.js"></script>
		<script src="js/way-myself-img.js"></script>
		<script type="text/javascript" src="js/tuodong.js"></script>
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
								<a  style="color: white;">问答材料编辑</a>
							</li>
							<li>
								<a href="lookSolve">查看客服回答</a>
							</li>
							<li>
								<a href="setData">数据设置统计</a>
							</li>
							<li>
								<a href="balckUser">黑名单</a>
							</li>
						</ul>

						<!--主页开始-->
						<div class="content-main">
							<div class="content-main-content">
								<div class="content-main-content-top">
									<select>
										<option>全部</option>
										<option>禁用</option>
										<option>待审核</option>
										<option>启用</option>
									</select>
									<div class="add-question">添加问答</div>
								</div>
								<div class="content-main-content-bottom">

									<div class="content-main-content-bottom-content">
										<ul>
											<li>ID</li>
											<li>标题</li>
											<li>作者</li>
											<li>提交日期</li>
											<li>审核日期</li>
											<li>状态</li>
											<li>操作</li>
										</ul>

									</div>
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

						</div>

						<!--主页结束-->

						<!--添加问答部分-->
						<div class="Questions-content-content look-one" style="display: none;">
							<div class="Questions-content-content-left">
								<ul>
									<li>简介</li>
									<li>方法/步骤</li>
									<li>注意事项</li>
								</ul>
							</div>
							<div class="Questions-content-content-right">
								<!--简介开始-->
								<div class="Questions-content-content-right-content">
									<div class="Questions-content-content-right-content-top introduct">
										<div class="introduct-left">
											<div class="intrduct-title">
												<label for="ti">标题</label>
												<input type="text" placeholder="点击输入标题" id="ti" />
											</div>
											<div class="intrduct-intro">
												<label for="intro">简介</label>
												<textarea id="intro" placeholder="点击输入简介"></textarea>
											</div>
										</div>
										<div class="introduct-right">
											<label for="send-i">
												<div class="send-img">
													<img src="../img/shangchuantupian.png"/>
												</div>
												</label>
												    <form action="" method="post" id="uploadF" enctype="multipart/form-data">
     											   <input type="file" onchange="selectImage1(this);"  style="display: none;" id="send-i" name="picture"/>
                                                     </form>

										</div>
									</div>

								</div>
								<!--简介结束-->

								<!--方法步骤开始-->
								<div class="Questions-content-content-right-content" style="display: none;">
									
									<div class="Questions-content-content-right-content-top">
										<ul>

                                         
										</ul>
										
									</div>
                                  <div class="addways2">点击添加方法</div>
								</div>
								<!--方法步骤结束-->

								<!--注意事项-->
								<div class="Questions-content-content-right-content" style="display: none;">
									<div class="Questions-content-content-right-content-top" ">
										<div class="wirte-things-box ">
											
										</div>
									
                                       <div class="add-things ">+添加注意事项</div>
									</div>
									<div class="Questions-content-content-right-content-bottom things-need " >
										<ul>
											<li>提交审核</li>
											<li class="preview">预览</li>
											<li class="close-open ">取消</li>
										</ul>
									</div>
								</div>
								<!--注意事项结束-->

							</div>


						</div>
						<!--添加问答部分结束-->
						
						
						<!--查看问答部分-->
						<div class="Questions-content-content look-two " style="display: none; ">
							<div class="Questions-content-content-left look-two-left">
								<ul>
									<li>简介</li>
									<li>方法/步骤</li>
									<li>注意事项</li>
								</ul>
							</div>
							<div class="Questions-content-content-right ">
								<!--简介开始-->
								<div class="Questions-content-content-right-content look-two-right ">
									<div class="Questions-content-content-right-content-top introduct ">
											<div class="introduct-left ">
												<div class="intrduct-title ">
													<label for="ti ">标题</label>
													<input type="text " placeholder="点击输入标题"  id="ti"/>
												</div>
												<div class="intrduct-intro ">
														<label for="intro ">简介</label>
												<textarea id="intro " placeholder="点击输入简介 "  class="please-jian"></textarea>
												</div>
											</div>
											<div class="introduct-right ">
												<label>
												<div class="send-img ">
													<img src="img/shangchuantupian.png " />
												</div>
												</label>

											</div>
									</div>

								</div>
								<!--简介结束-->

								<!--方法步骤开始-->
								<div class="Questions-content-content-right-content look-two-right " style="display: none; ">
									<div class="Questions-content-content-right-content-top ">
										<ul>

										</ul>
									</div>

								</div>
								<!--方法步骤结束-->

								<!--注意事项-->
								<div class="Questions-content-content-right-content look-two-right " style="display: none; ">
									<div class="Questions-content-content-right-content-top ">
										<div class="wirte-things-box">

										</div>

										<!--<div class="add-things">+添加注意事项</div>-->
									</div>
									<div class="Questions-content-content-right-content-bottom things-need">
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
				
				
				
			              <!-- 预览界面 -->
  <div class="preview2" style="display: none;">
    <div class="preview-content">
      <div class="preview-content-header">
        问题查看
      </div>
      <div class="preview-content-container">
        <div class="preview-content-container-intro">
          <div class="preview-content-container-intro-intro">简介 ></div>
          <div class="preview-content-container-intro-title">
          </div>
          <div class="preview-content-container-intro-content">
            </div>
          <div class="preview-content-container-intro-img">
            <img src="" alt="">
          </div>
        </div>
        <div class="preview-content-container-method">
          <div class="preview-content-container-method-title">
            方法/步骤 >
          </div>
          <div class="preview-content-container-method-list">
            <!-- <div class="preview-content-container-method-item">
                <span>1</span>
                <div class="preview-content-container-method-item-content">
                  <p>在成都旅游，旺季的时候，市中心以及景区附近的住宿价格较高，因此我们最好避开景区和市中区，去交通比较便利的地区住宿即可。</p>
                  <img src="./img/验证码.png" alt="">
                </div>
              </div> -->

          </div>
        </div>
        <div class="preview-content-container-careful">
          <div class="preview-content-container-careful-title">
            注意事项 >
          </div>
          <div class="preview-content-container-careful-list">
            <!-- <div class="preview-content-container-careful-item">
                <span></span>
                <div>一般距离景区越远，住宿会越便宜，我们最好以地铁为主进行住宿点的查找，并且尽量避免转车和换乘，尽量可以在1小时内到达景区为佳。</div>
              </div> -->
          </div>
        </div>
      </div>
      <div class="preview-content-footer">

      </div>
    </div>
    <img src="img/close.png" class="close-pre"/>
  </div>
  <!-- 预览界面end -->				
				
				
				
				
				
				
				

</body>
</html>