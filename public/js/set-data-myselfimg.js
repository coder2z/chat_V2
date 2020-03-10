$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
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
       
		imgs.onload = function(){//图片的高宽
			var imgWidth = this.width
			var imgHeight = this.height;
			imgs.setAttribute('data-w',imgWidth);
			imgs.setAttribute('data-h',imgHeight);
		}
        var Oin = document.getElementsByClassName('send-img')[0];
        
        imgs.width = 100;
         Oin.appendChild(imgs);
         file.outerHTML = file.outerHTML;
      }
      reader.readAsDataURL(file.files[0]);
    }