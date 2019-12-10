$(function () {
    // 发送请求获取数据
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        success: function (res) {
            // console.log(res);
            for (var key in res.data) {
                $('input.' + key).val(res.data[key]);
            }
            $('img.user_pic').attr('src', res.data.userPic);
        }
    })

    // 给文件域注册一个change事件,当选择图片之后，在图片标签中展示我们选择的图片
    // 用来处理用户选择图片的时候，有一个预览效果
    $('#exampleInputFile').on('change', function (e) {
        // 图片对象 
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        // console.log(url);
        $('img.user_pic').attr('src', url);
    })

    // 修改按钮注册点击事件
    $('.btn-edit').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault();

        // 获取表单数据
        var form = $('#form')[0];
        var userdata = new FormData(form);
        // console.log(userdata);
        // 发送ajax请求
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            data: userdata,
            // 阻止编译
            processData: false,
            // 不需要设置请求的类型
            contentType: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    // 刷新当前页面
                    // window.Location.reload();
                    // 在子页面刷新父页面
                    // parent.window.location.reload();

                    // 重新获取数据
                    $.ajax({
                        url:BigNew.user_info,
                        type:'get',
                        success:function(res){
                            // console.log(res);
                            // 获取服务器返回的数据去渲染页面的内容
                            parent.$('.user_info img').attr('src',res.data.userPic);
                            parent.$('.user_info span').html('欢迎&nbsp;&nbsp;'+res.data.nickname);
                            parent.$('.user_center_link>img').attr('src',res.data.userPic);
                        }
                    })
                }
            }
        })
    })
})