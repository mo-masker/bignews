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


    // 根据文章id获取到文章的具体数据，然后渲染到页面表单中
    // 获取文章id
    let articleId = location.search.split('=')[1];
    console.log(articleId);
    //发送ajax请求
    $.get({
        url:BigNew.article_search,
        data:{
            id:articleId
        },
        success:function(res){
            // console.log(res);
            if(res.code == 200){
                $('#inputTitle').val(res.data.title);
                $('img.article_cover').attr('src',res.data.cover);
                $('select.category').val(res.data.categoryId);
                $('#testico').val(res.data.date);
                editor.txt.html(res.data.content);
            }
        }
    })

})