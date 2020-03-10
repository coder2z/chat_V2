$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
var nowUserId = null;
var nowSerId = null;
nowUserId = $(this).find('div').find('img').attr('alt');
nowSerId = $(".welcome").attr('id');

 layui.use("layer", function () {
    var layer = layui.layer;

    $(function() {
      // 删除中间标签
      $(".serviceName_content").removeClass("serviceName_active");
      $(".chat_contents").css("display", "none");
      // 字体
      //字体选择框淡入淡出
      $(".chatInput_function_img1").click(function() {
        if ($(".chatInput_function_img2_content").css("display") === "block") {
          $(".chatInput_function_img2_content").css("display", "none");
        }
        $(".font_size_choice").fadeToggle();
      });
      //字体大小选择
      function sizeChoice(a, b, c) {
        $(a).click(function() {
          $(".chatInput_input").css(b, c);
        });
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
      // 表情包
      $(".chatInput_function_img2").click(function() {
        if ($(".font_size_choice").css("display") === "block") {
          $(".font_size_choice").css("display", "none");
        }
        $(".chatInput_function_img2_content").fadeToggle();
      });
      //字体选择/表情包互相切换
      $(".chatInput_function_img2_content li").click(function() {
        var img = $(this)
          .find("img")
          .clone();
        img.appendTo(".chatInput_input");
        img.css("width", "20px");
        img.css("padding-right", "5px");
      });
      //发送键点击
      $("#sendButton").click(function() {
        $(".chatContent_div").animate(
          {
            scrollTop: 10000000000000
          },
          0
        );
      });
      //图片放大
      $(".chatInput_input").on("dblclick", "img", function() {
        var a = $(this).attr("src");
        $(".img_div").css("background-image", "url(" + a + ")");
        $("#img_frame").css("display", "block");
      });
      $(".chatContent_div").on("dblclick", "img", function() {
        var a = $(this).attr("src");
        $(".img_div").css("background-image", "url(" + a + ")");
        $("#img_frame").css("display", "block");
      });
      //隐藏图片框
      $(".hide-img").click(function() {
        $("#img_frame").css("display", "none");
      });
      $("#img_frame").dblclick(function() {
        $(this).css("display", "none");
      });

      //添加图片
      $(".add").click(function() {
        selectImage($(this));
      });

      function selectImage(file) {
        if (!file.files || !file.files[0]) {
          return;
        }
        var reader = new FileReader();
        reader.onload = function(evt) {
          var img = document.createElement("img");
          img.src = evt.target.result;
          $(".add").appendChild(img);
          evt.target.result = null;
        };
        reader.readAsDataURL(file.files[0]);
        file.outerHTML = file.outerHTML;
      }

      //加载列表
      $.ajax({
        type: "get",
        url: "/Service/getUser",
        data: "",
        dataType: "json",
        success: function(Data) {
          switch (Data.code) {
            case 200:
              let length = Data.data.length;
              let useData = Data.data;
              let html = "";
              for (var i = 0; i < length; i++) {
                var noread = "";
                if (useData[i].noread) {
                  noread = ` <div class="notRead">
                        <span>${useData[i].noread}</span>
                    </div>`;
                }
                html += `<div class="serviceName_content">
                        <div class="serviceName_content_hand">
                            <img src="/img/handPortrail_02.jpg" alt="${useData[i].fromid}">
                            </div>
                            <div class="serviceName_content_name">
                            <a>${useData[i].fromname} </a>
                            </div>
                             ${noread}
                            </div>`;
              }
              $("#userList").html(html);
              $(".serviceName_content").click(function() {
                $(".chat_content_info").css("display", "none");
                $(".chat_contents").css("display", "block");
                $(".chatContent_div").animate(
                  {
                    scrollTop: 10000000000000
                  },
                  500
                );
              });
          }
        },
        complete: function() {
          bindActive();
        }
      });
      var serId = $(".welcome").attr("id");
      var serName = $(".welcome")
        .find("span")
        .attr("alt");
      
    
      var ws = new WebSocket("ws://" + document.domain + ":8282");
      ws.onerror = function(e) {
          layer.msg('服务器连接错误');
      };
      ws.onopen = function(e) {
        $("#sendButton").click(function() {
          let inputValue = $(".chatInput_input")
            .html()
            .replace(/&nbsp;/g, "");
          if (inputValue == "") {
            alert("不为空！");
            return;
          }
          var userId = $(".serviceName_active")
            .find("div")
            .find("img")
            .attr("alt");
          var userName = $(".serviceName_active")
            .find("div")
            .eq(1)
            .find("a")
            .html();
          var str = inputValue.replace(/(^\s*)|(\s*$)/g, ""); //去除空格;
          str = str.replace(/"/g, "'");
          if (str != "") {
            var message =
              '{"data":"' +
              str +
              '","type":"say","fromId":"' +
              serId +
              '","toId":"' +
              userId +
              '","fromName":"' +
              serName +
              '","toName":"' +
              userName +
              '"}';
            let html = `<div class="robot">
                <div class="robot_hand">
                <div class="robot_hand_pic"></div>
                </div>
                <div class="robot_chat">
                <i></i>
                <div>${str}</div>
                </div>
                </div>`;
            if (isJsonString(message)) {
              $("#h_chat_content").append(html);
              ws.send(message);
              save_message(eval("(" + message + ")"));
              $(".chatInput_input").html("");
            } else {
              alert("输入格式错误！");
            }
          } else {
            $(".chatInput_input").html("");
          }
          $(".chatContent_div").animate(
            {
              scrollTop: 10000000000000
            },
            0
          );
        });
        ws.onmessage = function(e) {
          var message = eval("(" + e.data + ")");
          switch (message.type) {
            case "init":
              var bind = '{"fromid":"' + serId + '","type":"bind"}';
              ws.send(bind);
              break;
            case "text":
              let active = $(".serviceName_active");
              if (active) {
                let temp = active
                  .find("div")
                  .find("img")
                  .attr("alt");
                if (temp == message.fromId) {
                  $("#h_chat_content")
                    .append(`<div class="service_person"><div class="service_person_hand">
                                <img src="img/handPortrail_03.jpg" alt=${message.fromid}>
                                </div> <div class="service_person_chat"><i></i><div>${message.data}</div></div></div>`);
                }
              }
              getNoread(message.fromId);
              break;
          }
          $(".chatContent_div").animate(
            {
              scrollTop: 10000000000000
            },
            0
          );
        };
      };
    });

    function save_message(message) {
      $.ajax({
        type: "post",
        url: "/Service/inputContent",
        data: message,
        dataType: "json"
      });
    }

    function bindActive() {
      $(".serviceName .serviceName_content").click(function() {
        nowUserId = $(this)
          .find("div")
          .find("img")
          .attr("alt");
        nowSerId = $(".welcome").attr("id");
        var userId = $(this)
          .find("div")
          .find("img")
          .attr("alt");
        let noRead = $(this)
          .find("div")
          .eq(2);
        $(this)
          .addClass("serviceName_active")
          .siblings()
          .removeClass("serviceName_active");
        if (noRead) {
          noRead.remove();
        }
        $.ajax({
          type: "get",
          url: "/Service/getContent",
          data: {
            userId: userId
          },
          dataType: "json",
          success: function(Data) {
            switch (Data.code) {
              case 200:
                //清楚缓存
                $("#h_chat_content").html("");
                var length = Data.data.length;
                var useData = Data.data;
                for (var i = 0; i < length; i++) {
                  if (useData[i].fromid == userId) {
                    $("#h_chat_content")
                      .append(`<div class="service_person"><div class="service_person_hand">
                                    <img src="img/handPortrail_03.jpg" alt="">
                                </div> <div class="service_person_chat"><i></i><div>${useData[i].content}</div>
                                </div>
                            </div>`);
                  } else {
                    $("#h_chat_content")
                      .append(`<div class="robot"><div class="robot_hand">
                                    <div class="robot_hand_pic"></div>
                                </div> <div class="robot_chat"><i></i><div>${useData[i].content}</div>
                                </div>
                            </div>`);
                  }
                }
            }
          }
        });
      });
    }

    function getNoread(messageId) {
      let active = $(".serviceName_active");
      if (active) {
        let temp = active
          .find("div")
          .find("img")
          .attr("alt");
        if (temp != messageId) {
          $.ajax({
            type: "get",
            url: "/Service/getUser",
            data: "",
            dataType: "json",
            success: function(Data) {
              let useData = Data.data;
              let noActive = $(".serviceName_content");
              let noRead = 0;
              for (let i = 0; i < useData.length; i++) {
                if (useData[i].fromid == messageId) {
                  noRead = useData[i].noread;
                }
              }
              for (let i = 0; i < noActive.length; i++) {
                if (
                  noActive
                    .eq(i)
                    .find("div")
                    .find("img")
                    .attr("alt") == messageId
                ) {
                  noActive
                    .eq(i)
                    .find("div")
                    .eq(2)
                    .remove();
                  noActive.eq(i).append(` <div class="notRead">
                        <span>${noRead}</span>
                    </div>`);
                  return;
                }
              }
            }
          });
        } else {
          isRead(messageId);
        }
      }
    }

    function isRead(userId) {
      $.ajax({
        type: "get",
        url: "/Service/isRead",
        data: {
          userId: userId
        },
        dataType: "json"
      });
    }

    function isJsonString(str) {
      try {
        if (typeof JSON.parse(str) == "object") {
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return false;
    }

    // 点击添加图片
    $(document).on("change", "#file-input1", function(e) {
      console.log("aa");
      var form = document.getElementById("uploadF");
      formData = new FormData(form);
      $.ajax({
        type: "post",
        url: "../picture/updatepicture",
        data: formData,
        datatype: "json",
        cache: false,
        traditional: true,
        contentType: false,
        processData: false,
        success: function(data) {
          if (data.code == 200) {
            $(".add>img").attr("src", "../" + data.data);
          } else {
          }
        },
        error: function() {
          alert("添加图片失败！");
        }
      });
    });
    // 点击提交
    $(document).on("click", ".report_button button", function() {
      if (
        $(".add>img").attr("src") != "" &&
        
        $(".report_input textarea").val() != ""
      ) {
        $.ajax({
          type: "post",
          url: "../services/uploadBlackList",
          data: {
            personId: nowUserId,
            imgUrl: $(".add>img").attr("src"),
            content: $(".report_input textarea").val(),
            serviceId: nowSerId
          },
          datatype: "json",
          success: function(data) {
            if (data.code == 200) {
              layer.msg("举报成功！");
$(".add>img").attr("src", "../img/plus.png");
$(".report_input textarea").val('')

            } else {
            }
          },
          error: function() {
            layer.msg("举报失败！");
          }
        });
      } else {
        layer.msg("请输入举报信息！");
      }
    });
 })