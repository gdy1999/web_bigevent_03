$(function () {
    // 给登录区域绑定事件
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    // 给注册区域绑定事件
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // 校验
    // 从layui中获取到form
    var form = layui.form;
    form.verify({
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码
        repsw: function (value) {
            // 形参里面的参数是 确认密码里面的值

            // 获取输入框的密码
            var psw = $(".reg-box [name = password]").val();
            if (psw !== value) {
                return "两次密码不一致,请重新输入";
            }
        }
    })

    // 获取layer
    var layer = layui.layer;
    // 给注册区域绑定监听事件
    $("#form_reg").on("submit", function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 获取用户名的值
        var username = $("#form_reg [name=username]").val();
        // 获取密码框的值
        var password = $("#form_reg [name=password]").val();
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {username: username,password: password},
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("小伙子,恭喜你注册成功了");
                // 模仿人的点击登录按钮
                $("#link_login").click();
            }
        })
    })


    // 给登录区域绑定监听事件
    $("#form_login").on("submit", function (e) {
        // 阻止表单的默认提交
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功");
                // 保存token值 后面需要使用
                localStorage.setItem("token", res.token);
                // 跳转到后台主页面
                location.href = "/index.html";
            }
        })
    })
})