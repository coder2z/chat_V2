$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    //取消查看页面
    $(".look-talk-right .hide-talk").click(function () {
        $(".main-two").css("display", "none")
        $(".main-one").animate({
            height: 'show'
        })
    })


    //交互部分
    $.ajax({
        type: 'get',
        url: "../company/getCustumerList/" + $('#companyId').val(),
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                //第一步，渲染数据
                let pagecontent = data.data.data;
                let lastpage = data.data.last_page;
                pagecontent.forEach(function (item) {

                    var con = `  											<ul class="pacon">				
												<li><input type="text" value="${item.fromid}" readonly=""/></li>
												<li><input type="text" value="${item.toname}" readonly=""/></li>
												<li><input type="text" value="${item.toid}" readonly=""/></li>
												<li><input type="text" value="${item.updated_at}" readonly=""/></li>
												<li><input type="text" value="${item.fromname}" readonly=""/></li>
												<li><span>查看</span></li>
											</ul>`
                    $(".box-son").append(con);
                })
                lookclick()

                //第二步，自动生成页码
                var pagebtn = data.data.last_page;
                $(".jump .pagez").text(pagebtn);
                for (var i = 1; i <= pagebtn; i++) {
                    var newpagebtn = '<div class="page pp">' + i + '</div>'
                    $(".pp").last().after(newpagebtn);
                    newpagebtn = ''
                }
                $(".page").eq(0).addClass("focus")
                //如果页码少于3，三个点消失
                if ($(".page").length < 3) {
                    $(".dian").css("display", "none")
                }
                changepage();
                //上一页的点击
                $(".last-page").click(function () {
                    if (chanpa > 0) {
                        chanpa--;
                        changepage();
                        if (chanpa + 3 == pagebtn) {
                            $(".dian").css("display", "none")
                        } else {
                            $(".dian").css("display", "block");
                        }
                    }
                })
                //下一页的点击

                $(".next-page").click(function () {
                    if (pagebtn == 1) {
                        return 0;
                    }
                    if (chanpa + 3 < pagebtn) {
                        chanpa++;
                        changepage();
                    }
                    if (chanpa + 3 == pagebtn) {
                        $(".dian").css("display", "none")
                    } else {
                        $(".dian").css("display", "block");
                    }
                })
                //页面的点击请求
                $(".page").click(function () {
                    var pagef = parseInt($(this).html());
                    $(".nowpage").text(pagef);
                    $.ajax({
                        type: 'get',

                        url: "../company/getCustumerList/" + $('#companyId').val() + "?page=" + pagef,
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 200) {
                                $(".pacon").remove();
                                var pagecontent = data.data.data;
                                pagecontent.forEach(function (item) {
                                    var con = `  											<ul class="pacon">				
												<li><input type="text" value="${item.id}" readonly=""/></li>
												<li><input type="text" value="${item.hot}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><span>查看</span></li>
											</ul>`
                                    $(".box-son").append(con);
                                })
                                lookclick();
                            } else {
                                alert('输入内容错误！');
                            }
                        }
                    });
                    if (pagef > 1) {
                        chanpa = pagef - 2;
                        changepage();
                    }
                    //点击添加类名
                    $(".page").each(function (index, item) {
                        $(this).removeClass("focus")
                    })
                    $(".page").eq(pagef - 1).addClass("focus");
                    if (pagef >= lastpage - 1) {
                        $(".dian").css("display", "none")
                    } else {
                        $(".dian").css("display", "block")
                    }
                });
                //上一页点击
                $(".last-page").click(function () {
                    if (pagebtn == 1) {
                        return 0;
                    }
                    var las = parseInt($(".nowpage").text());
                    if (las > 1) {
                        las--;
                    }
                    $.ajax({
                        type: 'get',
                        url: "../company/getCustumerList/" + $('#companyId').val() + "?page=" + las,
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 200) {
                                $(".pacon").remove();
                                var pagecontent = data.data.data;
                                pagecontent.forEach(function (item) {
                                    var con = `  											<ul class="pacon">				
												<li><input type="text" value="${item.id}" readonly=""/></li>
												<li><input type="text" value="${item.hot}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><span>查看</span></li>
											</ul>`
                                    $(".box-son").append(con);
                                    $(".jump .nowpage").text(las);
                                })
                                lookclick();
                            } else {
                                alert('输入内容错误！');
                            }
                        }
                    });
                    //上一页添加类名
                    $(".page").each(function (index, item) {
                        $(this).removeClass("focus")
                    })
                    $(".page").eq(las - 1).addClass("focus");
                })
                //下一页点击
                $(".next-page").click(function () {
                    if (pagebtn == 1) {
                        return 0;
                    }
                    var las = parseInt($(".nowpage").text());
                    if (las < lastpage) {
                        las++;
                    }
                    $.ajax({
                        type: 'get',
                        url: "../company/getCustumerList/" + $('#companyId').val() + "?page=" + las,
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 200) {
                                $(".pacon").remove();
                                var pagecontent = data.data.data;
                                pagecontent.forEach(function (item) {
                                    var con = `  											<ul class="pacon">				
												<li><input type="text" value="${item.id}" readonly=""/></li>
												<li><input type="text" value="${item.hot}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><span>查看</span></li>
											</ul>`
                                    $(".box-son").append(con);
                                    $(".jump .nowpage").text(las);
                                })
                                lookclick();
                            } else {
                                alert('输入内容错误！');
                            }
                        }
                    });
                    //下一页添加类名
                    $(".page").each(function (index, item) {
                        $(this).removeClass("focus")
                    })
                    $(".page").eq(las - 1).addClass("focus");
                })
                //跳转的enter
                $(".jump input").keydown(function (e) {
                    if (e.keyCode == 13) {
                        if ($(this).val() != '') {
                            var jumppage = parseInt($(this).val());
                            if (jumppage > lastpage) {
                                alert("请输入正确页码");
                                return
                            }
                            if (!isNaN(jumppage)) {
                            } else {
                                alert("请输入正确页码！");
                                return;
                            }
                            if (jumppage < 1) {
                                alert("请输入正确页码！");
                                return;
                            }
                            chanpa = jumppage - 1;
                            changepage();
                            if (jumppage > lastpage) {
                                alert("请输入正确页码");
                                return
                            }
                            $(".jump .nowpage").text(jumppage);
                            $.ajax({
                                type: 'get',
                                url: "../company/getCustumerList/" + $('#companyId').val() + "?page=" + jumppage,
                                dataType: "json",
                                success: function (data) {
                                    if (data.code == 200) {
                                        $(".pacon").remove();
                                        var pagecontent = data.data.data;
                                        pagecontent.forEach(function (item) {
                                            var con = `  											<ul class="pacon">				
												<li><input type="text" value="${item.id}" readonly=""/></li>
												<li><input type="text" value="${item.hot}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><input type="text" value="${item.question}" readonly=""/></li>
												<li><span>查看</span></li>
											</ul>`
                                            $(".box-son").append(con);
                                        })
                                        lookclick();
                                    } else {
                                        alert('输入内容错误！');
                                    }
                                }
                            });


                        }

                    }
                    //跳转添加类名
                    $(".page").each(function (index, item) {
                        $(this).removeClass("focus")
                    })
                    $(".page").eq(jumppage - 1).addClass("focus");
                    if (jumppage >= lastpage - 2) {
                        $(".dian").css("display", "none")
                    } else {
                        $(".dian").css("display", "block")
                    }
                })


                lookclick();

            } else {
                alert('输入内容错误！');
            }
        },
        error: function () {

        }
    });

//查看点击交互
    $(document).on("click", ".box-son ul li span", function () {
        $(".service_person").remove();
        $(".robot").remove();
        let taglog = $(this).parent().parent().children("li").eq(0).children("input").val();
        let serid = $(this).parent().parent().children("li").eq(2).children("input").val();
        taglog = parseInt(taglog);
        // $.ajax({
        //     type: 'get',
        //     url: "../company/dialog/feedback",
        //     dataType: "json",
        //     data: {
        //         userId: taglog,
        //         serId: serid
        //     },
        //     success: function (data) {
        //         if (data.code == 200 && data.data != null) {
        //             let content = data.data.content;
        //             $(".look-talk-right textarea").val(content)
        //         } else {
        //             alert('输入内容错误！');
        //         }
        //     },
        //     error: function () {
        //
        //     }
        // });
        //聊天交互
        $.ajax({
            type: 'post',
            url: "../company/dialog",
            dataType: "json",
            data: {
                userId: taglog,
                serId: serid
            },
            success: function (data) {
                if (data.code == 200) {
                    let content = data.data
                    let mark = data.data[0].fromid;
                    $(content).each(function (index, item) {
                        if (item.fromid == mark) {
                            let service = `			<div class="service_person">
												<!--头像-->
												
												<div class="service_person_hand">
													<img src="img/783A406729BFC674666C7579630EFB8B.jpg" alt="">
												</div>
												
												<!--聊天-->
												<div class="service_person_chat">
													<i></i>
													<p>${item.content}</p>
													
												</div>
												<div class="service">
													<span class="look-name">${item.fromname}</span>
													<span class="look-time">${item.created_at}</span>
												</div>
												
											</div>`
                            $(".chatContent_div").append(service)
                        } else {
                            let user = `					<div class="robot">
												<!--头像-->
												<div class="robot_hand">
													<img src="img/783A406729BFC674666C7579630EFB8B.jpg" alt="">
												</div>
												<!--聊天-->
												
												<div class="robot_chat">
													<i></i>
													<span>${item.content}</span>
												</div>
												<div class="user" style="float: right;">
														<span class="look-name">${item.fromname}</span>
													<span class="look-time">${item.created_at}</span>
												</div>
											</div>`
                            $(".chatContent_div").append(user)
                        }
                    })

                } else {
                    alert('输入内容错误！');
                }
            },
            error: function () {

            }
        });
    })


})


var monidd = {
    "msg": "成功",
    "code": 200,
    "data": {
        "current_page": 1,
        "data": [
            {
                "name": "1",
                "time": "2019",
                "content": "你好"
            },
            {
                "name": "2",
                "time": "2018",
                "content": "好的"
            },
            {
                "name": "3",
                "time": "2017",
                "content": "很好"
            },
            {
                "name": "4  ",
                "time": "2016",
                "content": "好几个"
            }
        ],
        "first_page_url": "http://127.0.0.1:1123/companies/{companyid}/showQuestions?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://127.0.0.1:1123/companies/{companyid}/showQuestions?page=1",
        "next_page_url": null,
        "path": "http://127.0.0.1:1123/companies/{companyid}/showQuestions",
        "per_page": 8,
        "prev_page_url": null,
        "to": 4,
        "total": 4
    }
}


//查看的点击
function lookclick() {

    //查看的点击
    $(".box-son ul li span").click(function () {
        $(".main-one").css("display", "none")
        $(".main-two").animate({
            height: 'show'
        })


    })
}

var chanpa = 0;

//页码变化函数
function changepage() {
    $(".page").css("display", "none");
    $(".page").slice(chanpa, chanpa + 3).css("display", "block");
}

