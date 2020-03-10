 //读取本地图片
   var image = '';
    function selectImage1(file) {
      if (!file.files || !file.files[0]) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function (evt) {
      	var im = document.createElement('img');
        im.src = evt.target.result;
       var imgsrc = evt.target.result;
        var Oi = document.getElementsByClassName('send-img')[0];
        
        im.width = 100;

         Oi.appendChild(im);
         file.outerHTML = file.outerHTML;
      }
      reader.readAsDataURL(file.files[0]);
    }