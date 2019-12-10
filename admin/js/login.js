$(function () {
    /**
     * 1.给登录按钮注册点击事件
     * 2.阻止默认跳转事件（表单submit会自动跳转页面）
     * 3.获取用户名和密码
     * 4.非空判断
     * 5.ajax发送请求
     * 6.处理响应结果  a.成功：跳转管理系统首页  b.失败：提示用户
     */

    // 给登录按钮注册点击事件
    $('.input_sub').on('click', function (e) {
        // 阻止默认跳转事件
        e.preventDefault();
        // 获取用户名和密码
        let userName = $('.input_txt').val().trim();
        let password = $('.input_pass').val().trim();
        // 用户名和密码不能为空
        if (userName.length === 0 || password.length === 0) {
            $('#myModal').modal();
            $('.modal-body').text('用户名和密码不能为空');
            return;
        };

        // 发送ajax请求
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            type: 'post',
            // 把得到的json字符串转换为对象
            dataType: 'json',
            data: {
                username: userName,
                password: password
            },
            success: function (res) {
                // console.log(res);
                $('#myModal').modal();
                $('.modal-body').text(res.msg);
                //登录成功，跳转管理系统首页
                if (res.code === 200) {
                    // 登录成功，本地存储
                    window.localStorage.setItem('token', res.token)

                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 跳转到首页
                        window.location.href = './index.html';
                    })
                }
            }
        })
    })
})