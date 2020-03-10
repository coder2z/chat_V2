<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>管理员已登陆</title>
  <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/other-setting.css">
  <script type="text/javascript" src="../js/jquery.js"></script>
  <script src="../js/other-setting.js"></script>
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
          <div class="nav-item"><span>个人账号管理</span></div>
          <div class="nav-item"><span style="color: #fff;">其他通用操作</span></div>
        </div>
        <!-- 其他设置中间主体部分 -->
        <div class="OS-container-box" >
          <div class="OS-container-box-top">
            <div class="OS-container-box-top-title">企业通用设置</div>
            <div class="OS-container-table">
              <table width="900">
                <thead class="OS-container-thead">
                  <tr>
                    <td>ID</td>
                    <td>企业名</td>
                    <td>手机号</td>
                    <td>审核时间</td>
                    <td>状态</td>
                    <td>操作</td>
                  </tr>
                </thead>
                <tbody class="OS-container-tbody">
                  <tr>
                    <td>1</td>
                    <td>腾讯</td>
                    <td>1801123153</td>
                    <td>2019-09-16</td>
                    <td>未审核</td>
                    <td>
                      <input type="button" value="设置">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="OS-container-page">
              <div class="OS-container-page-info">
                <button>上一页</button>
                <input class="OS-container-page-info-firstPage" type="button" value="1">
                <input class="OS-container-page-info-more" type="button" value="...">
                <div class="OS-container-page-info-changePage">
                  <input type="text">/
                  <span></span>页
                </div>
                <button>下一页</button>
              </div>
            </div>
          </div>
          <div class="OS-container-box-bottom">
            <div class="OS-container-box-bottom-title">系统通用设置</div>
            <div class="OS-container-box-bottom-content">
              <span>短信接口</span>
              <input type="text">
              <button>确认提交</button>
            </div>
          </div>

        </div>
        <!-- 其他设置中间主体部分end -->

        <!-- 其他设置详细设置 -->
        <div class="OS-container-detailedSet" style="display: none">
          <div class="OS-container-detailedSet-return">返回</div>
          <div class="OS-container-detailedSet-title">XXX企业通用设置</div>
          <div class="OS-container-detailedSet-content">
            <div class="OS-container-detailedSet-content-cover">
              <span>封面设置</span>
              <div class="OS-container-detailedSet-content-cover-img">
              </div>
            </div>
            <div class="OS-container-detailedSet-content-info">
              <span>页面描述文本内容设置</span>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>
          <div class="OS-container-detailedSet-button">
            <input type="reset" value="取消">
            <input type="submit" value="确认">
          </div>
        </div>

        <!-- 其他设置详细设置 end -->

      </div>
    </div>
    <!--主体内容end-->
  </div>
</body>

</html>