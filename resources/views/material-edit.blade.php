<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>管理员已登陆</title>
  <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/material-edit.css">
  <script type="text/javascript" src="../js/jquery.js"></script>
  <script src="../js/material-edit.js"></script>
  <script src="../js/js.js"></script>
  <script src="../layui/layui.js"></script>
  <link rel="stylesheet" href="../layui/css/layui.css">
</head>

<body>
  <div class="index">
    <!--头部-->
    <div class="header">
      <a href="../loginOut">
        << 退出</a> <a class="header-index-logo">
          <img src="../img/管理员.png" alt="">
          <div class="header-index-info">
            <span>{{$userName}}</span>
            <span>管理员</span>
            <span>欢迎登陆！</span>
          </div>
      </a>
    </div>
    <!--头部end-->
    <!--主体内容-->
    <div class="content">
      <div class="container">
        <div class="nav">
          <div class="nav-item"><span>企业操作</span></div>
          <div class="nav-item"><span>客服管理</span></div>
          <div class="nav-item"><span style="color: #fff;">问题内容管理</span></div>
          <div class="nav-item"><span>个人账号管理</span></div>
          <div class="nav-item"><span>其他通用操作</span></div>
        </div>

        <!-- 问答内容管理中间主体部分 -->
        <div class="ME-container-box">

          <!-- 问答内容管理主页 -->
          <div class="ME-container-main">
            <div class="ME-container-search">
              <input class="ME-container-search-input" placeholder="搜索问题" type="text">
              <input class="ME-container-search-button" type="button" value="搜索">
            </div>
            <div class="ME-container-table">
              <table width="900">
                <thead class="ME-container-thead">
                  <tr>
                    <td>ID</td>
                    <td>标题</td>
                    <td>作者</td>
                    <td>提交时间</td>
                    <td>审核时间</td>
                    <td>状态</td>
                    <td>操作</td>
                  </tr>
                </thead>
                <tbody class="ME-container-tbody">
                 
                </tbody>
              </table>
            </div>

            <div class="ME-container-page">
              <div class="ME-container-page-info">
                <button>上一页</button>
                <input class="ME-container-page-info-firstPage" type="button" value="1">
                <input class="ME-container-page-info-more" type="button" value="...">
                <div class="ME-container-page-info-changePage">
                  <input type="text">/
                  <span></span>页
                </div>
                <button>下一页</button>
              </div>
            </div>
          </div>
          <!-- 问答内容管理主页 end -->

          <div class="ME-container-intro-unchecked" style="display: none">
            <div class="ME-container-sidebar">
              <span>简介</span>
              <span>方法/步骤</span>
              <span>注意事项</span>
            </div>

            <!-- 简介 -->
            <div class="ME-container-intro-content">
              <div class="ME-container-intro-content-data">
                标题<input class="ME-container-intro-content-data-title" placeholder="请输入标题" type="text">
                简介<textarea class="ME-container-intro-content-data-intro" placeholder="点击输入简介" name="" id="" cols="30"
                  rows="10"></textarea>
              </div>
              <div class="ME-container-intro-content-img">
                <img src="../img/pushImg.png" alt="图片">
              </div>

            </div>

            <!-- 方法与步骤 -->
            <div class="ME-container-wayStep-content" style="display: none;">
              <!-- 中间主体内容 -->
              <div class="ME-container-wayStep-content-data">
<!-- 
                <div class="ME-container-wayStep-content-data-item">
                  <span>2</span>
                  <textarea placeholder="点击输入方法或步骤" name="" id="" cols="30" rows="10"></textarea>
                  <div class="ME-container-wayStep-content-data-item-img">
                  </div>
                  <div class="ME-container-wayStep-content-data-item-button">
                    <button onmousemove="addDrag(this)" onmouseout="removeDrag(this)">x</button>
                    <button>-</button>
                    <button>+</button>
                  </div>
                </div> -->


              </div>

            </div>
            <!-- 方法与步骤  end -->

            <!-- 注意事项 -->
            <div class="ME-container-notice-content" style="display: none;">
 
              <!-- 中间主体内容 -->
              <div class="ME-container-notice-content-data">
                <!-- <div class="ME-container-notice-content-data-item">
                  <span></span>
                  <input class="ME-container-notice-content-data-item-careful" type="text" placeholder="点击输入方法或步骤">
                  <div>x</div>
                </div> -->
              </div>
              <div class="ME-container-content-button">
                <input type="button" value="审核通过">
                <input class="ME-container-content-button-preview" type="button" value="预览">
                <input type="button" value="删除">
                <input type="button" value="取消">
              </div>
            </div>
            <!-- 注意事项  end -->

          </div>

        </div>
        <!-- 客服操作中间主体部分end -->
      </div>
    </div>
    <!--主体内容end-->
  </div>
</body>

<script>
  // 方法与步骤div拖动

  // div拖动
  var columns = document.querySelectorAll('.ME-container-wayStep-content-data-item');
  var dragEl = null;
  var textareaNew = '';
  var textareaOld = '';
  [].forEach.call(columns, function (column) {

    // 开始拖拽
    column.addEventListener("dragstart", domdrugstart, false);
    // 进入目标元素
    column.addEventListener('dragenter', domdrugenter, false);
    //在目标上移动
    column.addEventListener('dragover', domdrugover, false);
    //离开目标元素
    column.addEventListener('dragleave', domdrugleave, false);
    //是在目标元素上的方法，拖拽中
    column.addEventListener('drop', domdrop, false);
    // 拖拽结束
    column.addEventListener('dragend', domdrapend, false);

  });
  // 开始拖拽
  function domdrugstart(e) {

    e.target.style.opacity = '0.8';
    dragEl = this;

    textareaNew = $(e.target).find('textarea').val();

    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function domdrugenter(e) {


    if ($(e.target).parent().attr('class') == 'ME-container-wayStep-content-data-item-button') {

      textareaOld = $(e.target).parent().parent().find('textarea').val();
    } else if (e.target.getAttribute('clos') == '30') {

      textareaOld = $(e.target).parent().find('textarea').val();
    } else if (e.target.getAttribute('class') == 'ME-container-wayStep-content-data-item-img') {

      textareaOld = $(e.target).parent().find('textarea').val();
    } else if (e.target.getAttribute('class') == 'ME-container-wayStep-content-data-item') {
      e.target.classList.add('over');
      textareaOld = $(e.target).find('textarea').val();
    }

  }

  function domdrugover(e) {

    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function domdrugleave(e) {
    e.target.classList.remove('over');
  }

  function domdrop(e) {

    if (e.stopPropagation) {
      e.stopPropagation();
    }
    // 位置互换 
    if (dragEl != this) {
      console.log(dragEl);

      dragEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      this.firstElementChild.nextElementSibling.value = textareaNew;
      dragEl.firstElementChild.nextElementSibling.value = textareaOld;

    }
    return false;

  }

  function domdrapend(e) {

    [].forEach.call(columns, function (column) {
      column.classList.remove('over');
      column.style.opacity = '1';
    });

  }

  function addDrag(e) {
    e.parentNode.parentNode.setAttribute('draggable', 'true');
  }

  function removeDrag(e) {
    e.parentNode.parentNode.setAttribute('draggable', 'false');
  }
</script>

</html>