$(function(){
    // 发送请求获取数据
    $.ajax({
        url:BigNew.user_detail,
        type:'get',
        success:function(res){
            console.log(res);
            for(var key in res.data){
                $('input' + key).val(res.data[key]);
            }
            $('img.user_pic').attr('src',res.data.userPic);
        }
    })

    // 给文件域注册一个change事件,当选择图片之后，在图片标签中展示我们选择的图片
    // 用来处理用户选择图片的时候，有一个预览效果
    $('#exampleInputFile').on('change',function(e){
        // 图片对象 
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        // console.log(url);
        $('img.user_pic').attr('src',url);
    })
})