
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
            // console.log(res);
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

    // --------第二天
    // 
    $('div.level01').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');

        if($(this).index() === 1){
            $('ul.level02').slideToggle();
            //a标签模拟点击事件需要使用原生DOM元素调用click()方法;jquery对象无法调用,所以在这里我们获取到的a标签的jQuery对象要转换为原生的对象去调用click()这个方法
            $('ul.level02 li:eq(0) a')[0].click();

            // 点击这个div的时候，让其后面的箭头符号进行旋转，我们是通过添加一个类名的方式来处理
            $(this).find('b').toggleClass('rotate0');
        }
    });

    // 排他
    $('ul.level02 li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
})