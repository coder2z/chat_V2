 $(function () { 
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  }); 
    var baseURL = '..';
    // 跳转到页面详情页
    //  取问题id函数
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }

    // var question_id = getQueryString('questionID');
    var src = window.location.pathname;
    src = src.substr(10);
    var question_id = src;
    // 请求数据
    $.ajax({
      type: "post",
      async: false,
      url: baseURL + "/questions/detail",
      dataType: "json",
      data: {
        question_id: question_id
      },
      success: function (data) {
        if (data.code == 200) {
          let intro = JSON.parse(data.data[0].intro);
          let method = JSON.parse(data.data[0].methed);
          let careful = JSON.parse(data.data[0].careful);

          // 标题
          $('.preview-content-container-intro-title').text(data.data[0].title);
          // 简介
          $('.preview-content-container-intro-content').text(intro.jianjietext);
          //简介图片
          $('.preview-content-container-intro-img img').attr('src', intro.jianimg);
          // 方法步骤
          $('.preview-content-container-method-list').empty();
          $(method.content).each(function (index, item) {



            // 预览
            var $previewStr = `<div class="preview-content-container-method-item">
              <span>${index + 1}</span>
              <div class="preview-content-container-method-item-content">
                <p>${item.way}</p>
                <img src="${item.img}" alt="">
              </div>
            </div> `

            $('.preview-content-container-method-list').append($previewStr);
          })

          //注意事项
          $('.container-notice-content-data').empty();
          $('.preview-content-container-careful-list').empty();
          $(careful.content).each(function (index, item) {

            var $previewCarefulStr = `<div class="preview-content-container-careful-item">
                <span></span>
                <div>${item}</div>
              </div>`

            $('.preview-content-container-careful-list').append($previewCarefulStr);

          })


        }
      },
      error: function (xhr) {
        console.log(xhr);
      }
    });

 })