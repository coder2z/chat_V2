<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>客服已登录</title>
    <link rel="stylesheet" href="css/service.css">
    <link rel="stylesheet" href="../layui/css/layui.css">
    <script src="../layui/layui.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script src="js/kss.js"></script>
    <script src="js/service.js"></script>
</head>

<body>
<div class="service">
    <!--头部-->
    <div class="head">
            <span onclick='window.location.href="../loginOut"'>
                < 退出</span></div> <!--主体内容-->
    <div class="content">
        <!--欢迎xxx客服-->
        <div id={{$serId}} class="welcome">
            <span alt={{$serName}}>欢迎{{$serName}}客服</span>
        </div>
        <!--内容-->
        <div class="contents">
            <!--左边客服名字-->
            <div id="userList" class="serviceName">

            </div>
            <!--中间聊天页面-->
            <div class="chat">
                <div class="chat_content">
                    <div class="chat_content_info">
                        <img class="chat_content_info_img"
                             src="img/icon-welcome.png"
                             alt="">

                        <p class="chat_content_info_p">Hint:还没有消息展示哦！</p>
                    </div>
                    <div class="chat_contents">
                        <!--聊天内容-->
                        <div class="chatContent">
                            <div class="chatContent_div" id="h_chat_content">
                                <!--客服-->
                                <div class="service_person">
                                    <!--头像-->
                                    <div class="service_person_hand">
                                        <img src="img/handPortrail_03.jpg" alt="">
                                    </div>
                                    <!--聊天-->
                                    <div class="service_person_chat">
                                        <i></i>
                                        <p>客服你家话aaa</p>
                                    </div>
                                </div>
                                <!--机器-->
                                <div class="robot">
                                    <!--头像-->
                                    <div class="robot_hand">
                                        <div class="robot_hand_pic"></div>
                                    </div>
                                    <!--聊天-->
                                    <div class="robot_chat">
                                        <i></i>
                                        <span>您好，欢迎使用XXX智能客服。（如需人工服务请注册登陆后再输入“人工客服”进行对话）lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!--输入聊天内容-->
                        <div class="chatInput">
                            <!--功能键-->
                            <div class="chatInput_function">
                                                <span>
                                                    <img class="chatInput_function_img1" src="img/typeface.png" alt="">
                                                    <!-- 字体 -->
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
                                                </span>
                                <span>
                                                    <img class="chatInput_function_img2" src="img/emoticon.png" alt="">
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
                                                </span>
{{--                                <span>--}}
{{--                                                    <img onclick="on()" id="chatInput_function_img3"--}}
{{--                                                         class="chatInput_function_img3" src="img/screenshot.png"--}}
{{--                                                         alt="">--}}
{{--                                                </span>--}}
                                <span>
                                                    <label for="file-input" class="
                                                        chatInput_function_img4">
                                                        <img src="img/picture.png"/>
                                                    </label>
                                                    <input onchange="selectImage(this)" id="file-input" type="file"
                                                           style="display: none"/>
                                                </span>
                            </div>
                            <!-- 输入框 -->
                            <div class="chatInput_input" id="chatInput_input_id" contenteditable="true">

                            </div>
                            <!--按钮-->
                            <div class="chatInput_button">
                                <!-- <div class="clo_se close">
                                    <i></i>
                                    <span>关闭</span>
                                </div> -->
                                <div class="clo_se send" id="sendButton">
                                    <i></i>
                                    <span>发送</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!--右边举报部分-->
            {{--            <div class="report">--}}
            {{--                <span class="report_list">举报栏：</span>--}}

            {{--                <label class="add" for="file-input1">--}}
            {{--                                    <img src="img/plus.png" alt="">--}}
            {{--                                    <form action="" method="post" id="uploadF" enctype="multipart/form-data">--}}
            {{--                                        <input id="file-input1" name="picture" type="file" style="display: none" />--}}
            {{--                                    </form>--}}
            {{--                                </label>--}}

            {{--                <div class="report_input">--}}
            {{--                    <textarea name="" cols="25" rows="10" placeholder="请输入举报信息......."></textarea>--}}
            {{--                </div>--}}
            {{--                <div class="report_button">--}}
            {{--                    <button>提交举报信息</button>--}}
            {{--                </div>--}}
            {{--            </div>--}}
        </div>
    </div>
</div>
<div id="img_frame">
    <div class="img_div"></div>
    <div class="hide-img">
        <img src="img/close.png"/>
    </div>
</div>
</body>
<script>
    let Ok = new window.kscreenshot({
        key: 65,
        endCB: function (data) {
            let img = document.createElement('img');
            let Oin = document.getElementById('chatInput_input_id');
            img.src = data;
            Oin.appendChild(img);
        },
        cancelCB: function () {
            return false;
        }
    });

    function on() {
        Ok.startScreenShot()
    }

    //选择图片
    const oinput = document.getElementById('chatInput_input_id');
    const oAdd = document.getElementsByClassName('add')[0];
    const oLable = document.getElementsByClassName('add_lable')[0];

    function selectImage(file) {
        if (!file.files || !file.files[0] || file.files[0].type.indexOf('image') == -1) {
            alert('请选择图片！');
            return;
        } else if (file.files[0].size > 1000000) {
            alert('图片太大！');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (evt) {
            let img = document.createElement('img');
            img.src = evt.target.result;
            oinput.appendChild(img);
            evt.target.result = null;
        };
        reader.readAsDataURL(file.files[0]);
        file.outerHTML = file.outerHTML;
    }

    // 举报栏选择图片
    function selectImage1(file) {
        oLable.setAttribute('style', 'display : none');
        if (!file.files || !file.files[0]) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function (evt) {
            let img = document.createElement('img');
            img.src = evt.target.result;
            oAdd.appendChild(img);
            evt.target.result = null;
        }
        reader.readAsDataURL(file.files[0]);
        file.outerHTML = file.outerHTML;
    }

    document.onkeydown = function (event) {
        let e = event || window.event;
        if (e && e.keyCode === 13) {
            e.preventDefault();
            $('#sendButton').click();
        }
    };
</script>

</html>