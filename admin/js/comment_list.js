$(function () {
    // 发送ajax请求获取评论数据  渲染页面
    // 设置默认页面与显示条数
    let mypage = 1;
    let perpage = 10;
    function getComData(mypage,callback) {
        $.get({
            url: BigNew.comment_list,
            data: {
                page: mypage,
                perpage: perpage
            },
            success: function (res) {
                console.log(res);
                // 获取成功将数据写入模板，与文章列表页一样
                let htmlStr = template('commentList', res);
                $('tbody').html(htmlStr);
                // 判断获取的数据不为空且回调函数不为空
                // 如果回调函数不为空，就把数据传入回调函数，执行下一个功能
                if (res.data.data.length != 0 && callback != null) {
                    $('#pagination').show();
                    $('#tips').hide();
                    callback(res);
                    // 如果数据的总页数不=0，当前页数据的长度=0，数据的总页数=当前页-1---把当前页-1 ，更新页码
                } else if (res.data.totalPage != 0 && res.data.data.length == 0 && res.data.totalPage == mypage - 1) {
                    mypage -= 1;
                    $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, mypage)
                } else {
                    // 如果数据为空，隐藏页码，显示提示
                    $('#pagination').hide();
                    $('#tips').show();
                }

            }
        })
    }

    // 调用函数加载数据
    getComData(mypage,function(){})
})