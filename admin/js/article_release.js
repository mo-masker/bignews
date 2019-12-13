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


    

    // 发表文章功能
    // 当点击发表按钮的时候，发送请求将文章数据更新，注册点击事件
    $('button.btn-edit').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 使用FormData方式来提交数据
        let fd = new FormData($('#form')[0]);
        fd.append('content', editor.txt.html());
        // 发表完文章，默认是已经发布
        fd.append('state', '已发布');

        // 发送ajax请求
        $.post({
            url: BigNew.article_publish,
            data: fd,
            // 不处理数据
            processData: false,
            // 不转换类型
            contentType: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    // 回到上一个页面
                    window.history.back();
                }
            }

        })
    })

    // 存草稿的功能
    $('button.btn-draft').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 使用FormData的方式来提交数据
        let fd = new FormData($('#form')[0]);
        fd.append('content',editor.txt.html());
        // 不设置state属性，默认就是存草稿

        //发送ajax请求，添加文章数据
        $.post({
            url: BigNew.article_publish,
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    window.history.back();
                }
            }
        })
    })

})