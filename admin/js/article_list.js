$(function () {
    // 当页面一加载就需要将文章类别信息和文章条目信息展示在页面
    // 获取文章类别信息
    $.get({
        url: BigNew.category_list,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                //获取成功把类名数据写入模板
                let htmlStr = template('categoryList', res);
                $('#selCategory').html(htmlStr)
            }
        }
    })

    // 定义两个变量，用来表示页码和条数
    let mypage = 1;  // 默认第一页
    let perpage = 10;  // 默认10条数据
    // 页面一加载就展示文章条目数据
    
    
})