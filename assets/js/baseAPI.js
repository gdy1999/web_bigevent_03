// 注意： 每次发送$.get $.post $.ajax请求都会先调用 ajaxPrefilter 这个函数
// 在这个函数中,可以拿到ajax配置的参数
$.ajaxPrefilter(function (options) {
  // options.url   可以拿到ajax发送请求时的路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
}) 