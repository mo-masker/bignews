$(function(){
    // 1.实现图片预览效果
    $('#inputCover').on('change',function(){
        // 转化为文件流
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        $('.article_cover').attr('src',url);
    })

    // 2.让文章分类加载完成
    $.get({
        url:BigNew.category_list,
        success:function(res){
            // console.log(res);
            let htmlStr = template('categoryList',res);
            $('select.category').html(htmlStr)
        }
    })

})