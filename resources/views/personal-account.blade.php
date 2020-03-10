<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>管理员已登陆</title>
  <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/personal-account.css">
  <script type="text/javascript" src="../js/jquery.js"></script>
  <script src="../js/personal-account.js"></script>
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
          <div class="nav-item"><span>问题内容管理</span></div>
          <div class="nav-item"><span style="color: #fff;">个人账号管理</span></div>
          <div class="nav-item"><span>其他通用操作</span></div>
        </div>
        <!-- 个人账号中间主体部分 -->
        <div class="PA-container-box">
          <div class="PA-container-main">
            <div class="PA-container-search">
              <input class="PA-container-search-input" placeholder="搜索用户" type="text">
              <input class="PA-container-search-button" type="button" value="搜索">
              <input type="button" value="添加" class="PA-container-add-button">
            </div>
            <div class="PA-container-table">
              <table width="900">
                <thead class="PA-container-thead">
                  <tr>
                    <td>ID</td>
                    <td>用户名</td>
                    <td>姓名</td>
                    <td>手机号</td>
                    <td>审核时间</td>
                    <td>状态</td>
                    <td>操作</td>
                  </tr>
                </thead>
                <tbody class="PA-container-tbody">

                </tbody>
              </table>
            </div>

            <div class="PA-container-page">
              <div class="PA-container-page-info">
                <button>上一页</button>
                <input class="PA-container-page-info-firstPage" type="button" value="1">
                <input style="display: none" class="PA-container-page-info-secondPage" type="button" value="2">
                <input style="display: none" class="PA-container-page-info-thirdPage" type="button" value="3">
                <input class="PA-container-page-info-more" type="button" value="...">
                <div class="PA-container-page-info-changePage">
                  <input type="text">/
                  <span></span>页
                </div>
                <button>下一页</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 个人账号中间主体部分end -->

        <!-- 个人账号添加 -->
        <div class="PA-container-add" style="display: none">
          <div class="PA-container-add-return">返回</div>
          <div class="PA-container-add-form">
            <form action="#">
              <div class="PA-container-addUser-form-input-box">
                <img src="../img/alert.png" alt="">
                请正确输入客户名！
              </div>
              <div class="PA-container-addUser-form-input-box">
                <img src="../img/alert.png" alt="">
                请正确输入电话！
              </div>
              <div class="PA-container-addUser-form-input-box">
                <img src="../img/alert.png" alt="">
                请正确输入密码！
              </div>
              <div class="PA-container-addUser-form-input-box">
                <img src="../img/alert.png" alt="">
                请保持密码一致！
              </div>
              
              <div class="PA-container-add-form-input">
                <label for="PA-container-add-form-name">姓名：</label>
                <input type="text" id="PA-container-add-form-name">
              </div>
              <div class="PA-container-add-form-input">
                <label for="PA-container-add-form-password">密码：</label>
                <input type="text" id="PA-container-add-form-password">
              </div>
              <div class="PA-container-add-form-input">
                <label for="PA-container-add-form-phoneNumber">手机号码：</label>
                <input type="text" id="PA-container-add-form-phoneNumber">
              </div>
              <div class="PA-container-add-form-input">
                <label for="PA-container-add-form-confirmPassword">确认密码：</label>
                <input type="text" id="PA-container-add-form-confirmPassword">
              </div>
              <!-- 提交按钮 -->
              <div class="PA-container-add-form-button">
                <input type="button" value="取消">
                <input type="button" value="确认">
              </div>

            </form>
          </div>
        </div>
        <!-- 个人账号添加 end -->

      </div>
    </div>
    <!--主体内容end-->
  </div>
</body>

</html>