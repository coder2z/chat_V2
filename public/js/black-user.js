$(function() {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
threeway = 1;
	$(".back-btn").click(function() {
		$(".black-main-two").css('display', "none");
		$(".black-main-one").animate({
			height: 'show'
		})
	})
	$.ajax({
		type: 'get',
		url: "../blacklists/"+$('#companyId').val(),
		dataType: "json",
		success: function(data) {
			if(data.code == 200) {
				$(".page").remove();
				$(".pacon").remove();
				//第一步，渲染数据
				let pagecontent = data.data.data;
				let lastpage = data.data.last_page;
				pagecontent.forEach(function(item) {
					let html = '';
					if(item.status === "0") {
						html = '禁用'
					} else if(item.status === "1") {
						html = '待审核'
					} else {
						html = '启用'
					}

					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
					$(".black-user-box").append(con);
				})
				//第二步，自动生成页码				                       
				let pagebtn = data.data.last_page;
				$(".jump .pagez").text(pagebtn);
				for(let i = 1; i <= pagebtn; i++) {
					let newpagebtn = '<div class="page pp">' + i + '</div>'
					$(".pp").last().after(newpagebtn);
					newpagebtn = ''
				}
				$(".page").eq(0).addClass("focus")
				//如果页码少于3，三个点消失
				if($(".page").length < 3) {
					$(".dian").css("display", "none")
				}
				changepage();
				
				//上一页的点击
				$(".last-page").click(function() {
					if(threeway == 1){
					console.log(threeway)
					  	if(pagebtn==1){
       		            return 0;
                 	}
					if(chanpa > 0) {
						chanpa--;
						changepage();
						if(chanpa + 3 == pagebtn) {
							$(".dian").css("display", "none")
						} else {
							$(".dian").css("display", "block");
						}
					}
					}
				})
				//下一页的点击

				$(".next-page").click(function() {
					if(threeway == 1){
					  	if(pagebtn==1){
       		return 0;
       	}
					if(chanpa + 3 < pagebtn) {
						chanpa++;
						changepage();
					}
					if(chanpa + 3 == pagebtn) {
						$(".dian").css("display", "none")
					} else {
						$(".dian").css("display", "block");
					}
					}
				})

				//页面的点击请求
				$(".page").click(function() {
					let pagef = parseInt($(this).html());
					$(".nowpage").text(pagef);
					$.ajax({
						type: 'get',
						url: "../blacklists/"+$('#companyId').val()+"?page=" + pagef,
						dataType: "json",
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								let pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									let html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
								})
								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
      if(pagef>1){
      	chanpa = pagef-2;
      	changepage();
      }
      							      //点击添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
			$(".page").eq(pagef-1).addClass("focus");
			  if (pagef >= lastpage - 1) {
			  	$(".dian").css("display", "none")
			  } else {
			  	$(".dian").css("display", "block")
			  }
				});

				//上一页点击
				$(".last-page").click(function() {
					if(threeway == 1){
					  	if(pagebtn==1){
       		return 0;
       	}
					let las = parseInt($(".nowpage").text());
					if(las > 1) {
						las--;
					}
					$.ajax({
						type: 'get',
						url: "../blacklists/"+$('#companyId').val()+"?page=" + las,
						dataType: "json",
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								let pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									let html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
									$(".jump .nowpage").text(las);
								})
								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
												      //上一页添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(las-1).addClass("focus");
      }
				})

				//下一页点击
				$(".next-page").click(function() {
					if(threeway == 1){
					  	if(pagebtn==1){
       		return 0;
       	}
					let las = parseInt($(".nowpage").text());
					if(las < lastpage) {
						las++;
					}
					$.ajax({
						type: 'get',
						url: "../blacklists/"+$('#companyId').val()+"?page=" + las,
						dataType: "json",
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								let pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									let html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
													var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
									$(".jump .nowpage").text(las);
								})

								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
												      //下一页添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(las-1).addClass("focus");
      }
				})

				//跳转的enter   
				$(".jump input").keydown(function(e) {
					if(threeway == 1){
					if(e.keyCode == 13) {
						if($(this).val() != '') {
							var jumppage = parseInt($(this).val());
							if(jumppage > lastpage) {
								alert("请输入正确页码");
								return
							}
							if(!isNaN(jumppage)) {} else {
								alert("请输入正确页码！");
								return;
							}
							if(jumppage < 1) {
								alert("请输入正确页码！");
								return;
							}
							chanpa = jumppage - 1;
							changepage();
							if(jumppage > lastpage) {
								alert("请输入正确页码");
								return
							}
							$(".jump .nowpage").text(jumppage);
							$.ajax({
								type: 'get',
								url: "../blacklists/"+$('#companyId').val()+"?page=" + jumppage,
								dataType: "json",
								success: function(data) {
									if(data.code == 200) {
										$(".pacon").remove();
										let pagecontent = data.data.data;
										pagecontent.forEach(function(item) {
											let html = '';
											if(item.status === "0") {
												html = '禁用'
											} else if(item.status === "1") {
												html = '待审核'
											} else {
												html = '启用'
											}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
											$(".black-user-box").append(con);
										})
										lookinformation();

									} else {
										alert('输入内容错误！');
									}
								}
							});

						}

					}
												      //跳转添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(jumppage-1).addClass("focus");
           if(jumppage>=lastpage-2){
      	$(".dian").css("display","none")
      }else{
      	$(".dian").css("display","block")
      }
      }
				})

				lookinformation();
				
								//搜索的交互
$(".search-input").keydown(function(e){
	if(e.keyCode == 13){
		ajx("../blacklists/search/"+$('#companyId').val()+"\n","../blacklists/search/"+$('#companyId').val()+"?page=");
	}
})
$(".search-btn").click(function(){
	ajx("../blacklists/search/"+$('#companyId').val()+"\n","../blacklists/search/"+$('#companyId').val()+"?page=");

})
$(".select").change(function(){
	let option = $(this).children('option:selected').val();
	if(option == '禁用'){
		statechance("../blacklists/state/"+$('#companyId').val(),"../blacklists/state/"+$('#companyId').val()+"?page=",3,0,3)
	}
	if(option == '待审核'){
		statechance("../blacklists/state/"+$('#companyId').val(),"../blacklists/state/"+$('#companyId').val()+"?page=",4,1,4)

	}
	if(option == '全部'){
		window.location.reload()
	}
})
//移出或者加入黑名单
$(".delete-black").click(function(){
	console.log($(this).text())
  if($(this).text()=='移出黑名单'){
		  blackid = parseInt(blackid);
			  $.ajax({
			  type: 'post',
			  url: "../blacklists/updateState",
			  dataType: "json",
			  data:{
				  black_id:blackid,
				  black_state:2
			  },
			  success: function(data) {
				  if(data.code == 200) {		
					alert('该用户已被移出黑名单！');
					window.location.reload()
				  } else {
					  alert('输入内容错误！');
				  }
			  },
			  error: function() {
  
			  }
		  });
  }else{
			  blackid = parseInt(blackid);
			  $.ajax({
			  type: 'post',
			  url: "../blacklists/updateState",
			  dataType: "json",
			  data:{
				  black_id:blackid,
				  black_state:0
			  },
			  success: function(data) {
				  if(data.code == 200) {		
					alert('该用户已被加入黑名单！');
					window.location.reload()
				  } else {
					  alert('输入内容错误！');
				  }
			  },
			  error: function() {
  
			  }
		  });
  }
  return 0;
  
  })









			} else {
				alert('输入内容错误！');
			}
		},
		error: function() {

		}
		
	});



})
var threeway;

function lookinformation() {
	//点击查看 		
	$(".look-balck-user").click(function() {
		let what = $(this).parent("li").prevAll().eq(0).children("input").val();
		if (what == '禁用') {
			$('.delete-black').text("移出黑名单")
		} else{
			$('.delete-black').text("加入黑名单")
		}
		$(".black-main-one").css('display', "none");
		$(".black-main-two").animate({
			height: 'show'
		})
		let black = $(this).parent("li").prevAll().eq(6).children("input").val();
        blackid = black;
		//下面是黑名单详情的交互
		$.ajax({
			type: 'get',
			url: "../blacklists/detail/" + black,
			dataType: "json",
			success: function(data) {
				if(data.code == 200) {
					console.log(data)
					let name = data.data[0].name;
					let phone = data.data[0].phone;
					let information = JSON.parse(data.data[0].evidence);
					$(".black-main-two #user-name").val(name);
					$(".black-main-two #name").val(name);
					$(".black-main-two #phone").val(phone);
					$(".black-main-two #black-info").val(information.content);
					$(".black-main-two #black-img").attr("src", information.imgUrl);
				} else {
					alert('输入内容错误！');
				}
			},
			error: function() {

			}
		});
	})
}
var chanpa = 0;
//页码变化函数
function changepage() {
	$(".page").css("display", "none");
	$(".page").slice(chanpa, chanpa + 3).css("display", "block");
}

function search(){
	let sear =  $(".search-input").val();
			$.ajax({
			type: 'post',
			url: "../blacklists/search/"+$('#companyId').val(),
			dataType: "json",
			data:{
				search_content:sear
			},
			success: function(data) {
				if(data.code == 200) {
					console.log(data)
//                							$(".pacon").remove();
//								let pagecontent = data.data.data;
//								pagecontent.forEach(function(item) {
//									var html = '';
//									if(item.status === "0") {
//										html = '禁用'
//									} else if(item.status === "1") {
//										html = '待审核'
//									} else {
//										html = '启用'
//									}
//									var con = `              	 	<ul class="pacon">
//                     		<li>	<input type="text" value="${item.userID}" readonly=""/></li>
//                     		<li>	<input type="text" value="${item.name}" readonly=""/></li>
//                     		<li>	<input type="text" value="${item.name}" readonly=""/></li>
//                     		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
//                     		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
//                     		<li>	<input type="text" value="战争学院" readonly=""/></li>
//                     		<li>	<input type="text" value="${html}" readonly=""/></li>
//                     		<li><span class="look-balck-user">查看</span></li>
//                     	</ul>`
//									$(".black-user-box").append(con);
//								})
//								lookinformation();
				} else {
					alert('请输入正确用户名！');
				}
			},
			error: function() {

			}
		});
}

var blackid;
//定义移出黑名单id



function ajx(src,src2){
	var sear =  $(".search-input").val();
			$.ajax({
			type: 'post',
			url: src,
			dataType: "json",
			data:{
				search_content:sear
			},
		success: function(data) {
			if(data.code == 200){
			threeway = 2;
	       $(".page").remove();
	       $(".black-user-box ul").not($(".black-user-box ul").eq(0)).remove()
				console.log(data)
				$(".pacon").remove();
				if(threeway ==2){
				//第一步，渲染数据
				let pagecontent = data.data.data;
				let lastpage = data.data.last_page;
				pagecontent.forEach(function(item) {
					var html = '';
					if(item.status === "0") {
						html = '禁用'
					} else if(item.status === "1") {
						html = '待审核'
					} else {
						html = '启用'
					}

					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
					$(".black-user-box").append(con);
				})
				//第二步，自动生成页码				                       
				var pagebtn = data.data.last_page;
				$(".jump .pagez").text(pagebtn);
				for(var i = 1; i <= pagebtn; i++) {
					var newpagebtn = '<div class="page pp">' + i + '</div>'
					$(".pp").last().after(newpagebtn);
					newpagebtn = ''
				}
				$(".page").eq(0).addClass("focus")
				//如果页码少于3，三个点消失
				if($(".page").length < 3) {
					$(".dian").css("display", "none")
				}
				changepage();
				//上一页的点击
				$(".last-page").click(function() {
					if(threeway == 2){
					  	if(pagebtn==1){
       		return 0;
       	}
					if(chanpa > 0) {
						chanpa--;
						changepage();
						if(chanpa + 3 == pagebtn) {
							$(".dian").css("display", "none")
						} else {
							$(".dian").css("display", "block");
						}
					}
					}
				})
				//下一页的点击

				$(".next-page").click(function() {
					if(threeway == 2){
					  	if(pagebtn==1){
       		return 0;
       	}
					if(chanpa + 3 < pagebtn) {
						chanpa++;
						changepage();
					}
					if(chanpa + 3 == pagebtn) {
						$(".dian").css("display", "none")
					} else {
						$(".dian").css("display", "block");
					}
					}
				})

				//页面的点击请求
				$(".page").click(function() {
					var pagef = parseInt($(this).html());
					$(".nowpage").text(pagef);
					$.ajax({
						type: 'post',
						url: src2 + pagef,
						dataType: "json",
						data:{
				search_content:sear
			},
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								var pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									var html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
								})
								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
      if(pagef>1){
      	chanpa = pagef-2;
      	changepage();
      }
      							      //点击添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
			$(".page").eq(pagef-1).addClass("focus");
			  if (pagef >= lastpage - 1) {
			  	$(".dian").css("display", "none")
			  } else {
			  	$(".dian").css("display", "block")
			  }
				});

				//上一页点击
				$(".last-page").click(function() {
					if(threeway == 2){
					  	if(pagebtn==1){
       		return 0;
       	}
					var las = parseInt($(".nowpage").text());
					if(las > 1) {
						las--;
					}
					$.ajax({
						type: 'post',
						url: src2 + las,
						dataType: "json",
						data:{
				search_content:sear
			},
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								var pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									var html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
									$(".jump .nowpage").text(las);
								})
								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
												      //上一页添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(las-1).addClass("focus");
      }
				})

				//下一页点击
				$(".next-page").click(function() {
					if(threeway == 2){
					  	if(pagebtn==1){
       		return 0;
       	}
					var las = parseInt($(".nowpage").text());
					if(las < lastpage) {
						las++;
					}
					$.ajax({
						type: 'post',
						url: src2 + las,
						dataType: "json",
						data:{
				search_content:sear
			},
			
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								var pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									var html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
									$(".jump .nowpage").text(las);
								})

								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
												      //下一页添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(las-1).addClass("focus");
      }
				})

				//跳转的enter   
				$(".jump input").keydown(function(e) {
					if(threeway == 2){
					if(e.keyCode == 13) {
						if($(this).val() != '') {
							var jumppage = parseInt($(this).val());
							if(jumppage > lastpage) {
								alert("请输入正确页码");
								return
							}
							if(!isNaN(jumppage)) {} else {
								alert("请输入正确页码！");
								return;
							}
							if(jumppage < 1) {
								alert("请输入正确页码！");
								return;
							}
							chanpa = jumppage - 1;
							changepage();
							if(jumppage > lastpage) {
								alert("请输入正确页码");
								return
							}
							$(".jump .nowpage").text(jumppage);
							$.ajax({
								type: 'post',
								url: src2 + jumppage,
								dataType: "json",
								data:{
				search_content:sear
			},
								success: function(data) {
									if(data.code == 200) {
										$(".pacon").remove();
										var pagecontent = data.data.data;
										pagecontent.forEach(function(item) {
											var html = '';
											if(item.status === "0") {
												html = '禁用'
											} else if(item.status === "1") {
												html = '待审核'
											} else {
												html = '启用'
											}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
											$(".black-user-box").append(con);
										})
										lookinformation();

									} else {
										alert('输入内容错误！');
									}
								}
							});

						}

					}
												      //跳转添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(jumppage-1).addClass("focus");
           if(jumppage>=lastpage-2){
      	$(".dian").css("display","none")
      }else{
      	$(".dian").css("display","block")
      }
      }
				})

				lookinformation();



}
			} else {
				alert('输入内容错误！');
			}
			
		},
		error: function() {

		}
	});
	
}
function statechance(src,src2,num,num2,num3){
    $(".nowpage").text(1)
			$.ajax({
			type: 'post',
			url: src,
			dataType: "json",
			data:{
				state:num2
			},
		success: function(data) {
			if(data.code == 200){
			threeway = num;
	       $(".page").remove();
	       $(".black-user-box ul").not($(".black-user-box ul").eq(0)).remove()
                 console.log(data)
				$(".pacon").remove();
				if(threeway==num3){
				//第一步，渲染数据
				let pagecontent = data.data.data;
				let lastpage = data.data.last_page;
				pagecontent.forEach(function(item) {
					var html = '';
					if(item.status === "0") {
						html = '禁用'
					} else if(item.status === "1") {
						html = '待审核'
					} else {
						html = '启用'
					}

					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
					$(".black-user-box").append(con);
				})
				//第二步，自动生成页码				                       
				var pagebtn = data.data.last_page;
				$(".jump .pagez").text(pagebtn);
				for(var i = 1; i <= pagebtn; i++) {
					var newpagebtn = '<div class="page pp">' + i + '</div>'
					$(".pp").last().after(newpagebtn);
					newpagebtn = ''
				}
				$(".page").eq(0).addClass("focus")
				//如果页码少于3，三个点消失
				if($(".page").length < 3) {
					$(".dian").css("display", "none")
				}
				changepage();
				//上一页的点击
				$(".last-page").click(function() {
					if(threeway == num3){
					  	if(pagebtn==1){
       		return 0;
       	}
					if(chanpa > 0) {
						chanpa--;
						changepage();
						if(chanpa + 3 == pagebtn) {
							$(".dian").css("display", "none")
						} else {
							$(".dian").css("display", "block");
						}
					}
					}
				})
				//下一页的点击

				$(".next-page").click(function() {
					if(threeway == num3){
					  	if(pagebtn==1){
       		return 0;
       	}
					if(chanpa + 3 < pagebtn) {
						chanpa++;
						changepage();
					}
					if(chanpa + 3 == pagebtn) {
						$(".dian").css("display", "none")
					} else {
						$(".dian").css("display", "block");
					}
					}
				})

				//页面的点击请求
				$(".page").click(function() {
					var pagef = parseInt($(this).html());
					$(".nowpage").text(pagef);
					$.ajax({
						type: 'post',
						url: src2 + pagef,
						dataType: "json",
						data:{
				state:num2
			},
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								var pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									var html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
								})
								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
      if(pagef>1){
      	chanpa = pagef-2;
      	changepage();
      }
      							      //点击添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
			$(".page").eq(pagef-1).addClass("focus");
			  if (pagef >= lastpage - 1) {
			  	$(".dian").css("display", "none")
			  } else {
			  	$(".dian").css("display", "block")
			  }
				});

				//上一页点击
				$(".last-page").click(function() {
					if(threeway == num3){
					  	if(pagebtn==1){
       		return 0;
       	}
					var las = parseInt($(".nowpage").text());
					if(las > 1) {
						las--;
					}
					$.ajax({
						type: 'post',
						url: src2 + las,
						dataType: "json",
						data:{
				state:num2
			},
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								var pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									var html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
									$(".jump .nowpage").text(las);
								})
								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
												      //上一页添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(las-1).addClass("focus");
      }
				})

				//下一页点击
				$(".next-page").click(function() {
					if(threeway == num3){
					  	if(pagebtn==1){
       		return 0;
       	}
					var las = parseInt($(".nowpage").text());
					if(las < lastpage) {
						las++;
					}
					$.ajax({
						type: 'post',
						url: src2 + las,
						dataType: "json",
						data:{
				state:num2
			},
			
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								var pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
									var html = '';
									if(item.status === "0") {
										html = '禁用'
									} else if(item.status === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
									$(".black-user-box").append(con);
									$(".jump .nowpage").text(las);
								})

								lookinformation();

							} else {
								alert('输入内容错误！');
							}
						}
					});
												      //下一页添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(las-1).addClass("focus");
      }
				})

				//跳转的enter   
				$(".jump input").keydown(function(e) {
					if(threeway == num3){
					if(e.keyCode == 13) {
						if($(this).val() != '') {
							var jumppage = parseInt($(this).val());
							if(jumppage > lastpage) {
								alert("请输入正确页码");
								return
							}
							if(!isNaN(jumppage)) {} else {
								alert("请输入正确页码！");
								return;
							}
							if(jumppage < 1) {
								alert("请输入正确页码！");
								return;
							}
							chanpa = jumppage - 1;
							changepage();
							if(jumppage > lastpage) {
								alert("请输入正确页码");
								return
							}
							$(".jump .nowpage").text(jumppage);
							$.ajax({
								type: 'post',
								url: src2 + jumppage,
								dataType: "json",
								data:{
				state:num2
			},
								success: function(data) {
									if(data.code == 200) {
										$(".pacon").remove();
										var pagecontent = data.data.data;
										pagecontent.forEach(function(item) {
											var html = '';
											if(item.status === "0") {
												html = '禁用'
											} else if(item.status === "1") {
												html = '待审核'
											} else {
												html = '启用'
											}
					var con = `              	 	<ul class="pacon">
                       		<li>	<input type="text" value="${item.black_list_id}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.name}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.serviceName}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.phone}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_time}" readonly=""/></li>
                       		<li>	<input type="text" value="${item.forbidden_company}" readonly=""/></li>
                       		<li>	<input type="text" value="${html}" readonly=""/></li>
                       		<li><span class="look-balck-user">查看</span></li>
                       	</ul>`
											$(".black-user-box").append(con);
										})
										lookinformation();

									} else {
										alert('输入内容错误！');
									}
								}
							});

						}

					}
												      //跳转添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(jumppage-1).addClass("focus");
           if(jumppage>=lastpage-2){
      	$(".dian").css("display","none")
      }else{
      	$(".dian").css("display","block")
      }
      }
				})

				lookinformation();



}
			} else {
				alert('输入内容错误！');
			}
			
		},
		error: function() {

		}
	});
	
}