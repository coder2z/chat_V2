$(function () {
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });

  layui.use("layer", function () {
    var layer = layui.layer;

    // 基础请求地址
    var baseURL = "..";
    var defaultUrl = "testUrl";
    // nav页面跳转
    $(".nav-item").click(function () {
      if (
        $(this)
        .find("span")
        .text() == "企业操作"
      ) {
        window.location.href = "/admin/companyOperate";
      } else if (
        $(this)
        .find("span")
        .text() == "客服管理"
      ) {
        window.location.href = "/admin/serviceManage";
      } else if (
        $(this)
        .find("span")
        .text() == "问题内容管理"
      ) {
        window.location.href = "/admin/materialEdit";
      } else if (
        $(this)
        .find("span")
        .text() == "个人账号管理"
      ) {
        window.location.href = "/admin/personalAccount";
      } else {
        window.location.href = "/admin/otherSetting";
      }
    });
    //-----------------------------登陆注册--------------------------


    //点击改变验证码
    $("#verification-img").click(function () {
      $.ajax({
        type: "get",
        url: baseURL + "/image_captcha",
        success: function (data) {
          $("#verification-img").attr('src',data.url);
        },
        error: function (error) {
          layer.msg("获取验证码失败！");
        }
      });
    });
    // 点击登陆页面
    $(".index-content-form-submit-login").click(function () {
      var MSG = '';
      // 手机号验证
      let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!telStr.test($('#phone-number-id').val())) {
        MSG = " 手机号 ";
      }
      // 密码验证
      let passwordStr = /^[a-z0-9]+$/i;
      if($("#password-id").val().length<6){
        layer.msg("密码长度必须为6-16位");
        return;
      }
      if (!passwordStr.test($("#password-id").val())) {
        MSG += " 密码 ";

      }
      if ($("#verification-id").val()=='') {
        MSG += " 验证码 ";
      }
      if (!telStr.test($("#phone-number-id").val()) || !passwordStr.test($('#password-id').val())) {
        layer.msg("请正确输入" + MSG);
        return;
      }
      $.ajax({
        type: "post",
        url: baseURL + "/login",
        dataType: "json",
        data: {
          account: $("#phone-number-id").val(),
          password: $("#password-id").val(),
          url: $("#preUrl").val(),
          captcha:$("#verification-id").val(),
        },
        success: function (data) {
          if (data.code == 200) {
            if (data.data.url != null) {
              layer.msg("登录成功,正在跳转！");
              setTimeout(function () {
                window.location.href = data.data.url;
              }, 1500)
            } else {
              window.location.href = defaultUrl;
            }
          } else if (data.code == 100) {
            $.ajax({
              type: "get",
              url: baseURL + "/image_captcha",
              success: function (data) {
                $("#verification-img").attr('src',data.url);
              },
              error: function (error) {
                layer.msg("获取验证码失败！");
              }
            });
            layer.msg(data.msg);
          }
        },
        error: function (error) {
          layer.msg("登录失败！");
        }
      });
    });

    // 点击注册跳转
    $(".header-index-register").click(function () {
      window.location.href = "/register?companyUrl=" + $("#preUrl").val();
    });
    // 点击登陆跳转
    $(".header-index-logo").click(function () {
      window.location.href = "/login?companyUrl=" + $("#preUrl").val();
    });
    // 注册

    $(".index-content-form-submit").click(function () {
      let MSG = '';
      // 用户名验证
      let userStr = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!userStr.test($('#username-id').val())) {
        MSG += " 用户名 ";
      }
      // 手机号验证
      let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!telStr.test($('#phone-number-id').val())) {
         MSG += " 手机号 ";
      }
      // 密码验证
      let passwordStr = /^[a-z0-9]+$/i;
      if (!passwordStr.test($('#password-id').val())) {
          MSG += " 密码 ";
      }

      if (!userStr.test($("#username-id").val())||!telStr.test($('#phone-number-id').val())||!passwordStr.test($('#password-id').val())){
        layer.msg('请正确输入'+MSG);
        return;
      }
        $.ajax({
          type: "post",
          url: baseURL + "/register",
          dataType: "json",
          data: {
            cname: $("#username-id").val(),
            password: $("#password-id").val(),
            tel: $("#phone-number-id").val(),
            code: $("#verification-id").val(),
            url: $("#preUrl").val()
          },
          success: function(data) {
            if (data.code == 200) {
              layer.msg("注册成功，正在跳转！");
              setTimeout(function () {  
                window.location.href = "/login?companyUrl=" + $("#preUrl").val();
              },1500)
            }else{
              layer.msg(date.msg);
            }
          },
          error: function(error) {
            layer.msg("注册失败！");
          }
        });
    });

    // 获取验证码
    $(".is-verification").on("click", function () {
      // 手机号验证
      let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!telStr.test($("#phone-number-id").val())) {
        alert("请正确输入电话号码！");
        return;
      }

      $.ajax({
        type: "post",
        url: baseURL + "/getCaptcha",
        data: {
          tel: $("#phone-number-id").val(),
          type: 0
        },
        dataType: "json",
        success: function (data) {
          layer.msg(data.msg+",请在15分钟之内完成验证");
        }
      });
    });

    //-----------------------------登陆注册---end-----------------------

    // -------------------------------企业操作--------------- ------------

    // 返回企业操作主页面按钮
    $(".AM-container-addUser-return").click(function () {
      $(".AM-container-addUser").css("display", "none");
      $(".container-box").animate({
        height: "show"
      });
    });

    // 未审核返回操作主页面
    $(".AM-container-unchecked-return").click(function () {
      $(".AM-container-unchecked").css("display", "none");
      $(".container-box").animate({
        height: "show"
      });
    });

    // 禁用返回操作主页面
    $(".AM-container-ban-return").click(function () {
      $(".AM-container-ban").css("display", "none");
      $(".container-box").animate({
        height: "show"
      });
    });

    // 已审核返回操作主页面
    $(".AM-container-checked-return").click(function () {
      $(".AM-container-checked").css("display", "none");
      $(".container-box").animate({
        height: "show"
      });
    });

    // ---------------------------企业操作js end----------------------

    // --------------------------客服管理------------------------------

    // 查看客服是否禁用
    $(".SM-container-tbody-info input").click(function () {
      if (
        $(this)
        .parent()
        .prev()
        .text() == "禁用"
      ) {
        $(".SM-container-info").css("display", "none");
        $(".SM-container-ban").animate({
          height: "show"
        });
      } else {
        $(".SM-container-info").css("display", "none");
        $(".SM-container-normal").animate({
          height: "show"
        });
      }
    });

    // 正常页面按钮，返回客服信息页面
    $(".SM-container-normal-return").click(function () {
      $(".SM-container-normal").css("display", "none");
      $(".SM-container-info").animate({
        height: "show"
      });
    });

    // 禁用页面按钮，返回客服信息页面
    $(".SM-container-ban-return").click(function () {
      $(".SM-container-ban").css("display", "none");
      $(".SM-container-info").animate({
        height: "show"
      });
    });
    // 待审核页面按钮，返回客服信息页面
    $(".SM-container-audit-return").click(function () {
      $(".SM-container-audit").css("display", "none");
      $(".SM-container-info").animate({
        height: "show"
      });
    });

    //添加客服页面返回客服信息页面
    skipPage(
      ".SM-container-add-return",
      ".SM-container-addService",
      ".SM-container-info"
    );

    // --------------------------客服管理---end-----------------------------

    //---------------------------------问题内容管理-----------------------
    //table选项卡
    $(".ME-container-sidebar span").click(function () {
      if ($(this).text() == "方法/步骤") {
        $(".ME-container-sidebar span").each(function (index, item) {
          $(this).css("background", "rgba(255, 255, 255, 1)");
          $(this).css("color", "#000");
        });
        $(".ME-container-intro-content").css("display", "none");
        $(".ME-container-wayStep-content").css("display", "block");
        $(".ME-container-notice-content").css("display", "none");

        $(this).css("background", "rgba(70, 159, 180, 1)");
        $(this).css("color", "rgba(255, 255, 255, 1)");
      } else if ($(this).text() == "注意事项") {
        $(".ME-container-sidebar span").each(function (index, item) {
          $(this).css("background", "rgba(255, 255, 255, 1)");
          $(this).css("color", "#000");
        });

        $(".ME-container-intro-content").css("display", "none");
        $(".ME-container-wayStep-content").css("display", "none");
        $(".ME-container-notice-content").css("display", "block");

        $(this).css("background", "rgba(70, 159, 180, 1)");
        $(this).css("color", "rgba(255, 255, 255, 1)");
      } else {
        // 把每个label颜色变为白底黑字
        $(".ME-container-sidebar span").each(function (index, item) {
          $(this).css("background", "rgba(255, 255, 255, 1)");
          $(this).css("color", "#000");
        });
        // 显示当前的content
        $(".ME-container-intro-content").css("display", "block");
        $(".ME-container-wayStep-content").css("display", "none");
        $(".ME-container-notice-content").css("display", "none");

        // 让当前点击的label颜色未蓝底白字
        $(this).css("background", "rgba(70, 159, 180, 1)");
        $(this).css("color", "rgba(255, 255, 255, 1)");
      }
    });

    // 简介返回内容管理主页面
    skipPage(
      ".ME-container-content-button input:nth-of-type(4)",
      ".ME-container-intro-unchecked",
      ".ME-container-main"
    );

    // 页面跳转函数
    function skipPage(thisLabel, thisPage, skipPage) {
      $(thisLabel).click(function () {
        $(thisPage).css("display", "none");
        $(skipPage).animate({
          height: "show"
        });
      });
    }
  });
})