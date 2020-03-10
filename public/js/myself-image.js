 //读取本地图片
   var image = '';
    function selectImage(file) {
      if (!file.files || !file.files[0]) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function (evt) {
      	var imgs = document.createElement('img');
        imgs.src = evt.target.result;
        var Oin = document.getElementsByClassName('index_text')[0];
         Oin.appendChild(imgs);
         file.outerHTML = file.outerHTML;
      }
      reader.readAsDataURL(file.files[0]);
    }
    
