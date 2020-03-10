$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
  });
$(function(){
	
	var fir = '';
	//添加问答三个点击换页面
	function addque(a) {
		$(".Questions-content-content-left ul li").eq(a).click(function() {
			$(".Questions-content-content-right-content").css("display", "none");
			$(".Questions-content-content-right-content").eq(a).animate({
				height: 'show'
			});
		})
	}
	addque(0);
	addque(1);
	addque(2);
	
		//添加问答三个点击
	$(".look-two-left ul li ").click(function() {
		$(".Questions-content-content-left ul li").css("color", "#000000")
		$(".Questions-content-content-left ul li").css("background", "rgba(248,252,255,1)")
		$(this).css("background", "rgba(101,186,206,1)")
		$(this).css("color", "#FFFFFF")
	});
	//简介添加图片的点击
$(".send-img").click(function(){
	$(this).empty();
})

////里页面取消的点击
$('.close-open').click(function(){
	$(".look-two").css("display", "none")
		$(".content-main").animate({
			height: 'show'
		})
})




	//确认需改的点击
	$(".sure-modify").click(function(){
      var clval =  $(".first-set").val();
      if(clval != fir){
      	alert("修改成功")
      }
      else{
      	alert("修改失败,请变更里面的数据");
      	return
      }
   
      
      		//设置首句设置
				$.ajax({
					type: 'put',
					url: "../companies/"+$('#companyId').val()+"/updateFirstContent",
					dataType: "json",
					data:{
						content:clval
					},
					success: function(data) {
						if(data.code == 200) {

						} else {
							alert('输入内容错误！');
						}
					},
					error: function() {

					}
				});
				
				
				
				
	})
	
	
	
	//左边两个按钮的点击
	$(".clleft").click(function(){
		$(".clleft").css("background","rgba(255,255,255,1)")
		$(".clleft").css("color","rgba(0,0,0,1")
		$(this).css("background","rgba(70,159,180,1)")
		$(this).css("color","rgba(255,255,255,1)")
	})
	$(".clleft").eq(0).click(function(){
						$(".set-data-right").css("display", "none")
		$(".sr-one").animate({
			height: 'show'
		})
	})
		$(".clleft").eq(1).click(function(){
								$(".set-data-right").css("display", "none")
		$(".sr-two").animate({
			height: 'show'
		})
	})
//获取首句内容
				$.ajax({
					type: 'get',
					url: "../companies/"+$('#companyId').val()+"/getFirstContent",
					dataType: "json",
					success: function(data) {
						if(data.code == 200) {
                          fir =  data.data[0].firstContent;
                          $(".first-set").val(fir);
                     const a =  $(".first-set").val();

						} else {
							alert('输入内容错误！');
						}
					},
					error: function() {

					}
				});
					
		
		
		
		
		//请求热门问题
							$.ajax({
					type: 'get',
					url: "../companies/"+$('#companyId').val()+"/showHotQuestions",
					dataType: "json",
					success: function(data) {
						if(data.code == 200) {
                                console.log(data.data)
                                				//第一步，渲染数据
				let pagecontent = data.data.data;
				let lastpage = data.data.last_page;
				pagecontent.forEach(function(item) {
					var con = `              	 	<ul class="pacon">
										<li><input type="text" value="${item.id}" readonly=""/></li>
										<li><input type="text" value="${item.question}" readonly=""/></li>
										<li><input type="text" value="${item.hot}" readonly=""/></li>
										<li><span class="look-hot">查看</span></li>
									</ul>`
					$(".hot-question").append(con);
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
		if($(".page").length<3){
			$(".dian").css("display","none")
		}		
      changepage();   
      //上一页的点击
      $(".last-page").click(function(){
      	  	if(pagebtn==1){
       		return 0;
       	}
if(chanpa>0){
	chanpa--;
	 changepage();
	          	     if(chanpa+3==pagebtn){
	$(".dian").css("display","none")
}else{
	$(".dian").css("display","block");
}  
}
      })
      //下一页的点击
      
       $(".next-page").click(function(){
       	  	if(pagebtn==1){
       		return 0;
       	}
if(chanpa+3<pagebtn){
	chanpa++;
	 changepage();
}
          	     if(chanpa+3==pagebtn){
	$(".dian").css("display","none")
}else{
	$(".dian").css("display","block");
}  
      })

				
				//页面的点击请求
				$(".page").click(function() {
					var pagef = parseInt($(this).html());
					$(".nowpage").text(pagef);
					$.ajax({
						type: 'get',
						url:"../companies/"+$('#companyId').val()+"/showHotQuestions?page="+pagef,
						dataType: "json",
						success: function(data) {
							if(data.code == 200) {
								$(".pacon").remove();
								var pagecontent = data.data.data;
								pagecontent.forEach(function(item) {
				var con = `              	 	<ul class="pacon">
										<li><input type="text" value="${item.id}" readonly=""/></li>
										<li><input type="text" value="${item.question}" readonly=""/></li>
										<li><input type="text" value="${item.hot}" readonly=""/></li>
										<li><span class="look-hot">查看</span></li>
									</ul>`
					$(".hot-question").append(con);
				})
lookblack();
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
      $(".last-page").click(function(){
          var las = parseInt($(".nowpage").text());
          if(las>1){
          	las--;
          }
      					$.ajax({
					type: 'get',
		         url:"../companies/"+$('#companyId').val()+"/showHotQuestions?page="+las,
		          dataType: "json",
					success: function(data) {
						if(data.code == 200) {
	                       $(".pacon").remove();
	                       var pagecontent= data.data.data;
				pagecontent.forEach(function(item){
             			var con = `              	 	<ul class="pacon">
										<li><input type="text" value="${item.id}" readonly=""/></li>
										<li><input type="text" value="${item.question}" readonly=""/></li>
										<li><input type="text" value="${item.hot}" readonly=""/></li>
										<li><span class="look-hot">查看</span></li>
									</ul>`
					$(".hot-question").append(con);
            $(".jump .nowpage").text(las);
				})
lookblack();
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
      })
      //下一页点击
      $(".next-page").click(function(){
      	  	if(pagebtn==1){
       		return 0;
       	}
          var las = parseInt($(".nowpage").text());
          if(las<lastpage){
          	las++;
          }
      					$.ajax({
					type: 'get',
		         url:"../companies/"+$('#companyId').val()+"/showHotQuestions?page="+las,
		          dataType: "json",
					success: function(data) {
						if(data.code == 200) {
	                       $(".pacon").remove();
	                       var pagecontent= data.data.data;
				pagecontent.forEach(function(item){
             			var con = `              	 	<ul class="pacon">
										<li><input type="text" value="${item.id}" readonly=""/></li>
										<li><input type="text" value="${item.question}" readonly=""/></li>
										<li><input type="text" value="${item.hot}" readonly=""/></li>
										<li><span class="look-hot">查看</span></li>
									</ul>`
					$(".hot-question").append(con);
            $(".jump .nowpage").text(las);
				})
lookblack();
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
      })	
			   //跳转的enter   
        		$(".jump input").keydown(function(e) {
			if(e.keyCode == 13) {
				if($(this).val() != '') {
					var jumppage = parseInt($(this).val());
					if(jumppage>lastpage ){
						alert("请输入正确页码");
						return
					}
					if(!isNaN(jumppage)){
	} else{
		alert("请输入正确页码！");
		return;
	}
					if(jumppage<1){
						alert("请输入正确页码！");
						return;
					}
					chanpa  = jumppage-1;
					changepage();
					if(jumppage>lastpage ){
						alert("请输入正确页码");
						return
					}
					 $(".jump .nowpage").text(jumppage);
					       					$.ajax({
					type: 'get',
		         url:"../companies/"+$('#companyId').val()+"/showHotQuestions?page="+jumppage,
		          dataType: "json",
					success: function(data) {
						if(data.code == 200) {
	                       $(".pacon").remove();
	                       var pagecontent= data.data.data;
				pagecontent.forEach(function(item){
             			var con = `              	 	<ul class="pacon">
										<li><input type="text" value="${item.id}" readonly=""/></li>
										<li><input type="text" value="${item.question}" readonly=""/></li>
										<li><input type="text" value="${item.hot}" readonly=""/></li>
										<li><span class="look-hot">查看</span></li>
									</ul>`
					$(".hot-question").append(con);
				})
lookblack();
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
		})

lookblack();


						} else {
							alert('输入内容错误！');
						}
					},
					error: function() {

					}
					
					
					
				});
	//预览的点击
	   $(".preview").click(function(){
   	 
   	 //预览标题
   	 let viewtitle = $(this).parent().parent().parent().prev().prev().find(".intrduct-title").children("input").val();
   	 //预览简介
   	let viewintro = $(this).parent().parent().parent().prev().prev().find(".intrduct-intro").children("textarea").val();
   	//预览简介图片
   	let viewimg = $(this).parent().parent().parent().prev().prev().find(".send-img").children("img").attr("src")
   	//预览方法步骤
   	let viewway = []
   	let ways =  $(this).parent().parent().parent().prev().find("textarea")
   	$(ways).each(function(index,item){
   		let way = $(item).val();
   		viewway.push(way);
   	})
   //预览方法图片
   let viewwayimg  = []
   let wayimgs = $(this).parent().parent().parent().prev().find(".img-box").children("img")
     wayimgs.each(function(index,item){
     	viewwayimg.push($(item).attr("src"))  	
     })
     //预览注意事项
     let things = []
     let thing = $(this).parent().parent().parent().find(".write-way")
     thing.each(function(index,item){
     	things.push($(item).val())
     })
     //给预览标题赋值
     $(".ME-preview-content-container-intro-title").text(viewtitle)
     //给预览简介赋值
     $(".ME-preview-content-container-intro-content").text(viewintro)
     //给预览方法步骤赋值
     $(viewway).each(function(index,item){
     	let waybox = `            <div class="ME-preview-content-container-method-item">
              <span>${index+1}</span>
              <div class="ME-preview-content-container-method-item-content">
                <p>${item[index]}</p>
                <img src="${viewwayimg[index]}"/>
              </div>
            </div>`
     	$(".ME-preview-content-container-method").append(waybox)
     })
     //给预览的注意事项赋值
     $(things).each(function(index,item){
     	let thingcontent = `            <div class="ME-preview-content-container-careful-item">
              <span></span>
              <div>${item}</div>
            </div>`
     	$(".ME-preview-content-container-careful").append(thingcontent);
     })
     $('.ME-preview').fadeIn(2000);
     
   })
     $('.ME-preview-content-header img').click(function () {  
    $('.ME-preview').fadeOut(500);
  });
   
				
})


//方法增加
function addddd(){
	let way = `				<li>
												<span>1</span>
												<textarea class="wirte-way-or" placeholder="请输入方法或步骤"></textarea>
												
												<div class="send-small-img">
													<label for="s-small">
													<div class="img-box">
														<img src="img/shangchuantupian.png" class="sil"/>
														<p>上传图片</p>
													</div>
													</label>
												</div>
												
												<input type="file" onchange="selectImage(this);" style="display: none;" id="s-small"/>
												<div class="right-choice">
													<div><img src="img/cale.png"/></div>
													<div onclick="cut(this)">-</div>
													<div onclick='addddd()'>+</div>
												</div>
											</li>`
	$(".look-two .Questions-content-content-right-content-top ul").append(way)

}
//方法减去
function cut(e){
	    	if($(".look-two .Questions-content-content-right-content-top ul li").length<2){
	alert("再删就没了┗|｀O′|┛ 嗷~~")
	
}else{
		$(e).parent().parent().remove();
}

}


//查看的点击
function lookblack(){
	//查看点击
$('.pacon span').click(function(){
	$(".content-main").css("display", "none")
		$(".look-two").animate({
			height: 'show'
		})
		let au = $(this).parent("li").prevAll().eq(2).children("input").val();
console.log(au)
			//请求要查看的数据
				$.ajax({
					type: 'post',
		         url: "../companies/questions/detail",
		          dataType: "json",
		          data:{
		          	companyid:35,
		          	question_id:au
		          },
					success: function(data) {
						if(data.code == 200) {
						//标题
                        let title = data.data[0].title;
                        $(".look-two .intrduct-title input").val(title)
                        //简介语言
                        let jiancontent  = data.data[0].intro;
                        var jiante = jQuery.parseJSON(jiancontent).jianjietext;
                      $(".please-jian").val(jiante);
                        //简介图片
                           var jianimg = jQuery.parseJSON(jiancontent).jianimg;
                           $(".look-two .send-img img").attr("src",jianimg)
                         console.log(jianimg)
                         //方法数组
                         var arry  = jQuery.parseJSON(data.data[0].methed).content;
						 //给方法赋值
						 $(".look-two .Questions-content-content-right-content-top ul li").remove();
                         var waylen = 0;
                         $(arry).each(function(index,item){
                         	let waybox  = 											`<li>
												<span>1</span>
												<textarea class="wirte-way-or " placeholder="请输入方法或步骤 "></textarea>
												
												<div class="send-small-img ">
													<label for="s-small ">
													<div class="img-box ">
														<img src="img/shangchuantupian.png "/>
													</div>
													</label>
												</div>
												
												<input type="file " onchange="selectImage(this); " style="display: none; " id="s-small "/>
												<div class="right-choice ">
													<div></div>
													<div></div>
													<div></div>
												</div>
											</li>`
                         	$(".look-two .Questions-content-content-right-content-top ul").append(waybox)
                         	waylen++;
                         		$(".look-two .Questions-content-content-right-content-top ul li").last().children("span").text(waylen)
                         	$(".look-two .Questions-content-content-right-content-top ul li").last().children(".wirte-way-or").val(item.way)
                         	$(".look-two .Questions-content-content-right-content-top ul li").last().children(".wirte-way-or").val(item.way)
                         	$(".look-two .Questions-content-content-right-content-top ul li").last().children(".send-small-img ").find("img").attr("src",item.img);
                         })
						 //注意事项数组
						 $(".look-two .wirte-things-box .wirte-things").remove()
                          var arry2  = jQuery.parseJSON(data.data[0].careful).content;
                          $(arry2).each(function(index,item){
                           let things = 						`<div class="wirte-things">
										<img src="img/tuoyuan.png" class="tuoyuan"/>
										<input class="write-way" placeholder="请输入方法或步骤"></input>
										<img src="img/close.png"/ class="wirte-way-close">
									</div>`
                           $(".look-two .wirte-things-box").append(things)
                           $(".look-two .wirte-things-box .wirte-things").last().children(".write-way").val(item)
                          })
                        	console.log(data.data[0])
                           

						} else {
							alert('输入内容错误！');
						}
					}
				});
})
}
 var chanpa = 0;
//页码变化函数
		function changepage(){
			        $(".page").css("display","none");
         $(".page").slice(chanpa,chanpa+3).css("display","block");
		}