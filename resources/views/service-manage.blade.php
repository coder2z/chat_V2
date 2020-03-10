<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>管理员已登陆</title>
  <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/service-management.css">
  <script type="text/javascript" src="../js/jquery.js"></script>
  <script src="../js/service-manage.js"></script>
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
          <div class="nav-item"><span style="color: #fff;">客服管理</span></div>
          <div class="nav-item"><span>问题内容管理</span></div>
          <div class="nav-item"><span>个人账号管理</span></div>
          <div class="nav-item"><span>其他通用操作</span></div>
        </div>

        <!-- 客服操作中间主体部分 -->
        <div class="SM-container-box">
          <div class="SM-container-search">
            <input class="SM-container-search-input" placeholder="选择企业" type="text">
            <input class="SM-container-search-button" type="button" value="搜索">
          </div>
          <div class="SM-container-table">
            <table width="900">
              <thead class="SM-container-thead">
                <tr>
                  <td>ID</td>
                  <td>企业名</td>
                  <td>手机号</td>
                  <td>审核时间</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody class="SM-container-tbody">
              </tbody>
            </table>
          </div>
          <div class="SM-container-page">
            <div class="SM-container-page-info">
              <button>上一页</button>
              <input class="SM-container-page-info-firstPage" type="button" value="1">
               <input style="display: none" class="SM-container-page-info-secondPage" type="button" value="2">
               <input style="display: none" class="SM-container-page-info-thirdPage" type="button" value="3">
              <input class="SM-container-page-info-more" type="button" value="...">
              <div class="SM-container-page-info-changePage">
                <input type="text">/
                <span></span>页
              </div>
              <button>下一页</button>
            </div>
          </div>
        </div>
        <!-- 客服操作中间主体部分end -->

        <!-- 客服基础信息 -->
        <div class="SM-container-info">
          <button class="SM-container-info-return">返回</button>
          <div class="SM-container-info-title">XXX公司客服管理</div>
          <input class="SM-container-info-button" type="button" value="添加客服">
          <div class="SM-container-table-info">
            <table width="900">
              <thead class="SM-container-thead-info">
                <tr>
                  <td>ID</td>
                  <td>客服名</td>
                  <td>客服手机</td>
                  <td>客服加入时间</td>
                  <td>状态</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody class="SM-container-tbody-info">

              </tbody>
            </table>
          </div>

          <div class="SM-container-page">
            <div class="SM-container-page-info-service">
              <button class="SM-container-page-info-nextPage-service">上一页</button>
              <input class="SM-container-page-info-firstPage" type="button" value="1">
              <input style="display: none" class="SM-container-page-info-secondPage-service" type="button" value="2">
              <input style="display: none" class="SM-container-page-info-thirdPage-service" type="button" value="3">
              <input class="SM-container-page-info-more-service" type="button" value="...">
              <div class="SM-container-page-info-changePage-service">
                <input type="text">/
                <span></span>页
              </div>
              <button class="SM-container-page-info-lastPage-service">下一页</button>
            </div>
          </div>
        </div>
        <!-- 基础客服信息end -->

        <!-- 客服启用-->
        <div class="SM-container-normal">
          <button class="SM-container-normal-return">返回</button>
          <span class="SM-container-is-ban-status">状态：已启用</span>
          <div class="SM-container-title">XXX公司账号</div>
          <!-- form表单 -->
          <form action="#" class="SM-container-form">
            <div class="SM-container-form-left">
              <div class="SM-container-is-ban-form-name">
                <div>客服名：</div>
                <div>客服电话：</div>
                <div>客服所属公司：</div>
              </div>
              <div class="SM-container-is-ban-form-input">
                <input readonly type="text">
                <input readonly type="text">
                <input readonly type="text">
              </div>
            </div>

            <div class="SM-container-form-bottom">
              <button type="button" class="SM-container-form-bottom-audit-delete">删除客服</button>
              <button type="button" class="SM-container-form-bottom-audit-ban">禁用客服</button>
            </div>
          </form>
        </div>
        <!-- 客服启用end -->

        <!-- 客服禁用 -->
        <div class="SM-container-ban">
          <button class="SM-container-ban-return">返回</button>
          <span class="SM-container-is-ban-status">状态：已禁用</span>
          <div class="SM-container-title">XXX客服</div>
          <!-- form表单 -->
          <form action="#" class="SM-container-form">
            <div class="SM-container-form-left">
              <div class="SM-container-is-ban-form-name">
                <div>客服名：</div>
                <div>客服电话：</div>
                <div>客服所属公司：</div>
              </div>
              <div class="SM-container-is-ban-form-input">
                <input readonly type="text">
                <input readonly type="text">
                <input readonly type="text">
              </div>
            </div>
            <div class="SM-container-form-bottom">
              <button type="button" class="SM-container-form-bottom-ban-use">启用客服</button>
              <button type="button" class="SM-container-form-bottom-ban-delete">删除客服</button>

            </div>
          </form>
        </div>
        <!-- 客服禁用end -->

        <!-- 客服待审核 -->
        <div class="SM-container-audit">
          <button class="SM-container-audit-return">返回</button>
          <span class="SM-container-is-ban-status">状态：待审核</span>
          <div class="SM-container-title">XXX客服</div>
          <!-- form表单 -->
          <form action="#" class="SM-container-form">
            <div class="SM-container-form-left">
              <div class="SM-container-is-ban-form-name">
                <div>客服名：</div>
                <div>客服电话：</div>
                <div>客服所属公司：</div>
              </div>
              <div class="SM-container-is-ban-form-input">
                <input readonly type="text">
                <input readonly type="text">
                <input readonly type="text">
              </div>
            </div>
 
            <div class="SM-container-form-bottom">
              <button type="button" class="SM-container-form-bottom-audit-use">审核通过</button>
              <button type="button" class="SM-container-form-bottom-audit-ban">禁用客服</button>

            </div>
          </form>
        </div>
        <!-- 客服待审核end -->

        <!-- 客服添加 -->
        <div class="SM-container-addService">
          <button class="SM-container-add-return">返回</button>
          <div class="SM-container-title">XXX公司客服添加</div>
          <!-- form表单 -->
          <form action="#" class="SM-container-form">
            <div class="SM-container-form-left">
              <div class="SM-container-addService-form-name">
                <div>客服名：</div>
                <div>客服电话：</div>
                <div>密码：</div>
                <div>确认密码：</div>
                <div>客服所属公司：</div>
              </div>
              <div class="SM-container-addService-form-input">
                <div class="SM-container-addUser-form-input-serviceName">
                  <img src="../img/alert.png" alt="">
                  请正确输入客户名！
                </div>
                <div class="SM-container-addUser-form-input-number">
                  <img src="../img/alert.png" alt="">
                  请正确输入电话！
                </div>
                <div class="SM-container-addUser-form-input-password">
                  <img src="../img/alert.png" alt="">
                  请正确输入密码！
                </div>
                <div class="SM-container-addUser-form-input-rePassword">
                  <img src="../img/alert.png" alt="">
                  请保持密码一致！
                </div>
                <input class="SM-container-addService-form-input-name" type="text">
                <input class="SM-container-addService-form-input-tel" type="text">
                <input class="SM-container-addService-form-input-password" type="text">
                <input class="SM-container-addService-form-input-rePassword" type="text">
                <input readonly type="text">
              </div>
            </div>
            <div class="SM-container-form-bottom">
              <button type="button" class="SM-container-form-bottom-addService-cancel">取消</button>
              <button type="button" class="SM-container-form-bottom-addService-submit">提交</button>
            </div>
          </form>
        </div>
        <!-- 客服添加end -->


      </div>
      <!--主体内容end-->
    </div>
</body>

</html>