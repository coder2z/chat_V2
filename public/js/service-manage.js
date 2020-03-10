$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
var companyID;
var companyNSME;

var customer_id;
$(function () {
  var baseURL = '..'
  // 总页数
  var objNum;
  // 总页数
  var pageNum;
  //当前页数
  var nowPage;
  // 当前页数据的剩余条数
  var nowPageDataNum


  // 客服管理的页面：
  // 总页数
  var objNumService;
  // 总页数
  var pageNumService;
  //当前页数
  var nowPageService;
  // 当前页数据的剩余条数
  var nowPageDataNumService;

  // 企业操作页面的数据渲染
  window.onload = function () {
    // 页面列表渲染
    // 鼠标点击的页码
    ajaxReq();
  }

  // 主页面搜索企业功能
  $('.SM-container-search-button').click(function () {
      $('.SM-container-tbody').empty();
    $.ajax({
      type: "post",
      url: baseURL + "/admin/customer/search",
      data: {
        search_content: $('.SM-container-search-input').val()
      },
      dataType: "json",
      success: function (data) {
        if (data.code == 200) {
          nowPage = data.data.current_page;
          data.data.data.forEach(function (item) {
            var $Otr = `<tr>
              <td>${item.id}</td>
              <td>${item.cname}</td>
              <td>${item.tel}</td>
              <td>${item.created_at}</td>
              <td>
                <input type="button" value="客服管理">
              </td>
              < /tr>`;
            $('.SM-container-tbody').append($Otr);
          })

          $('.SM-container-page-info').css('display', 'none');

          // 是否显示省略号
          if (pageNum > 3 && nowPage < pageNum) {
            $('.SM-container-page-info-more').css('display', 'inline-block');
          } else {
            $('.SM-container-page-info-more').css('display', 'none');
          }

        }
      },
      error: function (error) {
        alert(error.responseJSON.data)
      }
    });

    $('.SM-container-search-input').val('');
  })

  // 监听主页面跳转页码事件
  $('.SM-container-page-info-changePage>input').keydown(function (e) {
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

  // 监听客服管理跳转页码事件
  $('.SM-container-page-info-changePage-service>input').keydown(function (e) {
    if (e.keyCode == 13) {
      if ($(this).val() != '' && !isNaN($(this).val())) {
        if ($(this).val() <= pageNum) {
          PageSkipService($(this).val());
        } else {
          return;
        }
      } else {
        alert('请正确输入页码！');
      }
      $(this).val('')
    }

  });

  // 主页点击页码进行跳转
  $(document).on("click", '.SM-container-page-info>input', function () {
    PageSkip($(this).val());
  })

  // 客服管理点击页码进行跳转
  $(document).on("click", '.SM-container-page-info-service>input', function () {
    PageSkipService($(this).val());
  })

  // 上一页下一页

  $('.SM-container-page-info button').eq(0).click(function () {
    PageSkip(nowPage - 1);
  })
  $('.SM-container-page-info button').eq(1).click(function () {
    if (nowPage == pageNum) {
      PageSkip(nowPage);
    } else {
      PageSkip(nowPage + 1);
    }
  })

  $('.SM-container-page-info-nextPage-service').click(function () {
    PageSkipService(nowPageService - 1);
  })

  $('.SM-container-page-info-lastPage-service').click(function () {
    if (nowPageService == pageNumService) {
      PageSkipService(nowPageService);
    } else {
      PageSkipService(nowPageService + 1);
    }
  })

  //主页：点击上一页下一页页码 页码跳转和样式改变
  $('.SM-container-page-info-firstPage').click(function () {
    let firstPage = $('.SM-container-page-info>input:nth-of-type(1)').val();
    if ($(this).val() == 1) {
      PageSkip($(this).val())
    } else {
      PageSkip($(this).val())
      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
        let i = parseInt(firstPage) + parseInt(index) - 1
        $(item).val(i);
      })

      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
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

  $('.SM-container-page-info>input').eq(2).click(function () {
    let firstPage = $('.SM-container-page-info>input:nth-of-type(1)').val();
    if ($(this).val() == pageNum) {
      PageSkip($(this).val())
    } else {
      PageSkip($(this).val())
      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
        let i = parseInt(firstPage) + parseInt(index) + 1
        $(item).val(i);
      })

      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
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

  // 主页面跳转页面的函数
  function PageSkip(pageSkip) {

    if (isNaN(pageSkip) == false && pageSkip != '') {

      $('.SM-container-tbody').empty();

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
          if (data.code == 200) {

            nowPage = data.data.current_page;
            data.data.data.forEach(function (item) {
              var $Otr = `<tr>
              <td>${item.id}</td>
              <td>${item.cname}</td>
              <td>${item.tel}</td>
              <td>${item.created_at}</td>
              <td>
                <input type="button" value="客服管理">
              </td>
              < /tr>`;
              $('.SM-container-tbody').append($Otr);
            })


            // 总页数
            objNum = data.data.total;
            pageNum = Math.ceil(objNum / 10);

            // 总页数
            $('.SM-container-page-info-changePage span').text(pageNum);

            let firstPage = $('.SM-container-page-info>input:nth-of-type(1)').val();

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

            // 点击下一页，页码跳页
            if ((pageSkip > (parseInt(firstPage) + 2))) {

              $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index) - 2
                $(item).val(i);
              })

              $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
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
              $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {

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


              $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index)
                $(item).val(i);
              })

              $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
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
              $('.SM-container-page-info').css('display', 'none');
            } else {
              $('.SM-container-page-info').css('display', 'block');
            }

            // 是否显示省略号
            if (pageNum > 3 && nowPage < pageNum) {
              $('.SM-container-page-info-more').css('display', 'inline-block');
            } else {
              $('.SM-container-page-info-more').css('display', 'none');
            }

          }
        },
        error: function () {}
      });

    } else {
      return;
    }

  }

  // 主页面加载
  function ajaxReq() {
    $.ajax({
      type: "GET",
      url: "../admin/company",
      dataType: "json",
      success: function (data) {
        if (data.code == 200) {

          nowPage = data.data.current_page;
          data.data.data.forEach(function (item) {
            let itemStatus = ''
            if (item.status == 1) {
              itemStatus = '审核'
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
              <td>
                <input type="button" value="客服管理">
              </td>
              </tr>`;
            $('.SM-container-tbody').append($Otr);
          })

          // 总页数
          objNum = data.data.total;
          pageNum = Math.ceil(objNum / 10);

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

          // 总页数
          $('.SM-container-page-info-changePage span').text(pageNum);

          // 是否显示页码

          if (pageNum == 1) {
            $('.SM-container-page-info').css('display', 'none');
          } else {
            $('.SM-container-page-info').css('display', 'block');
          }

          // 是否显示省略号
          if (pageNum > 3) {
            $('.SM-container-page-info-more').css('display', 'inline-block');
          } else {
            $('.SM-container-page-info-more').css('display', 'none');
          }


        }

      },
      error: function (xhr) {
        console.log(xhr);
      }
    });
  }

  // 客服管理跳转页面的函数
  function PageSkipService(PageSkipService) {
    console.log(nowPageService);

    if (isNaN(PageSkipService) == false && PageSkipService != '') {

      $('.SM-container-tbody-info').empty();

      // 根据页码请求数据
      $.ajax({
        type: "GET",
        async: false,
        url: baseURL + "/admin/customer",
        data: {
          company_id: parseInt(companyID),
          page: PageSkipService
        },
        dataType: "json",
        success: function (data) {
          if (data.code == 200) {

            nowPageService = data.data.current_page;

            data.data.data.forEach(function (item) {
              let itemStatus = ''
              if (item.status == 1) {
                itemStatus = '待审核'
              } else if (item.status == 2) {
                itemStatus = '启用'
              } else {
                itemStatus = '禁用'
              }
              var $Otr1 = `<tr>
              <td>${item.id}</td>
              <td>${item.cname}</td>
              <td>${item.tel}</td>
              <td>${item.created_at}</td>
              <td>${itemStatus}</td>
              <td>
                <input type="button" value="查看">
              </td>
              < /tr>`;
              $('.SM-container-tbody-info').append($Otr1);
            })


            // 总页数
            objNumService = data.data.total;
            pageNumService = Math.ceil(objNumService / 10);
            // 获取当前页数据的剩余条数
            nowPageDataNum = pageNumService * 10 - objNumService;

            // 总页数赋值
            $('.SM-container-page-info-changePage-service span').text(pageNumService);

            let firstPage = $('.SM-container-page-info>input:nth-of-type(1)').val();

            // 判断是否超过总页数
            if (PageSkipService > pageNumService) {
              nowPageService = pageNumService;
              PageSkipService = pageNumService;
            }
            // 判断是否为0页
            if (PageSkipService == 0) {
              nowPageService = 1;
              PageSkipService = 1;
            }

            // 给当前页码赋值
            if (pageNumService == 2) {
              $('.SM-container-page-info-secondPage-service').css('display', 'inline-block');
              $('.SM-container-page-info-thirdPage-service').css('display', 'none');
            } else if (pageNumService == 3) {
              $('.SM-container-page-info-secondPage-service').css('display', 'inline-block');
              $('.SM-container-page-info-thirdPage-service').css('display', 'inline-block');
            }
            if (pageNumService > 3) {
              // 给当前客服管理页码赋值
              $('.SM-container-page-info-secondPage-service').css('display', 'inline-block');
              $('.SM-container-page-info-thirdPage-service').css('display', 'inline-block');
            }


            // 点击下一页，页码跳页
            if ((PageSkipService > (parseInt(firstPage) + 2))) {

              $('.SM-container-page-info-service>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(PageSkipService) + parseInt(index) - 2
                $(item).val(i);
              })

              $('.SM-container-page-info-service>input').slice(0, 3).each(function (index, item) {
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
              $('.SM-container-page-info-service>input').slice(0, 3).each(function (index, item) {

                if (index == PageSkipService - firstPage) {

                  $(item).css('background', 'rgba(101, 186, 206, 1)');
                  $(item).css('color', '#fff');
                } else {
                  $(item).css('background', 'rgba(231, 231, 231, 1)');
                  $(item).css('color', '#000');
                }
              })
            }

            //点击上一页页码跳页
            if ((PageSkipService < (parseInt(firstPage)))) {
              $('.SM-container-page-info-service>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(PageSkipService) + parseInt(index)
                $(item).val(i);
              })

              $('.SM-container-page-info-service>input').slice(0, 3).each(function (index, item) {
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
            if (pageNumService == 1) {
              $('.SM-container-page-info-service').css('display', 'none');
            } else {
              $('.SM-container-page-info-service').css('display', 'block');
            }

            // 是否显示省略号
            if (pageNumService > 3 && nowPageService < pageNumService) {
              $('.SM-container-page-info-more-service').css('display', 'inline-block');
            } else {
              $('.SM-container-page-info-more-service').css('display', 'none');
            }

          }
        },
        error: function () {}
      });

    } else {
      return;
    }

  }

  // -------------------------------客服管理-------------------------

  // 查看客服信息
  $(document).on('click', ".SM-container-tbody input", function () {
    companyID = $(this).parent().prev().prev().prev().prev().text();
    companyNSME = $(this).parent().prev().prev().prev().text();
    $('.SM-container-tbody-info').empty();
    // 请求数据
    $.ajax({
      type: "GET",
      async: false,
      url: "../admin/customer",
      dataType: "json",
      data: {
        company_id: $(this).parent().prev().prev().prev().prev().text()
      },
      success: function (data) {
        if (data.code == 200) {

          nowPageService = data.data.current_page;

          data.data.data.forEach(function (item) {
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
            $('.SM-container-tbody-info').append($Otr);
          })
          $('.SM-container-info-title').text(companyNSME + '公司账号');


          // 给查看按钮添加点击事件  ， 查看客服详细信息
          $(document).on("click", ".SM-container-tbody-info input", function () {

            $('.SM-container-title').text(companyNSME + '公司账号');

            var serviceTel = $(this).parent().prev().prev().prev().text();
            var serviceName = $(this).parent().prev().prev().prev().prev().text();
            customer_id = $(this).parent().prev().prev().prev().prev().prev().text();
            if ($(this).parent().prev().text() == '待审核') {
              $('.SM-container-info').css('display', 'none');
              $('.SM-container-audit').animate({
                height: 'show'
              })
            } else if ($(this).parent().prev().text() == '禁用') {
              $('.SM-container-info').css('display', 'none');
              $('.SM-container-ban').animate({
                height: 'show'
              })
            } else {
              $('.SM-container-info').css('display', 'none');
              $('.SM-container-normal').animate({
                height: 'show'
              })
            }
            $('.SM-container-is-ban-form-input input:nth-of-type(1)').val(serviceName);
            $('.SM-container-is-ban-form-input input:nth-of-type(2)').val(serviceTel);
            $('.SM-container-is-ban-form-input input:nth-of-type(3)').val(companyNSME);

          })

          // 总页数
          objNumService = data.data.total;
          pageNumService = Math.ceil(objNumService / 10);
          // 获取当前页数据的剩余条数
          nowPageDataNum = pageNumService * 10 - objNumService;

          // 给当前页码赋值
          if (pageNumService == 2) {
            $('.SM-container-page-info-secondPage-service').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage-service').css('display', 'none');
          } else if (pageNumService == 3) {
            $('.SM-container-page-info-secondPage-service').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage-service').css('display', 'inline-block');
          }

          if (pageNumService > 3) {
            // 给当前客服管理页码赋值
            $('.SM-container-page-info-secondPage-service').css('display', 'inline-block');
            $('.SM-container-page-info-thirdPage-service').css('display', 'inline-block');
          }

          // 总页数
          $('.SM-container-page-info-changePage-service span').text(pageNumService);

          // 是否显示页码
          if (pageNumService == 1) {
            $('.SM-container-page-info').css('display', 'none');
          } else {
            $('.SM-container-page-info').css('display', 'block');
          }

          // 是否显示省略号
          if (pageNumService > 3) {
            $('.SM-container-page-info-more-service').css('display', 'inline-block');
          } else {
            $('.SM-container-page-info-more-service').css('display', 'none');
          }
        }
      },
      error: function (xhr) {
        console.log(xhr);
      }
    });

    $('.SM-container-box').css('display', 'none');
    $('.SM-container-info').animate({
      height: 'show'
    })

  })

  //客服管理页面返回主页面

  $('.SM-container-info-return').click(function () {
    PageSkip(nowPage)
    $('.SM-container-info').css('display', 'none');
    $('.SM-container-box').animate({
      height: 'show'
    })
  })

  //点击上一页下一页页码 页码跳转和样式改变
  $(document).on('click', '.SM-container-page-info-firstPage', function () {
    let firstPage = $('.SM-container-page-info>input:nth-of-type(1)').val();
    if ($(this).val() == 1) {
      PageSkip($(this).val())
    } else {
      PageSkip($(this).val())
      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
        let i = parseInt(firstPage) + parseInt(index) - 1
        $(item).val(i);
      })

      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
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

  $(document).on('click', '.SM-container-page-info>input:nth-of-type(3)', function () {
    let firstPage = $('.SM-container-page-info>input:nth-of-type(1)').val();
    if ($(this).val() == pageNum) {
      PageSkip($(this).val())
    } else {
      PageSkip($(this).val())
      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
        let i = parseInt(firstPage) + parseInt(index) + 1
        $(item).val(i);
      })

      $('.SM-container-page-info>input').slice(0, 3).each(function (index, item) {
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

  // ------------------------------添加客服----------------------

  //添加客服按钮
  $('.SM-container-info-button').click(function () {

    $('.SM-container-title').text(companyNSME + '公司客服添加');
    $('.SM-container-addService-form-input input').eq(4).val(companyNSME + '公司');

    $('.SM-container-info').css('display', 'none');
    $('.SM-container-addService').animate({
      height: 'show'
    })

  })

  // 添加客服按钮提交
  $('.SM-container-form-bottom-addService-submit').click(function () {
        // 用户名验证
        let userStr = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (!userStr.test($('.SM-container-addService-form-input-name').val())) {
          $('.SM-container-addUser-form-input-serviceName').fadeIn(1000);
          setTimeout(function () {
            $('.SM-container-addUser-form-input-serviceName').fadeOut(1000);
          }, 6000)
        }
        // 手机号验证
        let telStr = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!telStr.test($('.SM-container-addService-form-input-tel').val())) {
          $('.SM-container-addUser-form-input-number').fadeIn(1000);
          setTimeout(function () {
            $('.SM-container-addUser-form-input-number').fadeOut(1000);
          }, 6000)
        }
        // 密码验证
        let passwordStr = /^[a-z0-9]+$/i;
        if (!passwordStr.test($('.SM-container-addService-form-input-password').val())) {
          $('.SM-container-addUser-form-input-password').fadeIn(1000);
          setTimeout(function () {
            $('.SM-container-addUser-form-input-password').fadeOut(1000);
          }, 6000)
        }
        // 确认密码验证
        if ($('.SM-container-addService-form-input-password').val() != $('.SM-container-addService-form-input-rePassword').val()) {
          $('.SM-container-addUser-form-input-rePassword').fadeIn(1000);
          setTimeout(function () {
            $('.SM-container-addUser-form-input-rePassword').fadeOut(1000);
          }, 6000)
          return 0;
        }

        if (!passwordStr.test($('.SM-container-addService-form-input-password').val()) || !telStr.test($('.SM-container-addService-form-input-tel').val()) || !userStr.test($('.SM-container-addService-form-input-name').val())) {
          return;
        }


    $.ajax({
      type: "post",
      url: baseURL + "/admin/customer",
      data: {
        customer_name: $('.SM-container-addService-form-input-name').val(),
        customer_phone: $('.SM-container-addService-form-input-tel').val(),
        customer_company_id: companyID,
        customer_password: $('.SM-container-addService-form-input-password').val(),
      },
      dataType: "json",
      success: function (data) {
        $('.SM-container-addService').css('display', 'none');
        $('.SM-container-info').animate({
          height: 'show'
        })
        PageSkipService(nowPageService);
      },
      error: function (error) {
        temp = '';
        error.responseJSON.data.forEach(element => {
          temp += element+'\n';
        });
         alert(temp);
      }
    });

    // 清空输入框
    $('.SM-container-addService-form-input-name').val('')
    $('.SM-container-addService-form-input-tel').val('')
    $('.SM-container-addService-form-input-password').val('')
    $('.SM-container-addService-form-input-rePassword').val('')
  })

  // 添加客服取消按钮
  $('.SM-container-form-bottom-addService-cancel').click(function () {

    $('.SM-container-addService').css('display', 'none');
    $('.SM-container-info').animate({
      height: 'show'
    })
    // 清空输入框
    $('.SM-container-addService-form-input-name').val('')
    $('.SM-container-addService-form-input-tel').val('')
    $('.SM-container-addService-form-input-password').val('')
    $('.SM-container-addService-form-input-rePassword').val('')

  })

  //待审核页面，审核通过
  $('.SM-container-form-bottom-audit-use').click(function () {
    serviceStatus(2);
  })

  // 待审核页面，禁用客服
  $('.SM-container-form-bottom-audit-ban').click(function () {

    serviceStatus(0);
  })

  // 禁用页面，启用客服
  $('.SM-container-form-bottom-ban-use').click(function () {
    serviceStatus(2);
  })

  // 禁用页面，删除客服
  $('.SM-container-form-bottom-ban-delete').click(function () {
    if (nowPageDataNum == 9) {
      nowPageService = nowPageService - 1;
    }
    serviceDelete();
  })

  // 启用页面，删除客服
  $('.SM-container-form-bottom-audit-delete').click(function () {

    if (nowPageDataNum == 9) {
      nowPageService = nowPageService - 1;
    }
    serviceDelete();
  })

  // 启用页面，禁用客服
  $('.SM-container-form-bottom-audit-delete').click(function () {
    serviceStatus(0);
  })

  // 客服状态提交
  function serviceStatus(serviceStatus) {
    $.ajax({
      type: "post",
      url: baseURL + "/admin/customer/changeCustomerState",
      data: {
        state: parseInt(serviceStatus),
        customer_id: customer_id,
      },
      dataType: "json",
      success: function (data) {

        PageSkipService(nowPageService);
        $('.SM-container-audit').css('display', 'none');
        $('.SM-container-ban').css('display', 'none');
        $('.SM-container-normal').css('display', 'none');
        $('.SM-container-info').animate({
          height: 'show'
        })
      }
    });
  }

  // 客服状态删除客服
  function serviceDelete() {
    $.ajax({
      type: "delete",
      async: false,
      url: baseURL + "/admin/customer",
      data: {
        customer_id: customer_id,
        state: 0
      },
      contentType: "application/x-www-form-urlencoded",
      success: function (data) {
        console.log(11);
        PageSkipService(nowPageService);
        $('.SM-container-audit').css('display', 'none');
        $('.SM-container-ban').css('display', 'none');
        $('.SM-container-normal').css('display', 'none');
        $('.SM-container-info').animate({
          height: 'show'
        })
      },
      error: function () {
        alert('删除失败！')
      }
    });
  }

})