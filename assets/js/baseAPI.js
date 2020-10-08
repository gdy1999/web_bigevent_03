// 注意： 每次发送$.get $.post $.ajax请求都会先调用 ajaxPrefilter 这个函数
// 在这个函数中,可以拿到ajax配置的参数
$.ajaxPrefilter(function (options) {
  // options.url   可以拿到ajax发送请求时的路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;

  // 判断发送的请求 路径是否需要身份验证
  // 判断路径是否是以/my/开头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || ""
    }
  }


  // 控制用户的访问权限  调用complete函数  无论成功与否都会被调用
  options.complete = function (res) {
    console.log(res);
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      // 强制清空token
      localStorage.removeItem("token");
      // 跳转到登录界面
      location.href = "/login.html";
    }
  }
}) 