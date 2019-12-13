$(function () {
    // 1.实现图片预览效果
    $('#inputCover').on('change', function () {
        // 转化为文件流
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        $('.article_cover').attr('src', url);
    })

    // 2.让文章分类加载完成
    $.get({
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            let htmlStr = template('categoryList', res);
            $('select.category').html(htmlStr)
        }
    })

    //3.添加日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        zIndex: 30000
    })

    // 4.添加富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

})