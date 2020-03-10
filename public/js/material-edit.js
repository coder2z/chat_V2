var questionID;
$(function () {
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });
  // 基础url
  var baseURL = '..';
  // 总页数
  var objNum;
  // 总页数
  var pageNum;
  //当前页数
  var nowPage;

  // 问题管理页面的数据渲染
  window.onload = function () {
    // 页面列表渲染
    // 鼠标点击的页码
    problemContent();
  }


  // 主页面搜索功能
  $('.ME-container-search-button').click(function () {
    searchProblem()
  })

  // 监听主页面跳转页码事件
  $('.ME-container-page-info-changePage>input').keydown(function (e) {
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


  // 监听搜索按钮事件
  $('.ME-container-search-input').keydown(function (e) {
    if (e.keyCode == 13) {
      if ($('.ME-container-search-input').val() != '') {
        searchProblem();
      } else {
        alert('请正确输入页码！');
      }
      $(this).val('')
    }

  });

  // 主页点击页码进行跳转
  $(document).on("click", '.ME-container-page-info>input',function () {
    PageSkip($(this).val());
  })

  // 上一页下一页

  $('.ME-container-page-info button').eq(0).click(function () {
    PageSkip(nowPage - 1);
  })
  $('.ME-container-page-info button').eq(1).click(function () {
    if (nowPage == pageNum) {
      PageSkip(nowPage);
    } else {
      PageSkip(nowPage + 1);
    }
  })

  // 跳转到页面详情页
  $(document).on('click', ".ME-container-tbody input", function () {

    let currentStatus = $(this).parent().prev().text();

    questionID = $(this).parent().prev().prev().prev().prev().prev().prev().text();


    // 请求数据
    $.ajax({
      type: "post",
      async: false,
      url: baseURL + "/admin/questions/detail",
      dataType: "json",
      data: {
        question_id: $(this).parent().prev().prev().prev().prev().prev().prev().text()
      },
      success: function (data) {
        if (data.code == 200) {
          console.log(data.data[0]);

          let intro = JSON.parse(data.data[0].intro);
          let method = JSON.parse(data.data[0].methed);
          let careful = JSON.parse(data.data[0].careful);

          // 标题
          $('.ME-container-intro-content-data-title').val(data.data[0].title);
          // 简介
          $('.ME-container-intro-content-data-intro').val(intro.jianjietext);
          //简介图片
          $('.ME-container-intro-content-img img').attr('src',intro.jianimg);

          // 方法步骤
          $('.ME-container-wayStep-content-data').empty();
          $(method.content).each(function (index, item) {

            var $methodStr = `<div class="ME-container-wayStep-content-data-item">
                  <span>${index+1}</span>
                  <textarea  name="" id="" cols="30" rows="10">${item.way}</textarea>
                  <div class = "ME-container-wayStep-content-data-item-img"
                  style = "background: url(${item.img}) no-repeat; background-position: center;
                  background-size: 150px 103px;"  >
                  </div>
                  <div class="ME-container-wayStep-content-data-item-button">
                    <button onmousemove="addDrag(this)" onmouseout="removeDrag(this)">x</button>
                    <button>-</button>
                    <button>+</button>
                  </div>
                </div>`;

            $('.ME-container-wayStep-content-data').append($methodStr);
          })

          //注意事项
          $('.ME-container-notice-content-data').empty();
          $(careful.content).each(function (index, item) {

            var $carefulStr = `<div class="ME-container-notice-content-data-item">
                  <span></span>
                  <input value="${item}" class="ME-container-notice-content-data-item-careful" type="text" >
                  <div>x</div>
                </div>`;

            $('.ME-container-notice-content-data').append($carefulStr);
          })

          // 按钮的渲染
          if (currentStatus == '待审核') {
            $('.ME-container-content-button input').eq(0).val('禁用');
            $('.ME-container-content-button input').eq(2).val('审核通过');
          } else if (currentStatus == '禁用') {
            $('.ME-container-content-button input').eq(0).val('启用');
            $('.ME-container-content-button input').eq(2).val('删除');
          } else {
            $('.ME-container-content-button input').eq(0).val('禁用');
            $('.ME-container-content-button input').eq(2).val('删除');
          }

          $('.ME-container-main').css('display', 'none');
          $('.ME-container-intro-unchecked').animate({
            height: 'show'
          })

        }
      },
      error: function (xhr) {
        console.log(xhr);
      }
    });

  })

  // 按钮事件点击
  $(".ME-container-content-button input").on("click", function () {

    if ($(this).val() == '审核通过') {
      problemEvent(2);

    } else if ($(this).val() == '禁用') {
      problemEvent(0);
    } else if ($(this).val() == '启用') {
      problemEvent(2);
    } else if ($(this).val() == '预览') {

    } else if ($(this).val() == '删除') {
      deleteProblem()
    }
  })


//点击上一页下一页页码 页码跳转和样式改变
$(document).on('click', '.ME-container-page-info-firstPage', function () {
  let firstPage = $('.ME-container-page-info>input:nth-of-type(1)').val();
  if ($(this).val() == 1) {
    PageSkip($(this).val())
  } else {
    PageSkip($(this).val())
    $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
      let i = parseInt(firstPage) + parseInt(index) - 1
      $(item).val(i);
    })

    $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
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

$(document).on('click', '.ME-container-page-info>input:nth-of-type(3)', function () {
  let firstPage = $('.ME-container-page-info>input:nth-of-type(1)').val();
  if ($(this).val() == pageNum) {
    PageSkip($(this).val())
  } else {
    PageSkip($(this).val())
    $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
      let i = parseInt(firstPage) + parseInt(index) + 1
      $(item).val(i);
    })

    $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
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

  // 删除问题函数
  function deleteProblem() {

    $('.ME-container-tbody').empty();

    $.ajax({
      type: "delete",
      url: baseURL + "/admin/questions",
      data: {
        question_id: questionID,
      },
      dataType: "json",
      success: function (response) {

        problemContent();

        $('.ME-container-intro-unchecked').css('display', 'none');
        $('.ME-container-main').animate({
          height: 'show'
        })
      },
      error: function () {
        alert('失败')
      }
    });


  }

  // 按钮事件处理函数
  function problemEvent(state) {

    $('.ME-container-tbody').empty();

    $.ajax({
      type: "post",
      url: baseURL + "/admin/questions/changeState",
      data: {
        question_id: questionID,
        state: parseInt(state)
      },
      dataType: "json",
      success: function (response) {

        problemContent();

        $('.ME-container-intro-unchecked').css('display', 'none');
        $('.ME-container-main').animate({
          height: 'show'
        })
      },
      error: function () {
        alert('失败')
      }
    });


  }

  // 页面全部问题数据加载
  function problemContent() {

    $.ajax({
      type: "GET",
      url: baseURL + "/admin/questions",
      dataType: "json",
      success: function (data) {
        if (data.code == 200) {

          nowPage = data.data.current_page;
          data.data.data.forEach(function (item) {

            let itemStatus = ''
            if (item.question_state == 1) {
              itemStatus = '待审核'
            } else if (item.question_state == 2) {
              itemStatus = '启用'
            } else {
              itemStatus = '禁用'
            }

            var $Otr = `<tr>
              <td>${item.question_id}</td>
              <td>${item.question_title}</td>
              <td>${item.question_author}</td>
              <td>${item.question_create_time}</td>
              <td>${item.question_access_time}</td>
              <td>${itemStatus}</td>
              <td>
                <input type="button" value="查看">
              </td>
              </tr>`;
            $('.ME-container-tbody').append($Otr);
          })

          // 总页数
          objNum = data.data.total;
          pageNum = Math.ceil(objNum / 10);

          // 给当前页码赋值
          if (pageNum == 2) {
            for (var i = 2; i >= 2; i--) {
              var pageButton = `<input type="button" value="${i}">`;
              $('.ME-container-page-info-firstPage').after(pageButton)
            }
          } else if (pageNum == 3) {
            for (var i = 3; i >= 2; i--) {
              var pageButton = `<input type="button" value="${i}">`;
              $('.ME-container-page-info-firstPage').after(pageButton)
            }
          }

          if(pageNum > 3){
              // 给当前主页页码赋值
              for (var i = 3; i >= 2; i--) {
                var pageButton = `<input type="button" value="${i}">`;
                $('.ME-container-page-info-firstPage').after(pageButton)
              }
          }

          // 总页数
          $('.ME-container-page-info-changePage span').text(pageNum);

          // 是否显示页码
          if (pageNum == 1) {
            $('.ME-container-page-info').css('display', 'none');
          } else {
            $('.ME-container-page-info').css('display', 'block');
          }

          // 是否显示省略号
          if (pageNum > 3) {
            $('.ME-container-page-info-more').css('display', 'inline-block');
          } else {
            $('.ME-container-page-info-more').css('display', 'none');
          }

        }

      },
      error: function (xhr) {
        console.log(xhr);
      }
    });

  }

  // 主页面跳转页面的函数
  function PageSkip(pageSkip) {

    if (isNaN(pageSkip) == false && pageSkip != '') {

      $('.ME-container-tbody').empty();

      // 根据页码请求数据
      $.ajax({
        type: "GET",
        async: false,
        url: baseURL + "/admin/questions",
        data: {
          page: pageSkip
        },
        dataType: "json",
        success: function (data) {
          if (data.code == 200) {
            nowPage = data.data.current_page;
            data.data.data.forEach(function (item) {
              let itemStatus = ''
              if (item.question_state == 1) {
                itemStatus = '待审核'
              } else if (item.question_state == 2) {
                itemStatus = '启用'
              } else {
                itemStatus = '禁用'
              }

              var $Otr = `<tr>
              <td>${item.question_id}</td>
              <td>${item.question_title}</td>
              <td>${item.question_author}</td>
              <td>${item.question_create_time}</td>
              <td>${item.question_access_time}</td>
              <td>${itemStatus}</td>
              <td>
                <input type="button" value="查看">
              </td>
              </tr>`;
              $('.ME-container-tbody').append($Otr);
            })


            // 总页数
            objNum = data.data.total;
            pageNum = Math.ceil(objNum / 10);

            // 总页数
            $('.ME-container-page-info-changePage span').text(pageNum);

            let firstPage = $('.ME-container-page-info>input:nth-of-type(1)').val();

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

              $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index) - 2
                $(item).val(i);
              })

              $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
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
              $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {

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


              $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
                let i = parseInt(pageSkip) + parseInt(index)
                $(item).val(i);
              })

              $('.ME-container-page-info>input').slice(0, 3).each(function (index, item) {
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
              $('.ME-container-page-info').css('display', 'none');
            } else {
              $('.ME-container-page-info').css('display', 'block');
            }

            // 是否显示省略号
            if (pageNum > 3 && nowPage < pageNum ) {
              $('.ME-container-page-info-more').css('display', 'inline-block');
            } else {
              $('.ME-container-page-info-more').css('display', 'none');
            }

          }
        },
        error: function () {}
      });

    } else {
      return;
    }

  }

  // 搜索问题方法
  function searchProblem() {
    var searchProblem = $('.ME-container-search-input').val();
    $('.ME-container-tbody').empty();
    $.ajax({
      type: "GET",
      url: baseURL + "/admin/questions/search",
      dataType: "json",
      data: {
        search_content: searchProblem
      },
      success: function (data) {
        if (data.code == 200) {

          nowPage = data.data.current_page;
          data.data.data.forEach(function (item) {

            let itemStatus = ''
            if (item.question_state == 1) {
              itemStatus = '待审核'
            } else if (item.question_state == 2) {
              itemStatus = '启用'
            } else {
              itemStatus = '禁用'
            }

            var $Otr = `<tr>
              <td>${item.question_id}</td>
              <td>${item.question_title}</td>
              <td>${item.question_author}</td>
              <td>${item.question_create_time}</td>
              <td>${item.question_access_time}</td>
              <td>${itemStatus}</td>
              <td>
                <input type="button" value="查看">
              </td>
              </tr>`;
            $('.ME-container-tbody').append($Otr);
          })

          // 总页数
          objNum = data.data.total;
          pageNum = Math.ceil(objNum / 10);

          // 总页数
          $('.ME-container-page-info-changePage span').text(pageNum);

          // 是否显示页码

          if (pageNum == 1) {
            $('.ME-container-page-info').css('display', 'none');
          } else {
            $('.ME-container-page-info').css('display', 'block');
          }

          // 是否显示省略号
          if (pageNum > 3) {
            $('.ME-container-page-info-more').css('display', 'inline-block');
          } else {
            $('.ME-container-page-info-more').css('display', 'none');
          }

        }

      },
      error: function (xhr) {
        console.log(xhr);
      }
    });

  }
  $('.ME-container-content-button-preview').click(function () {
    window.open("../articles/" + questionID);
  })
})