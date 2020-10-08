// 入口函数
$(function () {

    var layer = layui.layer;

    // 获取用户信息
    getUserInfo();

    // 退出功能
    $(".btn").on("click", function () {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空token
            localStorage.removeItem("token");
            // 跳转到登录界面
            location.href = '/login.html';
            // 退出提示框
            layer.close(index);
        });
    })
})

// 后面代码需要使用,所以写到入口函数的外面
// 封装函数获取用户信息
function getUserInfo() {
    // 发送ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            console.log(res);
            // 渲染用户头像信息
            renderAvatar(res.data);
        }
        // },
        // // 控制用户的访问权限  调用complete函数  无论成功与否都会被调用
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 强制清空token
        //         localStorage.removeItem("token");
        //         // 跳转到登录界面
        //         location.href = "/login.html";
        //     }
        // }
    })
}

// 封装用户头像信息
function renderAvatar(user) {
    // 获取用户昵称   如果有用户昵称就用用户昵称
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 获取用户昵称的第一个字母或者汉字
    var first = name[0].toUpperCase();
    // 判断用户是否有头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".user-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        $(".user-avatar").html(first).show();
    }
}




