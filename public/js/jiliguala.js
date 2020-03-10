	//截屏代码
	    var Ok = new window.kscreenshot({
    key: 65,
    endCB: function (data) {
      console.log(data);
      var img = document.createElement('img')
      var Oin = document.getElementsByClassName('index_text')[0];
      img.src = data;
      Oin.appendChild(img);
    }
  })

  function on() {
    Ok.startScreenShot();
  }
  