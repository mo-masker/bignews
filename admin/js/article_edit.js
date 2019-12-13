$(function(){
    // 实现图片预览效果
    $('#inputCover').on('change',function(){
        // 转化为文件流
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        $('.article_cover').attr('src',url);
    })

    // 
})