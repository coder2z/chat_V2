<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>超级管理员已登陆</title>
  <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/index.css">
  <script type="text/javascript" src="../js/jquery.js"></script>
  <script src="../js/account-manage.js"></script>
  <script src="../js/js.js"></script>
  <script src="../layui/layui.js"></script>
  <link rel="stylesheet" href="../layui/css/layui.css">
</head>

<body>
  <div class="index">
    <!--头部-->
    <div class="header">
      <a class="returnIndex" href="../loginOut">
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
          <div class="nav-item"><span>其他通用操作</span></div>
        </div>

        <!-- 企业操作中间主体部分 -->
        <div class="container-box">
          <div class="AM-container-select">
            <select name="AM-container-select-all"  class="AM-container-select-box">
              <option value="全部">全部</option>
              <option value="启用">启用</option>
              <option value="待审核">待审核</option>
              <option value="禁用">禁用</option>
            </select>
            <input class="AM-container-select-addUser" type="button" value="添加企业">
          </div>
          <div class="AM-container-table">
            <table width="900">
              <thead class="AM-container-thead">
                <tr>
                  <td>ID</td>
                  <td>企业名</td>
                  <td>手机号</td>
                  <td>审核时间</td>
                  <td>状态</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody class="AM-container-tbody">
                
              </tbody>
            </table>
          </div>
          <div class="AM-container-page">
            <div class="AM-container-page-info">
              <button>上一页</button>
              <input class="AM-container-page-info-firstPage" type="button" value="1">
               <input style="display: none" class="SM-container-page-info-secondPage" type="button" value="2">
               <input style="display: none" class="SM-container-page-info-thirdPage" type="button" value="3">
              <input class="AM-container-page-info-more" type="button" value="...">
              <div class="AM-container-page-info-changePage">
                <input type="text">/
                <span>100</span>页
              </div>
              <button>下一页</button>
            </div>
          </div>
        </div>
        <!-- 企业操作中间主体部分end -->

        <!-- 添加企业账号 -->
        <div class="AM-container-addUser">
          <button class="AM-container-addUser-return">返回</button>
          <div class="AM-container-addUser-title">添加账号</div>
          <!-- form表单 -->
          <form action="#" class="AM-container-addUser-form">
            <div class="AM-container-addUser-form-left">
              <div class="AM-container-addUser-form-name">
                <div>密码：</div>
                <div>确认密码：</div>
                <div>企业：</div>
                <div>手机号：</div>
              </div>
              <div class="AM-container-addUser-form-input">
                <div class="AM-container-addUser-form-input-passwordBox">
                  <img src="../img/alert.png" alt="">
                  请正确输入密码！
                </div>
                <div class="AM-container-addUser-form-input-rePasswordBox">
                  <img src="../img/alert.png" alt="">
                  请保持密码一致！
                </div>
                <div class="AM-container-addUser-form-input-nameBox">
                  <img src="../img/alert.png" alt="">
                  请正确输入企业名！
                </div>
                <div class="AM-container-addUser-form-input-telBox">
                  <img src="../img/alert.png" alt="">
                  请正确输入手机号！
                </div>
                <input id="AM-container-addUser-form-input-password" type="password" placeholder="请输入密码">
                <input id="AM-container-addUser-form-input-rePassword" type="password" placeholder="请确认密码">
                <input id="AM-container-addUser-form-input-name" type="text" placeholder="请输入企业">
                <input id="AM-container-addUser-form-input-tel" type="text" placeholder="请输入手机号" maxlength="11">
              </div>
            </div>
            <!--<div class="AM-container-addUser-form-right">
              <textarea name="" id="" cols="10" rows="10" placeholder="其他企业用户"></textarea>
            </div>-->
            <div class="AM-container-addUser-form-bottom">
              <button type="button" class="AM-container-addUser-form-bottom-cancel">取消</button>
              <button type="button"  class="AM-container-addUser-form-bottom-submit">提交</button>
            </div>
          </form>
        </div>
        <!-- 添加企业账号end -->

        <!-- 审核 -->
        <div class="AM-container-unchecked">
          <button class="AM-container-unchecked-return">返回</button>
          <span class="AM-container-is-checked-status">状态：未审核</span>
          <div class="AM-container-addUser-title">XXX公司账号</div>
          <!-- form表单 -->
          <form action="#" class="AM-container-addUser-form">
            <div class="AM-container-addUser-form-left">
              <div class="AM-container-is-checked-form-name">
                <div>企业ID：</div>
                <div>企业：</div>
                <div>手机号：</div>
              </div>
              <div class="AM-container-is-checked-form-input">
                <div class="AM-container-is-checked-form-input-company">
                 <img src="../img/alert.png" alt="">
                  请正确输入企业名！
                </div>
                <div class="AM-container-is-checked-form-input-number">
                 <img src="../img/alert.png" alt="">
                  请正确输入手机号！
                </div>
                <input style="background: #ccc" readonly type="text">
                <input type="text">
                <input type="text">
              </div>
            </div>

            <div class="AM-container-addUser-form-bottom">
              <button type="button" class="AM-container-addUser-form-bottom-update">修改账号信息</button>
              <button type="button" class="AM-container-addUser-form-bottom-noPass">不同意审核通过</button>
              <button type="button" class="AM-container-addUser-form-bottom-pass">同意审核通过</button>
            </div>
          </form>
        </div>
        <!-- 审核end -->

        <!-- 已审核 -->
        <div class="AM-container-checked">
          <button class="AM-container-checked-return">返回</button>
          <span class="AM-container-is-checked-status">状态：已审核</span>
          <div class="AM-container-addUser-title">XXX公司账号</div>
          <!-- form表单 -->
          <form action="#" class="AM-container-addUser-form">
            <div class="AM-container-addUser-form-left">
              <div class="AM-container-is-checked-form-name">
                <div>企业ID：</div>
                <div>企业：</div>
                <div>手机号：</div>
              </div>
              <div class="AM-container-is-checked-form-input">
                <div class="AM-container-is-checked-form-input-company">
                  <img src="../img/alert.png" alt="">
                  请正确输入企业名！
                </div>
                <div class="AM-container-is-checked-form-input-number">
                  <img src="../img/alert.png" alt="">
                  请正确输入手机号！
                </div>
                <input type="text">
                <input type="text">
                <input type="text">
              </div>
            </div>
            <div class="AM-container-addUser-form-bottom">
              <button type="button" class="AM-container-addUser-form-bottom-update">修改账号信息</button>
              <button type="button" class="AM-container-addUser-form-bottom-ban">禁用用户</button>
              <button type="button" class="AM-container-checked-form-bottom-delete">删除用户</button>
            </div>
          </form>
        </div>
        <!-- 已审核end -->

        <!-- 禁用 -->
        <div class="AM-container-ban">
          <button class="AM-container-ban-return">返回</button>
          <span class="AM-container-is-checked-status">状态：禁用</span>
          <div class="AM-container-addUser-title">XXX公司账号</div>
          <!-- form表单 -->
          <form action="#" class="AM-container-addUser-form">
            <div class="AM-container-addUser-form-left">
              <div class="AM-container-is-checked-form-name">
                <div>企业ID：</div>
                <div>企业：</div>
                <div>手机号：</div>
              </div>
              <div class="AM-container-is-checked-form-input">
                <div class="AM-container-is-checked-form-input-company">
                  <img src="../img/alert.png" alt="">
                  请正确输入企业名！
                </div>
                <div class="AM-container-is-checked-form-input-number">
                  <img src="../img/alert.png" alt="">
                  请正确输入手机号！
                </div>
                <input type="text">
                <input type="text">
                <input type="text">
              </div>
            </div>

            <div class="AM-container-addUser-form-bottom">
              <button type="button" class="AM-container-addUser-form-bottom-update">修改账号信息</button>
              <button type="button" class="AM-container-addUser-form-bottom-use">启用用户</button>
              <button type="button" class="AM-container-ban-form-bottom-delete">删除用户</button>
            </div>
          </form>
        </div>
        <!-- 禁用 end -->

      </div>
    </div>
    <!--主体内容end-->
  </div>
</body>

</html>