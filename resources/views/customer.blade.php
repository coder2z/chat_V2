<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
  	<meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <link rel="stylesheet" href="css/index.css"/>
    <title>全鑫问答首页</title>
    <link rel="stylesheet" href="../layui/css/layui.css">
    <script src="js/jquery.js"></script>
    <script src="js/myself-image.js"></script>
 <input type="hidden" id="preUrl" value="{{$companyUrl}}">
 <input type="hidden" id="companyId" value="{{$companyId}}">
 <input type="hidden" id="userId" value="{{$userId}}">
</head>
<body>
<div class="index">
    <!--头部-->
    <header>
        <div class="head_left">
            <a href="{{$href}}"><< 退出登录 </a>
        </div>
        <div class="head_right">
            <a><img src="img/login.png"/></a>
            <a class="head_right_r" href="{{$href}}">{{$userName}}</a>
        </div>
    </header>
    <!--主体内容-->
    <!--标题-->
    <div class="index_h">
        <h3>{{$companyName}}公司客服系统</h3></div>
    <div class="index_title">
        <div class="index_left">
            <!--聊天内容-->
            <div class="index_dialog" id="h_chat_content">
                <!--一条消息-->
                <div class="index_news">
                    <div class="index_news_img"><img src="img/ser.png" class="user-head"/></div>
                    <div class="index_border_left"></div>
                    <div class="index_terr">
                        <div>{{$defaultReply}}（如需人工服务请注册登陆后再 输入“人工客服”进行对话）</div>
                    </div>
                </div>
                <p>未读</p>
                <!--自己消息-->
                <div id='{{$userId}}' class="index_news_r">
                <input type="hidden" id='serId' value="{{$serId}}">
                <input type="hidden" id='serName' value="{{$serName}}">
                </div>
            </div>
            <!--编辑内容-->
            <div class="index_input">
                <!--可选择功能-->
                <div class="index_type">
                    <!--字体-->
                    <div class="index_er">
                        <div class="font_size_choice">
                            <ul class="font_size_choice_size">
                                <li>字体大小</li>
                                <li class="12px">12</li>
                                <li class="13px">13</li>
                                <li class="14px">14</li>
                                <li class="15px">15</li>
                                <li class="16px">16</li>
                            </ul>
                            <ul class="font_size_choice_bold">
                                <li>字体粗细</li>
                                <li class="200bold">200</li>
                                <li class="300bold">300</li>
                                <li class="400bold">400</li>
                                <li class="500bold">500</li>
                                <li class="600bold">600</li>
                            </ul>
                        </div>
                        <img src="img/typeface.png" class="fonts"/>
                    </div>
                    <!--表情包-->
                    <div class="index_er"><img src="img/meme.png" class="smile"/>
                        <div class="chatInput_function_img2_content">
                            <ul>
                                <li><img class="enjoy" src="img/表情包/爱你.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/鄙视.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/大哭.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/大笑.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/调皮.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/发怒.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/愤怒.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/尴尬.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/乖巧.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/嘿嘿.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/惊呆.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/开心.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/卖萌.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/亲亲.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/色.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/帅气.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/笑哭.png" alt=""></li>
                                <li><img class="enjoy" src="img/表情包/忧郁.png" alt=""></li>
                            </ul>
                        </div>
                    </div>
                    <!--剪辑-->
{{--                    <div class="index_er"><img src="img/screenshot.png" onclick="on()"/></div>--}}
                    <!--图片-->
                    <div class="index_er">
                        <label for="input_img">
                            <img src="img/picture.png"/>
                        </label>
                        <input type="file" onchange="selectImage(this);" style="display: none;" id="input_img"/>
                    </div>
                </div>
                <!--文本框-->
                <div class="index_text" contentEditable="true" id="chatInput_input_id"></div>
                <!--操作按钮-->
                <div class="index_confirm">
                    <button id="sendButton"  onclick='send(this)' class="send"><img src="img/send.png"/> 发送</button>
                </div>
            </div>
        </div>
{{--        <div class="index_right">--}}
{{--            <a>意见反馈:</a>--}}
{{--            <form>--}}
{{--                <textarea class="index_right-advice" placeholder="请输入反馈意见...."></textarea>--}}
{{--                <input class="index_right_submit" type="button" value="提交"/>--}}
{{--            </form>--}}

{{--        </div>--}}
    </div>
</div>
<div id="img_frame">
    <div class="img_div" ></div>
    <div class="hide-img">
        <img src="img/close.png" />
    </div>
</div>
</body>
<script type="text/javascript" src="js/chit.js"></script>
<script type="text/javascript" src="js/kss.js"></script>
<script src="../layui/layui.js"></script>
<script>
    let Ok = new window.kscreenshot({
        key: 65,
        endCB: function (data) {
            const img = document.createElement('img');
            const Oin = document.getElementById('chatInput_input_id');
            img.src = data;
            Oin.append(img);
        },
        cancelCB:function (data) {
            return false;
        }
    });
    function on() {
        Ok.startScreenShot();
    }

    document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
            e.preventDefault();
            $('#sendButton').click();
        }
    };
</script>
</html>