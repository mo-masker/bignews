
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
        }
    })
})