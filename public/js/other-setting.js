$(function () {
  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });
  var baseURL = '..'

  window.onload = function () {

    $.ajax({
      type: "get",
      url: baseURL + "/admin/other/sms",
      dataType: "json",
      success: function (data) {
        console.log(data);
        console.log(JSON.parse(data.data.other_sms_address));
        $('.OS-container-box-bottom-content input').val();
      }
    });
  }

  $('.OS-container-box-bottom-content button').click(function () {
    console.log('da');
    $.ajax({
      type: "POST",
      url: baseURL + "/admin/other/sms",
      dataType: "json",
      data:{
        other_sms_address: $('.OS-container-box-bottom-content input').val()
      },
      success: function (data) {
        alert('提交成功！');
      }
    });
  })
})