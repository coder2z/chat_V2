$(function () {
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });
  layui.use("layer", function () {
    var layer = layui.layer;

    //点击改变验证码
    $("#verification-img").click(function () {
      $.ajax({
        type: "get",
        url: "/image_captcha",
        success: function (data) {
          $("#verification-img").attr('src',data.url);
        },
        error: function (error) {
          layer.msg("获取验证码失败！");
        }
      });
    });

    $(".gain-yan").click(function () {
      let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!telStr.test($("#input1").val())) {
        layer.msg('请正确输入手机号！');
        return;
      }
      $.ajax({
        type: "post",
        url: "../getCaptcha",
        dataType: "json",
        data: {
          tel: $("#input1").val(),
          type: 1
        },
        success: function (data) {
          if(data.code == 100){
            layer.msg(data.msg);
          }
          if (data.code == 200) {
            layer.msg("验证码发送成功！");

            // 修改获取验证码Button的样式
                    $('.gain-yan').toggleClass("checkedNum")
                        .attr("disabled", "disabled");

                    // 修改完成Button样式
                    if ($('#input4').val() != "") {
                        $('.submitButton').removeClass("selectedButton")
                            .removeAttr("disabled");
                    } 

                    //倒计时方法 
                    let num = setInterval(checkNum, 1000);
                    let i = 60;

                    function checkNum() {
                        // 显示倒计时
                        $('.gain-yan').val("重新获取(" + i + ")");
                        i--;

                        if (i == -1) {
                            clearInterval(num);
                            // 更改获取验证码名字
                            $('.gain-yan').val("获取验证码");

                            // 移除获取状态下Button的样式
                            $('.gain-yan').toggleClass("checkedNum");
                            $('.gain-yan').removeAttr("disabled");

                            // 移除完成Button的被选样式
                            if ($(".input4").val() == "") {
                              $(".submitButton").toggleClass("selectedButton");
                              $(".submitButton").removeAttr("disabled");
                            }
                        }
                    };
          } 
        },
        error: function () {
          layer.msg("验证码发送失败！");
        }
      });
    });

    $(".new-word-submit").click(function (e) {

      let MSG = "";
      // 手机号验证
      let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!telStr.test($("#input1").val())) {
        MSG += " 手机号 ";
      }
      // 密码验证
      let passwordStr = /^[a-z0-9]+$/i;
      if (!passwordStr.test($("#input2").val())) {
        MSG += " 密码 ";
      }

        if ($("#input4").val()=='') {
          MSG += " 短信验证码 ";
        }
      if ($("#input5").val() == "") {
        MSG += " 验证码 ";
      }
           
      if (
        !telStr.test($("#input1").val()) ||
        !passwordStr.test($("#input2").val()) ||
        $("#input4").val() == "" ||
        $("#input5").val() == ""
      ) {
        layer.msg("请正确输入" + MSG);
        return;
      }
      if ($("#input3").val() != $("#input2").val()) {
        layer.msg("密码不一致！");
        return;
      }

      $.ajax({
        type: "post",
        url: "../uploadPassword",
        dataType: "json",
        data: {
          tel: $("#input1").val(),
          code: $("#input4").val(),
          newPassword: $("#input2").val(),
          captcha: $("#input5").val()
        },
        success: function(data) {

          if (data.code == 200) {
            layer.msg("修改成功，正在跳转！");
            setTimeout(function() {
              window.location.href = $("#preUrl").val();
            }, 1500);
          } else if (data.code == 100) {
            layer.msg(data.msg);
          } else {
            layer.msg("修改失败！");
          }
        },
        error: function(error) {
          console.log(error);
          if (error.responseJSON.code == 100) {
            layer.msg(error.responseJSON.msg);
          }
        }
      });
    });
  });

});