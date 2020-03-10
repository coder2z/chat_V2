$(function () {
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });

  var baseURL = '..'

  // 总页数
  var objNum;
  // 总页数
  var pageNum;
  //当前页数
  var nowPage;
  // 当前页数据的剩余条数
  var nowPageDataNum

  // 个人用户页面的数据渲染
  window.onload = function () {
    // 页面列表渲染
    // 鼠标点击的页码
    ajaxReq();
  }


  // 监听跳转页码事件
  $('.PA-container-page-info-changePage>input').keydown(function (e) {
    if (e.keyCode == 13) {
      if ($(this).val() != '' && !isNaN($(this).val())) {
        if ($(this).val() <= pageNum) {
          PageSkip($(this).val());
        } else {
          return;
        }
      } else {
        alert('请正确输入页码！');
      }
      $(this).val('');
    }
  });

  // 点击页码进行跳转
  $(document).on("click", '.PA-container-page-info>input', function () {
    PageSkip($(this).val());
  })


  // 上一页下一页

  $('.PA-container-page-info button').first().click(function () {
    PageSkip(nowPage - 1);
  })
  $('.PA-container-page-info button').last().click(function () {
    if (nowPage == pageNum) {
      PageSkip(nowPage);
    } else {
      PageSkip(nowPage + 1);
    }
  })

  //------------个人账号按钮--------------
  $('.PA-container-add-button').click(function () {
    $('.PA-container-box').css('display', 'none');
    $('.PA-container-add').animate({
      height: 'show'
    })
  })

  // 个人账号添加返回主页面按钮
  $('.PA-container-add-return').click(function () {
    $('.PA-container-add').css('display', 'none');
    $('.PA-container-box').animate({
      height: 'show'
    })
  })

  // 个人账号添加取消按钮 返回主页面按钮
  $('.PA-container-add-form-button input').eq(0).click(function () {
    $('.PA-container-add').css('display', 'none');
    $('.PA-container-box').animate({
      height: 'show'
    })
     $('#PA-container-add-form-name').val('');
     $('#PA-container-add-form-phoneNumber').val('')
     $('#PA-container-add-form-password').val('')
     $('#PA-container-add-form-confirmPassword').val('')

  })

  //  添加个人用户账号
  $(document).on('click', '.PA-container-add-form-button input:nth-of-type(2)', function () {
    // 用户名验证
    let userStr = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    if (!userStr.test($('#PA-container-add-form-name').val())) {
      $('.PA-container-addUser-form-input-box').eq(0).fadeIn(1000);
      setTimeout(function () {
        $('.PA-container-addUser-form-input-box').eq(0).fadeOut(1000);
      }, 6000)
    }
    // 手机号验证
    let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!telStr.test($('#PA-container-add-form-phoneNumber').val())) {
      $('.PA-container-addUser-form-input-box').eq(1).fadeIn(1000);
      setTimeout(function () {
        $('.PA-container-addUser-form-input-box').eq(1).fadeOut(1000);
      }, 6000)
    }
    // 密码验证
    let passwordStr = /^[a-z0-9]+$/i;
    if (!passwordStr.test($('#PA-container-add-form-password').val())) {
      $('.PA-container-addUser-form-input-box').eq(2).fadeIn(1000);
      setTimeout(function () {
        $('.PA-container-addUser-form-input-box').eq(2).fadeOut(1000);
      }, 6000)
    }
    // 确认密码验证
    if ($('#PA-container-add-form-password').val() != $('#PA-container-add-form-confirmPassword').val()) {
      $('.PA-container-addUser-form-input-box').eq(3).fadeIn(1000);
      setTimeout(function () {
        $('.PA-container-addUser-form-input-box').eq(3).fadeOut(1000);
      }, 6000)
      return;
    }
    if (!passwordStr.test($('#PA-container-add-form-name').val()) || !telStr.test($('#PA-container-add-form-phoneNumber').val()) || !passwordStr.test($('#PA-container-add-form-password').val())) {
      return;
    }

    $.ajax({
      type: "post",
      url: baseURL + "/admin/person",
      data: {
        person_name: $('#PA-container-add-form-name').val(),
        person_phone: $('#PA-container-add-form-phoneNumber').val(),
        person_state: 0,
        person_password: $('#PA-container-add-form-password').val(),
      },

      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data.code == 200) {
          alert('添加成功！')
          $('.PA-container-add').css('display', 'none');
          $('.PA-container-box').animate({
            height: 'show'
          })
          PageSkip(nowPage);
        } else {
          alert(data.data[0])
        }
      },
      error: function (error) {
        alert(error.responseJSON.data[0]);
      }
    });
    // 清空输入框
    $('#PA-container-add-form-name').val('');
    $('#PA-container-add-form-phoneNumber').val('')
    $('#PA-container-add-form-password').val('')
    $('#PA-container-add-form-confirmPassword').val('')
  })

  // 加入黑名单和移除黑名单
  $(document).on('click', ".PA-container-tbody input", function () {

    $('.PA-container-tbody').empty();
    let parsonStatus;
    if ($(this).parent().prev().text() == '正常') {
      parsonStatus = 1;
    } else {
      parsonStatus = 2;
    }
    console.log(parseInt($(this).parent().prev().prev().prev().prev().prev().prev().html()))

    $.ajax({
      type: "post",
      url: baseURL + "/admin/person/state/update",
      data: {
        person_id: parseInt($(this).parent().prev().prev().prev().prev().prev().prev().html()),
        person_state: parseInt(parsonStatus)
      },
      dataType: "json",
      success: function (response) {
        PageSkip(nowPage);
      },
      error: function () {
        alert('添加失败！');
      }
    });

  })

//点击上一页下一页页码 页码跳转和样式改变
$(document).on('click', '.PA-container-page-info-firstPage', function () {
  let firstPage = $('.PA-container-page-info>input:nth-of-type(1)').val();
  if ($(this).val() == 1) {
    PageSkip($(this).val())
  } else {
    PageSkip($(this).val())
    $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
      let i = parseInt(firstPage) + parseInt(index) - 1
      $(item).val(i);
    })

    $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
      if (index == 1) {
        console.log('ss');
        $(item).css('background', 'rgba(101, 186, 206, 1)');
        $(item).css('color', '#fff');
      } else {
        $(item).css('background', 'rgba(231, 231, 231, 1)');
        $(item).css('color', '#000');
      }
    })
  }
})

$(document).on('click', '.PA-container-page-info>input:nth-of-type(3)', function () {
  let firstPage = $('.PA-container-page-info>input:nth-of-type(1)').val();
  if ($(this).val() == pageNum) {
    PageSkip($(this).val())
  } else {
    PageSkip($(this).val())
    $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
      let i = parseInt(firstPage) + parseInt(index) + 1
      $(item).val(i);
    })

    $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
      if (index == 1) {
        $(item).css('background', 'rgba(101, 186, 206, 1)');
        $(item).css('color', '#fff');
      } else {
        $(item).css('background', 'rgba(231, 231, 231, 1)');
        $(item).css('color', '#000');
      }
    })
  }
})

  // 跳转页面的函数
  function PageSkip(pageSkip) {

    if (isNaN(pageSkip) == false && pageSkip != '') {

      
      // 根据页码请求数据
      $.ajax({
        type: "GET",
        url: baseURL + "/admin/person",
        data: {
          page: pageSkip
        },
        dataType: "json",
        success: function (data) {
          $('.PA-container-tbody').empty();
          if (data.code == 200) {
            nowPage = data.data.current_page;
            data.data.data.forEach(function (item) {
              // 根据状态来判断状态
              let itemStatus = ''
              if (item.status == 2) {
                itemStatus = '正常'
                var $Otr = `<tr>
               <td>${item.id}</td>
               <td>${item.cname}</td>
               <td>${item.cname}</td>
               <td>${item.tel}</td>
               <td>${item.created_at}</td>
               <td>${itemStatus}</td>
               <td>
                 <input type="button" value="加入黑名单">
               </td>
               </tr>`;
                $('.PA-container-tbody').append($Otr);
              } else {
                itemStatus = '黑名单';
                var $Otr = `<tr>
                <td>${item.id}</td>
                <td>${item.cname}</td>
                <td>${item.cname}</td>
                <td>${item.tel}</td>
                <td>${item.created_at}</td>
                <td>${itemStatus}</td>
                <td>
                  <input style = "background:#ccc; color: #fff;" type = "button" value = "移除黑名单" >
                </td>
                </tr>`;
                $('.PA-container-tbody').append($Otr);
              }
            })

            // 总页数
            // 总页数
            objNum = data.data.total;
            pageNum = Math.ceil(objNum / 10);
            // 获取当前页数据的剩余条数
            nowPageDataNum = pageNum * 10 - objNum;
            // 总页数
            $('.PA-container-page-info-changePage span').text(pageNum);

            let firstPage = $('.PA-container-page-info>input:nth-of-type(1)').val();

            // 判断是否超过总页数
            if (pageSkip > pageNum) {
              nowPage = pageNum;
              pageSkip = pageNum;
            }
            // 判断是否为0页
            if (pageSkip == 0) {
              nowPage = 1;
              pageSkip = 1;
            }

            // 给当前页码赋值
            if (pageNum == 2) {
              $('.PA-container-page-info-secondPage').css('display', 'inline-block');
              $('.PA-container-page-info-thirdPage-service').css('display', 'none');
            } else if (pageNum == 3) {
              $('.PA-container-page-info-secondPage').css('display', 'inline-block');
              $('.PA-container-page-info-thirdPage').css('display', 'inline-block');
            }
            if (pageNum > 3) {
              // 给当前客服管理页码赋值
              $('.PA-container-page-info-secondPage').css('display', 'inline-block');
              $('.PA-container-page-info-thirdPage').css('display', 'inline-block');
            }

            // 点击下一页，页码跳页
            if ((pageSkip > (parseInt(firstPage) + 2))) {

              $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index) - 2
                $(item).val(i);
              })

              $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
                if (index == 2) {

                  $(item).css('background', 'rgba(101, 186, 206, 1)');
                  $(item).css('color', '#fff');
                } else {
                  $(item).css('background', 'rgba(231, 231, 231, 1)');
                  $(item).css('color', '#000');
                }
              })

            } else {
              // 颜色渲染
              $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {

                if (index == pageSkip - firstPage) {

                  $(item).css('background', 'rgba(101, 186, 206, 1)');
                  $(item).css('color', '#fff');
                } else {
                  $(item).css('background', 'rgba(231, 231, 231, 1)');
                  $(item).css('color', '#000');
                }
              })
            }

            //点击上一页页码跳页
            if ((pageSkip < (parseInt(firstPage)))) {


              $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index)
                $(item).val(i);
              })

              $('.PA-container-page-info>input').slice(0, 3).each(function (index, item) {
                if (index == 0) {

                  $(item).css('background', 'rgba(101, 186, 206, 1)');
                  $(item).css('color', '#fff');
                } else {
                  $(item).css('background', 'rgba(231, 231, 231, 1)');
                  $(item).css('color', '#000');
                }
              })
            }

            // 是否显示页码
            if (pageNum == 1) {
              $('.PA-container-page-info').css('display', 'none');
            } else {
              $('.PA-container-page-info').css('display', 'block');
            }

            // 是否显示省略号
           if (pageNum > 3 && nowPage < pageNum) {
              $('.PA-container-page-info-more').css('display', 'inline-block');
            } else {
              $('.PA-container-page-info-more').css('display', 'none');
            }

          }
        },
        error: function () {

        }
      });

    } else {
      return;
    }

  }

  // 主页面刷新函数
  function ajaxReq() {

    $('.PA-container-tbody').empty();

    $.ajax({
      type: "GET",
      url: baseURL + "/admin/person",
      dataType: "json",
      success: function (data) {
        if (data.code == 200) {

          nowPage = data.data.current_page;
          data.data.data.forEach(function (item) {

            let itemStatus = ''
            if (item.status == 2) {
              itemStatus = '正常'
              var $Otr = `<tr>
               <td>${item.id}</td>
               <td>${item.cname}</td>
               <td>${item.cname}</td>
               <td>${item.tel}</td>
               <td>${item.created_at}</td>
               <td>${itemStatus}</td>
               <td>
                 <input type="button" value="加入黑名单">
               </td>
               </tr>`;
              $('.PA-container-tbody').append($Otr);
            } else {
              itemStatus = '黑名单';
              var $Otr = `<tr>
                <td>${item.id}</td>
                <td>${item.cname}</td>
                <td>${item.cname}</td>
                <td>${item.tel}</td>
                <td>${item.created_at}</td>
                <td>${itemStatus}</td>
                <td>
                 <input style = "background: #ccc; color: #fff;" type = "button" value = "移除黑名单" >
                </td>
                </tr>`;
              $('.PA-container-tbody').append($Otr);
            }
          })

          // 总页数
          objNum = data.data.total;
          pageNum = Math.ceil(objNum / 10);
          // 获取当前页数据的剩余条数
          nowPageDataNum = pageNum * 10 - objNum;

          // 给当前页码赋值
          if (pageNum == 2) {
            $('.PA-container-page-info-secondPage').css('display', 'inline-block');
            $('.PA-container-page-info-thirdPage-service').css('display', 'none');
          } else if (pageNum == 3) {
            $('.PA-container-page-info-secondPage').css('display', 'inline-block');
            $('.PA-container-page-info-thirdPage').css('display', 'inline-block');
          }
          if (pageNum > 3) {
            // 给当前客服管理页码赋值
            $('.PA-container-page-info-secondPage').css('display', 'inline-block');
            $('.PA-container-page-info-thirdPage').css('display', 'inline-block');
          }

          // 是否显示页码
          if (pageNum == 1) {
            $('.PA-container-page-info').css('display', 'none');
          } else {
            $('.PA-container-page-info').css('display', 'block');
          }

          // 是否显示省略号
          if (pageNum > 3) {
            $('.PA-container-page-info-more').css('display', 'inline-block');
          } else {
            $('.PA-container-page-info-more').css('display', 'none');
          }

          // 总页数
          $('.PA-container-page-info-changePage span').text(pageNum);

          // 给查看按钮添加点击事件,查看审核是否通过
          $('.PA-container-tbody input').on("click", function () {
            var companyId = $(this).parent().prev().prev().prev().prev().prev().text();
            var companyName = $(this).parent().prev().prev().prev().prev().text();
            var companyTel = $(this).parent().prev().prev().prev().text();
            if ($(this).parent().prev().text() == '审核') {
              $('.container-box').css('display', 'none');
              $('.PA-container-unchecked').animate({
                height: 'show'
              })
            } else if ($(this).parent().prev().text() == '禁用') {
              $('.container-box').css('display', 'none');
              $('.PA-container-ban').animate({
                height: 'show'
              })
            } else {
              $('.container-box').css('display', 'none');
              $('.PA-container-checked').animate({
                height: 'show'
              })
            }
            $('.PA-container-is-checked-form-input input:nth-of-type(1)').val(companyId);
            $('.PA-container-is-checked-form-input input:nth-of-type(2)').val(companyName);
            $('.PA-container-is-checked-form-input input:nth-of-type(3)').val(companyTel);

          })
        }
      },
      error: function (xhr) {
        console.log(xhr);
      }
    });
  }

  // 主页面搜索功能
  $('.PA-container-search-button').click(function () {
    searchProblem()
  })

  // 监听搜索按钮事件
  $('.PA-container-search-input').keydown(function (e) {
    if (e.keyCode == 13) {
      if ($('.PA-container-search-input').val() != '') {
        searchProblem();
      } else {
        alert('请正确输入页码！');
      }
    }
  });

  // 搜索问题方法
  function searchProblem() {
    var searchProblem = $('.PA-container-search-input').val();
    $('.PA-container-tbody').empty();
    $.ajax({
      type: "GET",
      url: baseURL + "/admin/person/search",
      dataType: "json",
      data: {
        search_content: searchProblem
      },
      success: function (data) {
        if (data.code == 200) {
          console.log(data);

          let itemStatus = ''
          if (data.data.status == 2) {
            itemStatus = '正常'
            var $Otr = `<tr>
              <td>${data.data.id}</td>
              <td>${data.data.cname}</td>
              <td>${data.data.cname}</td>
              <td>${data.data.tel}</td>
              <td>${data.data.created_at}</td>
              <td>${itemStatus}</td>
              <td>
                <input type="button" value="加入黑名单">
              </td>
              </tr>`;
            $('.PA-container-tbody').append($Otr);
          } else {
            itemStatus = '黑名单';
            var $Otr = `<tr>
              <td>${data.data.id}</td>
              <td>${data.data.cname}</td>
              <td>${data.data.cname}</td>
              <td>${data.data.tel}</td>
              <td>${data.data.created_at}</td>
              <td>${itemStatus}</td>
              <td>
                <input type="button" value="移除黑名单">
              </td>
              </tr>`;
            $('.PA-container-tbody').append($Otr);
          }


        }

      },
      error: function (xhr) {
        console.log(xhr);
      }
    });

  }


})