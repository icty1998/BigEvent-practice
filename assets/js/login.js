// 点击去注册账号
$(function () {
    //点击去注册的按钮
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
        console.log(0);
    })
    //点击去登录的按钮
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
        console.log(00);
    })
    // 为验证登录密码是否符合规则,从layui获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过 form.verify() 函数自定义校验规则
    form.verify({
        //自定义一个密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //再自定义一个注册密码二次校验规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })
    //发起注册用户的Ajax请求
    //监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功!正在转向登录页面...');
            // layer.alert('注册成功!正在转向登录页面...', { icon: 1 });
            $('#link-login').click();
        })
    })
    //发起登录的Ajax请求
    //监听登录表单的提交事件
    $('#form-login').submit(function (e) {
        e.preventDefault();//阻止表单默认行为,后期使用ajax进行提交
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将token值保存到local
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})