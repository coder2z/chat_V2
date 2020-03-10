$(function () {
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });
  var baseURL = '..'

  // 数据总数
  var objNum;
  // 总页数
  var pageNum;
  //当前页数
  var nowPage;
  // 当前页数据的剩余条数
  var nowPageDataNum

  // 当前公司id
  var nowCompanyId;

  // 企业操作页面的数据渲染
  window.onload = function () {
    // 页面列表渲染
    // 鼠标点击的页码
    ajaxReq();
  }


  // 监听跳转页码事件
  $('.AM-container-page-info-changePage>input').keydown(function (e) {
    if (e.keyCode == 13) {
      if ($(this).val() != '' && !isNaN($(this).val())) {
        if ($(this).val() <= pageNum) {
          if ($('.AM-container-select-box').val() == '全部') {
            PageSkip($(this).val())
          } else if ($('.AM-container-select-box').val() == '禁用') {
            changeCompany(0, $(this).val())
          } else if ($('.AM-container-select-box').val() == '启用') {
            changeCompany(2, $(this).val())
          } else {
            changeCompany(1, $(this).val())
          }
        } else {
          return;
        }
      } else {
        alert('请正确输入页码！');
      }
    }
    $(this).val('');
  });

  // 点击页码进行跳转
  $(document).on("click", '.AM-container-page-info>input', function () {
    if ($('.AM-container-select-box').val() == '全部') {
      PageSkip($(this).val())
    } else if ($('.AM-container-select-box').val() == '禁用') {
      changeCompany(0, $(this).val())
    } else if ($('.AM-container-select-box').val() == '启用') {
      changeCompany(2, $(this).val())
    } else {
      changeCompany(1, $(this).val())
    }
  })

  // 上一页下一页
  $('.AM-container-page-info button').first().click(function () {
    if ($('.AM-container-select-box').val() == '全部') {
      PageSkip(nowPage - 1)
    } else if ($('.AM-container-select-box').val() == '禁用') {
      changeCompany(0, nowPage - 1)
    } else if ($('.AM-container-select-box').val() == '启用') {
      changeCompany(2, nowPage - 1)
    } else {
      changeCompany(1, nowPage - 1)
    }

  })

  $('.AM-container-page-info button').last().click(function () {

    if (nowPage == pageNum) {
      if ($('.AM-container-select-box').val() == '全部') {
        PageSkip(nowPage)
      } else if ($('.AM-container-select-box').val() == '禁用') {
        changeCompany(0, nowPage)
      } else if ($('.AM-container-select-box').val() == '启用') {
        changeCompany(2, nowPage)
      } else {
        changeCompany(1, nowPage)
      }
    } else {
      if ($('.AM-container-select-box').val() == '全部') {
        PageSkip(nowPage + 1)
      } else if ($('.AM-container-select-box').val() == '禁用') {
        changeCompany(0, nowPage + 1)
      } else if ($('.AM-container-select-box').val() == '启用') {
        changeCompany(2, nowPage + 1)
      } else {
        changeCompany(1, nowPage + 1)
      }
    }
  })

  //------------企业添加按钮--------------
  $('.AM-container-select-addUser').click(function () {
    $('.container-box').css('display', 'none');
    $('.AM-container-addUser').animate({
      height: 'show'
    })
  })

  // 添加企业
  // 提交按钮
  $('.AM-container-addUser-form-bottom-submit').click(function () {

    // 用户名验证
    let userStr = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    if (!userStr.test($('#AM-container-addUser-form-input-name').val())) {
      $('.AM-container-addUser-form-input-nameBox').fadeIn(1000);
      setTimeout(function () {
        $('.AM-container-addUser-form-input-nameBox').fadeOut(1000);
      }, 6000)
    }
    // 手机号验证
    let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!telStr.test($('#AM-container-addUser-form-input-tel').val())) {
      $('.AM-container-addUser-form-input-telBox').fadeIn(1000);
      setTimeout(function () {
        $('.AM-container-addUser-form-input-telBox').fadeOut(1000);
      }, 6000)
    }

    // 密码验证
    let passwordStr = /^[a-z0-9]+$/i;
    if (!passwordStr.test($('#AM-container-addUser-form-input-password').val())) {
      $('.AM-container-addUser-form-input-passwordBox').fadeIn(1000);
      setTimeout(function () {
        $('.AM-container-addUser-form-input-passwordBox').fadeOut(1000);
      }, 6000)
    }

    // 确认密码验证
    if ($('#AM-container-addUser-form-input-password').val() != $('#AM-container-addUser-form-input-rePassword').val()) {
      $('.AM-container-addUser-form-input-rePasswordBox').fadeIn(1000);
      setTimeout(function () {
        $('.AM-container-addUser-form-input-rePasswordBox').fadeOut(1000);
      }, 6000)
      return 0;
    }

    if (!passwordStr.test($('#AM-container-addUser-form-input-password').val()) || !passwordStr.test($('#AM-container-addUser-form-input-password').val()) || !userStr.test($('#AM-container-addUser-form-input-name').val())) {
      return;
    }
    $.ajax({
      type: "post",
      url: baseURL + "/admin/company ",
      data: {
        company_name: $('#AM-container-addUser-form-input-name').val(),
        company_phone: parseInt($('#AM-container-addUser-form-input-tel').val()),
        password: $('#AM-container-addUser-form-input-password').val()
      },
      async: false,
      success: function (data) {
        alert('添加成功!')
        // 跳到主页
        ajaxReq();
        $('.AM-container-addUser').css('display', 'none');
        $('.container-box').animate({
          height: 'show'
        })
        // 清除主页面内容
        $('.AM-container-tbody').empty();
        // 页面重新加载

        // 页面加载
        if ($('.AM-container-select-box').val() == '全部') {
          PageSkip(nowPage)
        } else if ($('.AM-container-select-box').val() == '禁用') {
          changeCompany(0, nowPage)
        } else if ($('.AM-container-select-box').val() == '启用') {
          changeCompany(2, nowPage)
        } else {
          changeCompany(1, nowPage)
        }

      },
      error: function (error) {
        alert(error.responseJSON.data);
      }
    });
    // 清空输入框
    $('#AM-container-addUser-form-input-name').val('');
    $('#AM-container-addUser-form-input-password').val('')
    $('#AM-container-addUser-form-input-rePassword').val('')
    $('#AM-container-addUser-form-input-tel').val('')
  })

  //添加页面 取消按钮
  $('.AM-container-addUser-form-bottom-cancel').click(function () {
    // 清空输入框
    $('#AM-container-addUser-form-input-name').val('');
    $('#AM-container-addUser-form-input-password').val('')
    $('#AM-container-addUser-form-input-rePassword').val('')
    $('#AM-container-addUser-form-input-tel').val('')
    $('.AM-container-addUser').css('display', 'none');
    $('.container-box').animate({
      height: 'show'
    })
  })

  // 禁用页面删除用户
  $('.AM-container-ban-form-bottom-delete').click(function () {

    if (nowPageDataNum == 9){
      nowPage -= 1;
    }
    $.ajax({
      type: "delete",
      url: baseURL + "/admin/company ",
      data: {
        company_id: $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(0).val()
      },
      dataType: "json",
      success: function (data) {
        alert('删除成功！');
        // 跳到主页
        $('.AM-container-ban').css('display', 'none');
        $('.container-box').animate({
          height: 'show'
        })
        // 清除主页面内容
        $('.AM-container-tbody').empty();

       // 页面加载
       if ($('.AM-container-select-box').val() == '全部') {
         PageSkip(nowPage)
       } else if ($('.AM-container-select-box').val() == '禁用') {
         changeCompany(0, nowPage)
       } else if ($('.AM-container-select-box').val() == '启用') {
         changeCompany(2, nowPage)
       } else {
         changeCompany(1, nowPage)
       }

      },
      error: function (error) {
        alert(error.responseJSON.data)
      }
    });
  })

  // 启用页面删除用户
  $('.AM-container-checked-form-bottom-delete').click(function () {

    if (nowPageDataNum == 9) {
      nowPage -= 1;
    }

    $.ajax({
      type: "delete",
      url: baseURL + "/admin/company ",
      data: {
        company_id: $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(0).val()
      },
      dataType: "json",
      success: function (data) {
        // 跳到主页
        $('.AM-container-checked').css('display', 'none');
        $('.container-box').animate({
          height: 'show'
        })
        // 清除主页面内容
        $('.AM-container-tbody').empty();

        // 页面加载
        if ($('.AM-container-select-box').val() == '全部') {
          PageSkip(nowPage)
        } else if ($('.AM-container-select-box').val() == '禁用') {
          changeCompany(0, nowPage)
        } else if ($('.AM-container-select-box').val() == '启用') {
          changeCompany(2, nowPage)
        } else {
          changeCompany(1, nowPage)
        }
      },
      error: function (error) {
        alert(error.responseJSON.data)
      }
    });
  })

  // 审核通过
  $('.AM-container-addUser-form-bottom-pass').click(function () {
    nowCompanyId = $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(0).val();
    changeStatus(2);
  })

  // 审核不通过
  $('.AM-container-addUser-form-bottom-noPass').click(function () {
    nowCompanyId = $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(0).val();
    changeStatus(0);
  })

  // 禁用用户
  $('.AM-container-addUser-form-bottom-ban').click(function () {
    nowCompanyId = $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(0).val();
    changeStatus(0);
  })

  // 启用用户
  $('.AM-container-addUser-form-bottom-use').click(function () {
    nowCompanyId = $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(0).val();
    changeStatus(2);
  })

  // 修改公司信息
  $('.AM-container-addUser-form-bottom-update').click(function () {

    // 用户名验证
    let userStr = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    // 手机号验证
    let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

    if (!userStr.test($(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(1).val())) {
      $('.AM-container-is-checked-form-input-company').fadeIn(1000);
      setTimeout(function () {
        $('.AM-container-is-checked-form-input-company').fadeOut(1000);
      }, 6000)
      $('.AM-container-is-checked-form-input input:nth-of-type(2)').css('border', '1px solid #fc703e !important')
    }

    if (!telStr.test($(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(2).val())) {
      $('.AM-container-is-checked-form-input-number').fadeIn(1000);
      setTimeout(function () {
        $('.AM-container-is-checked-form-input-number').fadeOut(1000);
      }, 6000)
    }

    if (!userStr.test($(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(1).val()) || !telStr.test($(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(2).val())) {
      return;
    }


    $.ajax({
      type: "post",
      url: baseURL + "/admin/updateCompany",
      data: {
        company_id: $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(0).val(),
        company_name: $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(1).val(),
        company_phone: $(this).parent().prev().prev().find('.AM-container-is-checked-form-input input').eq(2).val(),
      },
      dataType: "json",
      success: function (data) {
        alert('修改成功')
        $('.AM-container-unchecked').css('display', 'none');
        $('.AM-container-ban').css('display', 'none');
        $('.AM-container-checked').css('display', 'none');
        $('.container-box').animate({
          height: 'show'
        })
        // 清除主页面内容
        $('.AM-container-tbody').empty();

        // 页面加载
        if ($('.AM-container-select-box').val() == '全部') {
          PageSkip(nowPage)
        } else if ($('.AM-container-select-box').val() == '禁用') {
          changeCompany(0, nowPage)
        } else if ($('.AM-container-select-box').val() == '启用') {
          changeCompany(2, nowPage)
        } else {
          changeCompany(1, nowPage)
        }

      },
      error: function (error) {
        alert(error.responseJSON.data)
      }
    });
  })

  //点击上一页下一页页码 页码跳转和样式改变
  $(document).on('click', '.AM-container-page-info-firstPage', function () {
    let firstPage = $('.AM-container-page-info>input:nth-of-type(1)').val();
    if ($(this).val() == 1) {
      if ($('.AM-container-select-box').val() == '全部') {
        PageSkip($(this).val())
      } else if ($('.AM-container-select-box').val() == '禁用') {
        changeCompany(0, $(this).val())
      } else if ($('.AM-container-select-box').val() == '启用') {
        changeCompany(2, $(this).val())
      } else {
        changeCompany(1, $(this).val())
      }
    } else {
      if ($('.AM-container-select-box').val() == '全部') {
        PageSkip($(this).val())
      } else if ($('.AM-container-select-box').val() == '禁用') {
        changeCompany(0, $(this).val())
      } else if ($('.AM-container-select-box').val() == '启用') {
        changeCompany(2, $(this).val())
      } else {
        changeCompany(1, $(this).val())
      }

      $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
        let i = parseInt(firstPage) + parseInt(index) - 1
        $(item).val(i);
      })

      $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
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

  $(document).on('click', '.AM-container-page-info>input:nth-of-type(3)', function () {
    let firstPage = $('.AM-container-page-info>input:nth-of-type(1)').val();
    if ($(this).val() == pageNum) {

      // 给筛选功能加判断
      if ($('.AM-container-select-box').val() == '全部') {
        PageSkip($(this).val())
      } else if ($('.AM-container-select-box').val() == '禁用') {
        changeCompany(0, $(this).val())
      } else if ($('.AM-container-select-box').val() == '启用') {
        changeCompany(2, $(this).val())
      } else {
        changeCompany(1, $(this).val())
      }

    } else {

      if ($('.AM-container-select-box').val() == '全部') {
        PageSkip($(this).val())
      } else if ($('.AM-container-select-box').val() == '禁用') {
        changeCompany(0, $(this).val())
      } else if ($('.AM-container-select-box').val() == '启用') {
        changeCompany(2, $(this).val())
      } else {
        changeCompany(1, $(this).val())
      }

      $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
        let i = parseInt(firstPage) + parseInt(index) + 1
        $(item).val(i);
      })

      $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
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

  // 改变用户状态函数
  function changeStatus(status) {
    $.ajax({
      type: "post",
      url: baseURL + "/admin/changeCompanyState",
      data: {
        company_id: nowCompanyId,
        state: parseInt(status),
      },
      dataType: "json",
      success: function (data) {
        alert('操作成功！');
        // 清除主页面内容
        $('.AM-container-tbody').empty();

        if (status == 2) {
          $('.AM-container-unchecked').css('display', 'none');
          $('.AM-container-ban').css('display', 'none');
          $('.container-box').animate({
            height: 'show'
          })
        } else {
          $('.AM-container-unchecked').css('display', 'none');
          $('.AM-container-checked').css('display', 'none');
          $('.container-box').animate({
            height: 'show'
          })
        }
        // 页面加载
        $('.AM-container-select-box').val('全部');
        PageSkip(1);
      },
      error: function (error) {
        alert(error.responseJSON.data)
      }
    });
  }

  // 跳转页面的函数
  function PageSkip(pageSkip) {

    if (isNaN(pageSkip) == false && pageSkip != '') {

      // 根据页码请求数据
      $.ajax({
        type: "GET",
        async: false,
        url: baseURL + "/admin/company",
        data: {
          page: pageSkip
        },
        dataType: "json",
        success: function (data) {
          $('.AM-container-tbody').empty();
          if (data.code == 200) {
            nowPage = data.data.current_page;
            data.data.data.forEach(function (item) {
              // 根据状态来判断状态
              let itemStatus = ''
              if (item.status == 1) {
                itemStatus = '待审核'
              } else if (item.status == 2) {
                itemStatus = '启用'
              } else {
                itemStatus = '禁用'
              }

              var $Otr = `<tr>
            <td>${item.id}</td>
            <td>${item.cname}</td>
            <td>${item.tel}</td>
            <td>${item.created_at}</td>
            <td>${itemStatus}</td>
            <td>
              <input type="button" value="查看">
            </td>
            < /tr>`;
              $('.AM-container-tbody').append($Otr);
            })

            // 总页数
            // 总页数
            objNum = data.data.total;
            pageNum = Math.ceil(objNum / 10);
            // 获取当前页数据的剩余条数
            nowPageDataNum = pageNum * 10 - objNum;
            // 总页数
            $('.AM-container-page-info-changePage span').text(pageNum);

            let firstPage = $('.AM-container-page-info>input:nth-of-type(1)').val();

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
              $('.SM-container-page-info-secondPage').css('display', 'inline-block');
              $('.SM-container-page-info-thirdPage').css('display', 'none');
            } else if (pageNum == 3) {
              $('.SM-container-page-info-secondPage').css('display', 'inline-block');
              $('.SM-container-page-info-thirdPage').css('display', 'inline-block');
            }
            if (pageNum > 3) {
              // 给当前客服管理页码赋值
              $('.SM-container-page-info-secondPage').css('display', 'inline-block');
              $('.SM-container-page-info-thirdPage').css('display', 'inline-block');
            }

            // 点击下一页，页码跳页
            if ((pageSkip > (parseInt(firstPage) + 2))) {
              $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index) - 2
                $(item).val(i);
              })
              $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
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
              $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {

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

              $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index)
                $(item).val(i);
              })

              $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
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
            if (pageNum <= 1) {
              $('.AM-container-page-info').css('display', 'none');
            } else {
              $('.AM-container-page-info').css('display', 'block');
            }

            // 是否显示省略号
            if (pageNum > 3 && nowPage < pageNum) {
              $('.AM-container-page-info-more').css('display', 'inline-block');
            } else {
              $('.AM-container-page-info-more').css('display', 'none');
            }

            // 给查看按钮添加点击事件,查看审核是否通过
            $('.AM-container-tbody input').on("click", function () {

              var companyId = $(this).parent().prev().prev().prev().prev().prev().text();
              var companyName = $(this).parent().prev().prev().prev().prev().text();
              var companyTel = $(this).parent().prev().prev().prev().text();
              if ($(this).parent().prev().text() == '待审核') {
                $('.container-box').css('display', 'none');
                $('.AM-container-unchecked').animate({
                  height: 'show'
                })
              } else if ($(this).parent().prev().text() == '禁用') {
                $('.container-box').css('display', 'none');
                $('.AM-container-ban').animate({
                  height: 'show'
                })
              } else {
                $('.container-box').css('display', 'none');
                $('.AM-container-checked').animate({
                  height: 'show'
                })
              }
              $('.AM-container-is-checked-form-input input:nth-of-type(1)').val(companyId);
              $('.AM-container-is-checked-form-input input:nth-of-type(2)').val(companyName);
              $('.AM-container-is-checked-form-input input:nth-of-type(3)').val(companyTel);
            })
          }
        },
        error: function (error) {
          alert(error.responseJSON.data)
        }
      });

    } else {
      return;
    }

  }

  // 主页面刷新函数
  function ajaxReq() {

    $('.AM-container-tbody').empty();

    $.ajax({
      type: "GET",
      async: false,
      url: "../admin/company",
      dataType: "json",
      success: function (data) {
        if (data.code == 200) {

          nowPage = data.data.current_page;
          data.data.data.forEach(function (item) {
            let itemStatus = ''
            if (item.status == 1) {
              itemStatus = '待审核'
            } else if (item.status == 2) {
              itemStatus = '启用'
            } else {
              itemStatus = '禁用'
            }
            var $Otr = `<tr>
              <td>${item.id}</td>
              <td>${item.cname}</td>
              <td>${item.tel}</td>
              <td>${item.created_at}</td>
              <td>${itemStatus}</td>
              <td>
                <input type="button" value="查看">
              </td>
              </tr>`;
            $('.AM-container-tbody').append($Otr);
          })

          // 总页数
          objNum = data.data.total;
          pageNum = Math.ceil(objNum / 10);
          // 获取当前页数据的剩余条数
          nowPageDataNum = pageNum * 10 - objNum;

          // 总页数
          $('.AM-container-page-info-changePage span').text(pageNum);

          // 是否显示页码
          if (pageNum == 1) {
            $('.AM-container-page-info').css('display', 'none');
          } else {
            $('.AM-container-page-info').css('display', 'block');
          }

          // 是否显示省略号
          if (pageNum > 3) {
            $('.AM-container-page-info-more').css('display', 'inline-block');
          } else {
            $('.AM-container-page-info-more').css('display', 'none');
          }

          // 给当前页码赋值
          if (pageNum == 2) {
            $('.SM-container-page-info-secondPage').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage').css('display', 'none');
          } else if (pageNum == 3) {
            $('.SM-container-page-info-secondPage').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage').css('display', 'inline-block');
          }
          if (pageNum > 3) {
            // 给当前客服管理页码赋值
            $('.SM-container-page-info-secondPage').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage').css('display', 'inline-block');
          }

          // 给查看按钮添加点击事件,查看审核是否通过
          $('.AM-container-tbody input').on("click", function () {
            var companyId = $(this).parent().prev().prev().prev().prev().prev().text();
            var companyName = $(this).parent().prev().prev().prev().prev().text();
            var companyTel = $(this).parent().prev().prev().prev().text();
            if ($(this).parent().prev().text() == '待审核') {
              $('.container-box').css('display', 'none');
              $('.AM-container-unchecked').animate({
                height: 'show'
              })
            } else if ($(this).parent().prev().text() == '禁用') {
              $('.container-box').css('display', 'none');
              $('.AM-container-ban').animate({
                height: 'show'
              })
            } else {
              $('.container-box').css('display', 'none');
              $('.AM-container-checked').animate({
                height: 'show'
              })
            }
            $('.AM-container-is-checked-form-input input:nth-of-type(1)').val(companyId);
            $('.AM-container-is-checked-form-input input:nth-of-type(2)').val(companyName);
            $('.AM-container-is-checked-form-input input:nth-of-type(3)').val(companyTel);

          })
        }
      },
      error: function (error) {
        alert(error)
      }
    });
  }

  // 企业下拉框筛选功能
  $(document).on("change", '.AM-container-select-box', function () {
    if ($('.AM-container-select-box').val() == '全部') {
      PageSkip(1)
    } else if ($('.AM-container-select-box').val() == '禁用') {
      changeCompany(0, 1)
    } else if ($('.AM-container-select-box').val() == '启用') {
      changeCompany(2, 1)
    } else {
      changeCompany(1, 1)
    }
  })

  // 企业下拉框筛选功能函数
  function changeCompany(statusCompany, pageSkip) {

    $.ajax({
      type: "get",
      url: baseURL + "/admin/company/" + parseInt(statusCompany),
      data: {
        page: pageSkip
      },
      dataType: "json",
      success: function (data) {
        if (data.code == 200) {

           $('.AM-container-tbody').empty();
          nowPage = data.data.current_page;
          data.data.data.forEach(function (item) {
            // 根据状态来判断状态
            let itemStatus = ''
            if (item.status == 1) {
              itemStatus = '待审核'
            } else if (item.status == 2) {
              itemStatus = '启用'
            } else {
              itemStatus = '禁用'
            }

            var $Otr = `<tr>
            <td>${item.id}</td>
            <td>${item.cname}</td>
            <td>${item.tel}</td>
            <td>${item.created_at}</td>
            <td>${itemStatus}</td>
            <td>
              <input type="button" value="查看">
            </td>
            < /tr>`;
            $('.AM-container-tbody').append($Otr);
          })

          // 总页数
          // 总页数
          objNum = data.data.total;
          pageNum = Math.ceil(objNum / 10);
          // 获取当前页数据的剩余条数
          nowPageDataNum = pageNum * 10 - objNum;

          // 总页数
          $('.AM-container-page-info-changePage span').text(pageNum);

          let firstPage = $('.AM-container-page-info>input:nth-of-type(1)').val();

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
            $('.SM-container-page-info-secondPage').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage').css('display', 'none');
          } else if (pageNum == 3) {
            $('.SM-container-page-info-secondPage').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage').css('display', 'inline-block');
          }
          if (pageNum > 3) {
            // 给当前客服管理页码赋值
            $('.SM-container-page-info-secondPage').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage').css('display', 'inline-block');
          }

          // 点击下一页，页码跳页
          if ((pageSkip > (parseInt(firstPage) + 2))) {
            $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
              let i = parseInt(pageSkip) + parseInt(index) - 2
              $(item).val(i);
            })
            $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
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
            $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {

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

            $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
              let i = parseInt(pageSkip) + parseInt(index)
              $(item).val(i);
            })

            $('.AM-container-page-info>input').slice(0, 3).each(function (index, item) {
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
          if (pageNum <= 1) {
            $('.AM-container-page-info').css('display', 'none');
          } else {
            $('.AM-container-page-info').css('display', 'block');
          }

          // 是否显示省略号
          if (pageNum > 3 && nowPage < pageNum) {
            $('.AM-container-page-info-more').css('display', 'inline-block');
          } else {
            $('.AM-container-page-info-more').css('display', 'none');
          }

          // 给查看按钮添加点击事件,查看审核是否通过
          $('.AM-container-tbody input').on("click", function () {

            var companyId = $(this).parent().prev().prev().prev().prev().prev().text();
            var companyName = $(this).parent().prev().prev().prev().prev().text();
            var companyTel = $(this).parent().prev().prev().prev().text();
            if ($(this).parent().prev().text() == '待审核') {
              $('.container-box').css('display', 'none');
              $('.AM-container-unchecked').animate({
                height: 'show'
              })
            } else if ($(this).parent().prev().text() == '禁用') {
              $('.container-box').css('display', 'none');
              $('.AM-container-ban').animate({
                height: 'show'
              })
            } else {
              $('.container-box').css('display', 'none');
              $('.AM-container-checked').animate({
                height: 'show'
              })
            }
            $('.AM-container-is-checked-form-input input:nth-of-type(1)').val(companyId);
            $('.AM-container-is-checked-form-input input:nth-of-type(2)').val(companyName);
            $('.AM-container-is-checked-form-input input:nth-of-type(3)').val(companyTel);
          })
        }
      },
      error: function (error) {
        alert('筛选失败');
      }
    });
  }
})