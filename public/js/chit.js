$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('body,html').animate({scrollTop: 100}, 0);
    //字体选择框淡入淡出
    $(".index_type .fonts").click(function () {
        $(".chatInput_function_img2_content").css("display", "none");
        $(".font_size_choice").fadeToggle();
    });
    //字体大小选择
    function sizeChoice(a, b, c) {
        $(a).click(function () {
            $(".index_text").css(b, c);
        })
    }
    sizeChoice(".12px", "font-size", "12px");
    sizeChoice(".13px", "font-size", "13px");
    sizeChoice(".14px", "font-size", "14px");
    sizeChoice(".15px", "font-size", "15px");
    sizeChoice(".16px", "font-size", "16px");
    //字体粗细
    sizeChoice(".200bold", "font-weight", 200);
    sizeChoice(".300bold", "font-weight", 300);
    sizeChoice(".400bold", "font-weight", 400);
    sizeChoice(".500bold", "font-weight", 500);
    sizeChoice(".600bold", "font-weight", 600);
    //表情包代码
    $('.smile').click(function () {
        $(".font_size_choice").css("display", "none");
        $('.chatInput_function_img2_content').fadeToggle();
    });
    $('.chatInput_function_img2_content li').click(function () {
        var img = $(this).find('img').clone();
        img.appendTo('.index_text');
        img.css('width', '20px');
        img.css('margin-right', '2px');
    });
    //图片放大
    $('.index_text').on('dblclick', 'img', function () {
        var a = $(this).attr("src");
        $(".img_div").css("background-image", "url(" + a + ")");
        $("#img_frame").css("display", "block");
    });
    $('.index_dialog').on('dblclick', 'img', function () {
        var a = $(this).attr("src");
        $(".img_div").css("background-image", "url(" + a + ")");
        $("#img_frame").css("display", "block");
    });
    //聊天框点击
    $(".index_text").click(function () {
        $(".font_size_choice").css("display", "none");
        $(".chatInput_function_img2_content").css("display", "none");
    });
    //聊天界面点击
    $(".index_dialog").click(function () {
        $(".font_size_choice").css("display", "none");
        $(".chatInput_function_img2_content").css("display", "none");
    });
    //发送键点击
    $(".send").click(function () {
        $('.index_dialog').animate({scrollTop: 10000000000000}, 0);
    });
//隐藏图片框
    $(".hide-img").click(function () {
        $("#img_frame").css("display", "none");
    });
    $("#img_frame").dblclick(function () {
        $(this).css("display", "none");
    });
});

function send() {
    let userhtml = $(".index_text").html();
    let fsize = $(".index_text").css("font-size");
    let fweight = $(".index_text").css("font-weight");
    let $new = $('<div class="index_news_r">' +
        '<div class="index_news_img_r"><img src="img/ser.png" class="right-suer"/></div>' +
        '<div class="index_border_right"></div>' +
        '<div class="index_terr_r">' +
        '<div style="font-size:' + fsize + ';font-weight:' + fweight + '">' + userhtml + '</div>' +
        '</div>' +
        '</div>'
    );
    if (userhtml == '') {
        alert('不为空！');
        return;
    }
    $(".index_dialog").append($new);
    $(".index_text").empty();
    let url = '/RobotChat';
    $.ajax({
        type: "get",
        url: url,
        data: 'text=' + delHtmlTag(userhtml)+'&companyUrl=' + window.location.pathname,
        dataType: 'json',
        success: function (data) {
            if (data.code === 200) {
                var robot = data.data.answer;
                if(data.data.maybeQuesion===undefined){
                    var robot_ansower = `<div class="index_news">
                    <div class="index_news_img"><img src="img/ser.png" class="user-head"/></div>
                    <div class="index_border_left"></div>
                    <div class="index_terr">
                        <div onclick=''>${robot}</div>
                    </div>
                </div>`;
                }else{
                    let maybeQuesion = '';
                    data.data.maybeQuesion.forEach(function(i,j){
                        maybeQuesion += `<div onclick = "window.open('http://${data.data.answerList[j]}')">${i}</div><br>`;
                    });
                    var robot_ansower = `<div class="index_news">
                    <div class="index_news_img"><img src="img/ser.png" class="user-head"/></div>
                    <div class="index_border_left"></div>
                    <div class="index_terr">
                        <div onclick='window.open("http://${data.data.answerRightUrl}")'>${robot}</div>
                        <hr>
                        ${maybeQuesion}
                    </div>
                </div>`;
                }
                $(".index_dialog").append(robot_ansower);
                $('.index_dialog').animate({scrollTop: 10000000000000000000}, 0);
            } else if (data.code === 201) {
                $('#sendButton').removeAttr('onclick');
                $.getScript('js/customer.js');
            } else if (data.code === 202){
                alert('请点击右上角登陆后再使用人工客服！');
                // window.location = data.data;
            }
        },
        error: function () {
        }
    })
}
function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, "");
}

$(document).on("click",'.index_right_submit',function(){
   if($('.index_right-advice').val()!=''){
    $.ajax({
        type: "post",
        url: '../suggest',
        data: {
            suggestion:$('.index_right-advice').val(),
            companyId:$('#companyId').val(),
            personId:$('#userId').val(),
        },
        dataType: 'json',
        success: function (data) {
            if(data.code == 200){
                alert('反馈成功！');
                $('.index_right-advice').val('');
            }else if(data.code==100){
                alert(data.msg);
            }
        },
        error: function (error) {
            alert(error.msg);
        }
    })
   }else{
       alert('请输入');
   }
})

if ($("#userId").val() == '') {
    $(".head_left").css("display", "none");
  }else{
    $(".head_right_r").attr("href", "javascript:volid(0);");
  }