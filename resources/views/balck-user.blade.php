<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <link rel="stylesheet" type="text/css" href="css/black-user.css"/>
    <script src="js/jquery-2.1.0.js"></script>
    <script type="text/javascript" src="js/black-user.js"></script>
    <input type="hidden" id="companyId" value="{{$companyId}}">
    <scr
</head>

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
                <img src="img/783A406729BFC674666C7579630EFB8B.jpg"/>
            </div>
            <div class="head_right-right">
                <p><span>{{$userName}}</span> <span style="font-size: 16px;">管理员</span></p>
                <p>欢迎登录</p>
            </div>
        </div>
    </header>

    <div class="Questions-content">
        <ul class="choice-ul">
            <li><a href="questionsAndAnswers">问答材料编辑</a></li>
            <li><a href="lookSolve">查看客服回答</a></li>
            <li><a href="setData">数据设置统计</a></li>
            <li><a style="color: white;">黑名单</a></li>
        </ul>

        <!--主页开始-->
        <div class="content-main black-main-one">
            <div class="search">
                <input type="text" class="search-input" placeholder="搜索用户"/>
                <button class="search-btn">搜索</button>
            </div>
            <select class="select">
                <option>全部</option>
                <option>待审核</option>
                <option>禁用</option>
            </select>
            <div class="black-user-box">

                <ul>
                    <li>ID</li>
                    <li>用户名</li>
                    <li>客服名</li>
                    <li>手机号</li>
                    <li>禁用时间</li>
                    <li>禁用公司</li>
                    <li>状态</li>
                    <li>操作</li>
                </ul>

                <!--<ul>
               <li>	<input type="text" value="1"/></li>
               <li>	<input type="text" value="问答材料"/></li>
               <li>	<input type="text" value="张傲"/></li>
               <li>	<input type="text" value="今天"/>/li>
               <li>	<input type="text" value="今天"/></li>
               <li>	<input type="text" value="腾讯"/></li>
               <li>	<input type="text" value="未审核"/></li>
               <li><span class="look-balck-user">查看</span></li>
           </ul>
           -->
            </div>
            <div class="balck-user-page">
                <div class="last-page pp">上一页</div>
                <div class="dian">...</div>
                <div class="jump">
                    <input type="text"/>
                    <span class="nowpage">1</span>/<span class="pagez"></span>页
                </div>
                <div class="next-page">下一页</div>
            </div>
        </div>

        <!--主页结束-->


        <!--查看黑名单详情-->
        <div class="content-main black-main-two" style="display: none;">
            <div class="back-btn">返回</div>
            <span class="state">状态：黑名单</span>
            <div class="black-main-two-left">
                <div class="black-information">
                    <div>
                        <label for="user-name">用户名：</label>
                        <input type="text" id="user-name"/>
                    </div>
                    <div>
                        <label for="name">姓名：</label>
                        <input type="text" id="name"/>
                    </div>
                    <div>
                        <label for="phone">电话：</label>
                        <input type="text" id="phone"/>
                    </div>
                </div>
            </div>
            <div class="black-main-two-right">
{{--                <div class="jubaolan">--}}
{{--                    <div class="jubaolan-left">--}}
{{--                        <span class="jb">举报信息：</span>--}}
{{--                        <div class="jubaolan-left-input">--}}
{{--                            <img src="img/shangchuantupian.png" id="black-img" class="input-img"/>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                    <div class="jubaolan-right">--}}
{{--                        <textarea id="black-info" placeholder="请输入举报信息"></textarea>--}}
{{--                    </div>--}}
{{--                </div>--}}
                <div class="delete-black">移出黑名单</div>
            </div>
        </div>


    </div>
</div>

</html>