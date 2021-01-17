$(function () {

    var layer = layui.layer;
    // getUserInfo函数,获取用户信息
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            // headers就是请求头信息
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },

            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                console.log(res);
                renderAvatar(res.data);
            }

        })
        //渲染用户头像
        function renderAvatar(user) {
            // 获取用户名字
            var name = user.nickname || user.username;
            // 设置欢迎文字
            $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
            // 按需渲染用户头像
            if (user.user_pic !== null) {
                $('.layui-nav-img')
                    .attr('src', user.user_pic)
                    .show()
                $('.text-avatar').hide()
            } else {
                // 3.2 渲染文本头像
                $('.layui-nav-img').hide()
                var first = name[0].toUpperCase()
                $('.text-avatar')
                    .html(first)
                    .show()
            }
        }
    }
    // 点击按钮,退出界面↓
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('确定是否退出', { icon: 3, title: '提示' }, function (index) {
            // 清空token
            localStorage.removeItem('token');
            // 跳转登录页面
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index)
        })


    })



})