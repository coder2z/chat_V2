$(function() {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	threeway = 1;
   //添加问答中，点击添加方法的点击
   $(".addways2").click(function(){
	addway = addway + addway;
	formid = addway+1;
	formid  = formid.toString();
	away  = addway.toString();
	let waybox = `												
	                                     
											<li class="Questions-content-content-right-content-top-li">
											<form action="" method="post"  enctype="multipart/form-data" id="${formid}">
												<span></span>
												<textarea class="wirte-way-or" data-col="1" placeholder="请输入方法或步骤"></textarea>

												<div class="send-small-img">
													<label for="${away}">
													<div class="img-box">
														 <img src="img/shangchuantupian.png"/>
													</div>
													</label>
												</div>

												<input type="file" onchange="selectImage(this);" style="display: none;" id="${away}" name="picture"/>
												<div class="right-choice">
													<div onclick="cut(this)">-</div>
													<div onclick="addddd(this)">+</div>
												</div>
												</form>
											</li>`
                         	$(".look-one .Questions-content-content-right-content-top ul").append(waybox)
   })

	//添加问答三个点击
	$(".Questions-content-content-left ul li ").click(function() {
		$(".Questions-content-content-left ul li").css("color", "#000000")
		$(".Questions-content-content-left ul li").css("background", "rgba(248,252,255,1)")
		$(this).css("background", "rgba(101,186,206,1)")
		$(this).css("color", "#FFFFFF")
	});
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
	
	//查看问答三个点击
		function looktwo(b) {
		$(".look-two-left ul li").eq(b).click(function() {
			$(".look-two-right").css("display", "none");
			$(".look-two-right").eq(b).animate({
				height: 'show'
			});
		})
	}
	looktwo(0);
	looktwo(1);
	looktwo(2);

	//添加问答按钮的点击
	$(".add-question").click(function() {
		$(".look-one .things-need ul li").eq(0).text("提交审核")
		$(".content-main").css("display", "none")
		$(".Questions-content-content").eq(0).animate({
			height: 'show'
		})
		
	})
	//取消的点击
	$(".close-open").click(function() {
		$(".look-two .things-need ul li").eq(0).css("cursor","pointer")
				$(".Questions-content-content-right-content").css("display", "none");
			$(".Questions-content-content-right-content").eq(0).css("display", "block");
				$(".Questions-content-content-left ul li").css("color", "#000000")
		$(".Questions-content-content-left ul li").css("background", "rgba(248,252,255,1)")
				$(".Questions-content-content-left ul li ").eq(0).css("background", "rgba(101,186,206,1)")
		$(".Questions-content-content-left ul li ").eq(0).css("color", "#FFFFFF")
			$(".look-one .intrduct-title input").val('')
			$(".look-one .intrduct-intro textarea").val('');
			$(".look-one .send-img img").attr("src",'img/shangchuantupian.png')
			$(".look-one .Questions-content-content-right-content-top ul li").remove();
			$(".look-one .wirte-things").remove();
			$(".look-two-right").eq(0).css("display", "block");
		$(".Questions-content-content").css("display", "none")
		$(".content-main").animate({
			height: 'show'
		})
	})
	
	//预览的点击
	$(".look-two .preview").click(
		function(){
			window.open('http://chat.zerotsu.cn/articles/'+yulanid,'_blank');
		}
	)
	$(".look-one .preview").click(
		function(){
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
     $(".preview-content-container-intro-title").text(viewtitle)
     //给预览图片赋值
     $(".preview-content-container-intro-img img").attr("src",viewimg)
     //给预览简介赋值
     $(".preview-content-container-intro-content").text(viewintro)
     //给预览方法步骤赋值
     $(viewway).each(function(index,item){
     	let waybox = `            <div class="preview-content-container-method-item">
              <span>${index+1}</span>
              <div class="preview-content-container-method-item-content">
                <p>${item}</p>
                <img src="${viewwayimg[index]}"/>
              </div>
            </div>`
     	$(".preview-content-container-method").append(waybox)
     })
     //给预览的注意事项赋值
     $(things).each(function(index,item){
     	let thingcontent = `            <div class="preview-content-container-careful-item">
              <span></span>
              <div>${item}</div>
            </div>`
     	$(".preview-content-container-careful").append(thingcontent);
     })
$(".preview2").fadeIn(500)

		}
	)
$(".close-pre").click(function(){
	$(".preview2").fadeOut(500)
$(".preview-content-container-method-item").remove();
$(".preview-content-container-careful-item").remove();
})



//方法步骤删除
    $(".look-one .right-choice div").eq(1).on("click",function(){
    	

})






//添加注意事项的点击
$(".add-things").click(function(){
	var thin = 						`<div class="wirte-things">
										<img src="img/tuoyuan.png" class="tuoyuan"/>
										<input class="write-way" placeholder="请输入方法或步骤"></input>
										<img src="img/close.png"/ class="wirte-way-close">
									</div>`
	$(".wirte-things-box").append(thin);
	
	
	
	//写方法删除
	$(".wirte-way-close").on("click",function(){
		 $(this).parent(".wirte-things").remove();
	})

})
	//写方法删除
	$(".wirte-way-close").on("click",function(){
		 $(this).parent(".wirte-things").remove();
	})

	

	//交互代码
	$.ajax({
		type: 'get',
		url: "../companies/"+$('#companyId').val()+"/questions",
		dataType: "json",
		success: function(data) {
			if(data.code == 200) {
				var pagecontent= data.data.data;
				var lastpage = data.data.last_page;
             
				pagecontent.forEach(function(item){
					var html ='';
					if(item.state==="0"){
						html ='禁用'
					}else if(item.state==="1"){
						html ='待审核'
					}else{
						html ='启用'
					}
				
               var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.company_name}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
               $(".content-main-content-bottom-content").append(con);

				})
				         
		//自动生成页码
		var pagebtn =data.data.last_page;
		$(".jump .pagez").text(pagebtn);
		for (var i =1;i<=pagebtn;i++) {
			 var newpagebtn = '<div class="page pp">'+i+'</div>'
			 $(".pp").last().after(newpagebtn);
			 newpagebtn = '' 
		}
		$(".page").eq(0).addClass("focus");
		//如果页码少于3，三个点消失
		if($(".page").length<3){
			$(".dian").css("display","none")
		}		
      changepage();   
      //上一页的点击
      $(".last-page").click(function(){
      	if(threeway == 1){
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
}

      })
      //下一页的点击
      
       $(".next-page").click(function(){
       	if(threeway == 1){
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
}
      })


         
         
         
         
         
      $(".page").click(function(){
      	if(threeway == 1){
      	var pagef = parseInt($(this).html());

      					$.ajax({
					type: 'get',
		         url: "../companies/"+$('#companyId').val()+"/questions?page="+pagef,
		          dataType: "json",
					success: function(data) {
						if(data.code == 200) {
	                       $(".pacon").remove();
	                       var pagecontent= data.data.data;
				pagecontent.forEach(function(item){
								var html ='';
					if(item.state==="0"){
						html ='禁用'
					}else if(item.state==="1"){
						html ='待审核'
					}else{
						html ='启用'
					}
				
               var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
               $(".content-main-content-bottom-content").append(con);
               $(".jump .nowpage").text(pagef);
				})
				     lookthe();

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
				}
      })
      
      
          //上一页点击
      $(".last-page").click(function(){
if(threeway == 1){
          var las = parseInt($(".nowpage").text());
          if(las>1){
          	las--;
          }
          

      					$.ajax({
					type: 'get',
		         url: "../companies/"+$('#companyId').val()+"/questions?page="+las,
		          dataType: "json",
					success: function(data) {
						if(data.code == 200) {
	                       $(".pacon").remove();
	                       var pagecontent= data.data.data;
				pagecontent.forEach(function(item){
								var html ='';
					if(item.state==="0"){
						html ='禁用'
					}else if(item.state==="1"){
						html ='待审核'
					}else{
						html ='启用'
					}
				
               var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
               $(".content-main-content-bottom-content").append(con);
            $(".jump .nowpage").text(las);
				})
     lookthe();
						} else {
							alert('输入内容错误！');
						}
					}
				});
				//上一个点击效果
				      //上一页添加类名
      $(".page").each(function(index,item){
      	$(this).removeClass("focus")
      })
      $(".page").eq(las-1).addClass("focus");
      }
      })

//下一页点击
      $(".next-page").click(function(){
      	if(threeway == 1){
      	  	if(pagebtn==1){
       		return 0;
       	}
          var las = parseInt($(".nowpage").text());
          if(las<lastpage){
          	las++;
          }
      					$.ajax({
					type: 'get',
		         url: "../companies/"+$('#companyId').val()+"/questions?page="+las,
		          dataType: "json",
					success: function(data) {
						if(data.code == 200) {
	                       $(".pacon").remove();
	                       var pagecontent= data.data.data;
				pagecontent.forEach(function(item){
								var html ='';
					if(item.state==="0"){
						html ='禁用'
					}else if(item.state==="1"){
						html ='待审核'
					}else{
						html ='启用'
					}
				
               var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
               $(".content-main-content-bottom-content").append(con);
            $(".jump .nowpage").text(las);
				})
     lookthe();
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
        		$(".content-main-content-bottom-bottom .jump input").keydown(function(e) {
        			if(threeway == 1){
			if(e.keyCode == 13) {
				if($(this).val() != '') {
					var jumppage = parseInt($(this).val());
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
		         url: "../companies/"+$('#companyId').val()+"/questions?page="+jumppage,
		          dataType: "json",
					success: function(data) {
						if(data.code == 200) {
	                       $(".pacon").remove();
	                       var pagecontent= data.data.data;
				pagecontent.forEach(function(item){
								var html ='';
					if(item.state==="0"){
						html ='禁用'
					}else if(item.state==="1"){
						html ='待审核'
					}else{
						html ='启用'
					}
				
               var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
               $(".content-main-content-bottom-content").append(con);
				})
     lookthe();
						} else {
							alert('输入内容错误！');
						}
					}
				});
					 

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
			}
		})
      
      

      
      lookthe();
      
 $("select").change(function(){
	let option = $(this).children('option:selected').val();
	if(option == '禁用'){
     statechance("../companies/"+$('#companyId').val()+"/questions/state","../companies/"+$('#companyId').val()+"/questions/state?page=",2,0,2);
	}
	if(option == '待审核'){
 statechance("../companies/"+$('#companyId').val()+"/questions/state","../companies/"+$('#companyId').val()+"/questions/state?page=",3,1,3);

	}
	if(option == '启用'){
		 statechance("../companies/"+$('#companyId').val()+"/questions/state","../companies/"+$('#companyId').val()+"/questions/state?page=",4,2,4);
	}
		if(option == '全部'){
		window.location.reload()
	}
})
      

			} else {
				alert('输入内容错误！');
			}
		},
		error: function() { 

		}
	});
$(".look-one .introduct-right .send-img").click(function(){
	$(this).children("img").remove();
})



//得到简介里的图片开始！
var sendimg;//这就是最后图片的保存
  $("#send-i").change(function(e) {
            var form  = document.getElementById("uploadF");
           formData = new FormData(form);
        $.ajax({
          type: "post",
          url: '../picture/updatepicture',
          data: formData,
          datatype: 'json',
          cache: false,
          traditional: true,
          contentType: false,
          processData: false,
			success: function(data) {
						if(data.code == 200) {
                             sendimg = data.data
						} else {
							//alert('输入内容错误！');
						}
					},
					error: function() {

					}
				});

        });
//得到简介的图片结束！

//得到方法图片开始！
var sendway=[];
 var every;
   $(document).on("change",".look-one .Questions-content-content-right-content ul li input",function(e){

   	let foid = $(this).parent().attr("id");


        let form2  = document.getElementById(foid);
          let formData2 = new FormData(form2); 
        $.ajax({
          type: "post",
          url: '../picture/updatepicture',
          data: formData2,
          datatype: 'json',
          cache: false,
           async:false,
          traditional: true,
          contentType: false,
          processData: false,
			success: function(data) {
				
						if(data.code == 200) {
                         every = data.data;
                         every = "../"+every;                        
						} else {
							console.log("失败了啊!!!!!!!!!!!!!")
						}
					},
					error: function() {
                    console.log("失败了")
					}
			});
	$(this).prev().find('.img-box').find('img').attr('src',every);
   })

//得到方法图片结束！


//提交问题的交互
$(".look-one .things-need ul li").eq(0).click(function(){
	let ta = $(".look-one .intrduct-title input").val().trim();
if(ta== ''){
	alert("标题不能为空")
	return 0;
}
sendimg = "../"+sendimg	
	let title = $(".look-one #ti").val();
	let jianjietext = $(".look-one #intro").val()
	let jianimg = sendimg;

	let jianjie = {};
	jianjie.jianjietext=jianjietext;
	jianjie.jianimg=jianimg;
jianjie = JSON.stringify(jianjie);

	
	
	
	
	//添加问答数据获取
	let ways = [];
	let things = [];

	let len = $(".look-one .Questions-content-content-right-content-top ul li").length;

	for(var i=0;i<len;i++){
		let di = {};
		di.way=$(".look-one .Questions-content-content-right-content-top ul li").eq(i).find("textarea").val();
		di.img= $(".look-one .Questions-content-content-right-content-top ul li").eq(i).find(".send-small-img").find("img").attr("src");		
		ways.push(di)
	}

	var len2 = $(".look-one .wirte-things").length;
	for (var j =0;j<len2;j++) {
		var th = $(".look-one .wirte-things").eq(j).children("input").val();
		things.push(th);
	}
	let ways2 = {}
	ways2.content = ways;
		ways2  = JSON.stringify(ways2);
		
			let things2 = {};
	things2.content = things;
	things2 = JSON.stringify(things2);
				$.ajax({
					type: 'post',
					url: "../companies/"+$('#companyId').val()+"/addQuestion",
					dataType: "json",
					data:{
						title:title,
						intro:jianjie,
						Method:ways2,
						warning:things2
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
				//点击完返回
				alert("提交审核成功！")
		         window.location.reload();
});
   
   

   
   
   
   
   
   
   
   
   
   
});
var threeway;
		var chanpa = 0;

//方法增加
function addddd(e){
	addway = addway + addway;
	formid = addway+1;
	formid  = formid.toString();
	away  = addway.toString();
	let way = `												
	                                     
											<li class="Questions-content-content-right-content-top-li">
											<form action="" method="post"  enctype="multipart/form-data" id="${formid}">
												<span></span>
												<textarea class="wirte-way-or" data-col="1" placeholder="请输入方法或步骤"></textarea>

												<div class="send-small-img">
													<label for="${away}">
													<div class="img-box">
														 <img src="img/shangchuantupian.png"/>
													</div>
													</label>
												</div>

												<input type="file" onchange="selectImage(this);" style="display: none;" id="${away}" name="picture"/>
												<div class="right-choice">
													<div onclick="cut(this)">-</div>
													<div onclick="addddd(this)">+</div>
												</div>
												</form>
											</li>`
	$(e).parents("li").after(way)


}
//方法减去
function cut(e){

		$(e).parent().parent().parent().remove();


}


var yulanid;
//查看函数
function lookthe(){
	      //点击查看
$(".pacon span").on('click',function(){
	yulanid = $(this).parent("li").prevAll().eq(5).children("input").val();
	console.log(yulanid)
	let state = $(this).parent("li").prevAll().eq(0).children("input").val();
	if (state=="待审核") {
		$(".content-main").css("display", "none")
		$(".Questions-content-content").eq(0).animate({
			height: 'show'
		})
		$(".look-one .Questions-content-content-right-content-top ul li").remove();
		$(".look-one .things-need ul li").eq(0).text("修改")
					let au = $(this).parent("li").prevAll().eq(5).children("input").val();
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
                        $(".look-one .intrduct-title input").val(title)
                        //简介语言
                        let jiancontent  = data.data[0].intro;
                        var jiante = jQuery.parseJSON(jiancontent).jianjietext;
                        console.log(jiante);
                      $("#intro").val(jiante);
                        //简介图片
                           var jianimg = jQuery.parseJSON(jiancontent).jianimg;
                           
                           $(".look-one .send-img img").attr("src",jianimg)
                         //方法数组
                         var arry  = jQuery.parseJSON(data.data[0].methed).content;
						 //给方法赋值
						 $(".look-one .Questions-content-content-right-content-top ul li").remove()
                         var waylen = 0;
                         $(arry).each(function(index,item){
                         	let waybox  = 											`<li>
												<span>1</span>
												<textarea class="wirte-way-or " placeholder="请输入方法或步骤 "></textarea>
												
												<div class="send-small-img ">
													<label for="s-small ">
													<div class="img-box ">
                                                            <img src="img/shangchuantupian.png " />
													</div>
													</label>
												</div>
												

												<div class="right-choice ">
													<div onclick="cut(this)">-</div>
													<div onclick="addddd(this)">+</div>
												</div>
											</li>`
                         	$(".look-one .Questions-content-content-right-content-top ul").append(waybox)

                         	waylen++;
                           $(".look-one .Questions-content-content-right-content-top ul li").last().children("span:first").text(waylen);
                         	$(".look-one .Questions-content-content-right-content-top ul li").last().children(".wirte-way-or").val(item.way)
                         	$(".look-one .Questions-content-content-right-content-top ul li").last().children(".send-small-img ").find("img").attr("src",item.img);
                         })
						 //注意事项数组
						 $(".look-one .wirte-things-box .wirte-things").remove()
                          var arry2  = jQuery.parseJSON(data.data[0].careful).content;
                         $(arry2).each(function(index,item){
                           let things = 						`<div class="wirte-things">
										<img src="img/tuoyuan.png" class="tuoyuan"/>
										<input class="write-way" placeholder="请输入方法或步骤"></input>
										<img src="img/close.png"/ class="wirte-way-close">
									</div>`
                           $(".look-one .wirte-things-box").append(things)
                           $(".look-one .wirte-things-box .wirte-things").last().children(".write-way").val(item)
                          })
                           

						} else {
							alert('输入内容错误！');
						}
					}
				});
	} else{
		       $(".look-two .things-need ul li").eq(0).css("cursor","not-allowed")
					$(".content-main").css("display", "none")
		$(".Questions-content-content").eq(1).animate({
			height: 'show'
		})
			let au = $(this).parent("li").prevAll().eq(5).children("input").val();
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
                         //方法数组
                         var arry  = jQuery.parseJSON(data.data[0].methed).content;
						 //给方法赋值
						 $(".look-two .Questions-content-content-right-content-top ul li").remove()
                         var waylen = 0;
                         $(arry).each(function(index,item){
                         	let waybox  = 											`<li>
												<span>1</span>
												<textarea class="wirte-way-or " placeholder="请输入方法或步骤 "></textarea>
												
												<div class="send-small-img ">
													<label for="s-small ">
													<div class="img-box ">
                                                            <img src="img/shangchuantupian.png " />
													</div>
													</label>
												</div>
												

												<div class="right-choice ">
													<div></div>
													<div></div>
													<div></div>
												</div>
											</li>`
                         	$(".look-two .Questions-content-content-right-content-top ul").append(waybox)

                         	waylen++;
                           $(".look-two .Questions-content-content-right-content-top ul li").last().children("span:first").text(waylen);
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
                           

						} else {
							alert('输入内容错误！');
						}
					}
				});
			
	}


			
})
	
}


//页码变化函数
		function changepage(){
			        $(".page").css("display","none");
         $(".page").slice(chanpa,chanpa+3).css("display","block");
		}



var addway=1;//点击加号添加方法
var formid = 0; 
var away = '';



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
					if(item.state === "0") {
						html = '禁用'
					} else if(item.state === "1") {
						html = '待审核'
					} else {
						html = '启用'
					}
				    var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.company_name}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
					$(".content-main-content-bottom-content").append(con);
					lookthe();
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
									if(item.state === "0") {
										html = '禁用'
									} else if(item.state === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
	    var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.company_name}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
									$(".content-main-content-bottom-content").append(con);
									lookthe()
								})
							

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
									if(item.state === "0") {
										html = '禁用'
									} else if(item.state === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
    var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.company_name}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
									$(".content-main-content-bottom-content").append(con);
									lookthe()
									$(".jump .nowpage").text(las);
								})
							

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
									if(item.state === "0") {
										html = '禁用'
									} else if(item.state === "1") {
										html = '待审核'
									} else {
										html = '启用'
									}
    var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.company_name}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
									$(".content-main-content-bottom-content").append(con);
									lookthe()
									$(".jump .nowpage").text(las);
								})

							

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
											if(item.state === "0") {
												html = '禁用'
											} else if(item.state === "1") {
												html = '待审核'
											} else {
												html = '启用'
											}
    var con =					`<ul class="pacon">
											<li><input type="text" value="${item.id}" readonly=""></li>
											<li><input type="text" value="${item.title}" readonly=""></li>
											<li><input type="text" value="${item.company_name}" readonly=""></li>
											<li><input type="text" value="${item.created_at}" readonly=""></li>
											<li><input type="text" value="${item.access_at}" readonly=""></li>
											<li><input type="text" value="${html}" readonly=""></li>
											<li><span>查看</span></li>
										</ul>`
											$(".content-main-content-bottom-content").append(con);
											lookthe()
										})
								

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

	



}
			} else {
				alert('输入内容错误！');
			}
			
		},
		error: function() {

		}
	});
	
}








