
$(function(){
    // 查询个人信息
    // 页面加载发送ajax请求
    // 响应数据之后渲染到页面

    $.ajax({
        // 在封装的地址里调用
        url:BigNew.user_info,
        type:'get',
        dataType:'json',
        success:function(res){
            console.log(res);
            // 获取服务器返回的数据，使用这些数据去渲染页面的内容
            $('.user_info img').attr('src',res.data.userPic); // 头像
            $('.user_info span').html('欢迎&nbsp;&nbsp;'+res.data.nickname); //用户名
            $('.user_center_link>img').attr('src',res.data.userPic); // 右边头像
        }
    });

    // 退出
    // 点击退出按钮，回到登录页面，将token清除
    $('.logout').on('click',function(){
        // 清除token
        localStorage.removeItem('token');
        // 返回到登录页
        location.href = './login.html'
    })
})