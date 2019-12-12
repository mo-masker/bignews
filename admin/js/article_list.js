$(function () {
    // 当页面一加载就需要将文章类别信息和文章条目信息展示在页面
    // 获取文章类别信息
    $.get({
        url: BigNew.category_list,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                //获取成功把类名数据写入模板
                let htmlStr = template('categoryList', res);
                $('#selCategory').html(htmlStr)
            }
        }
    })

    // 获取所有文章信息
    $.get({
        url: BigNew.article_query,
        data: {
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: 1,
            perpage: 10
        },
        success: function (res) {
            // console.log(res);
            // 获取成功写入模板
            let htmlStr = template('artList', res);
            $('tbody').html(htmlStr);


            //将页面的页码条渲染出来 分页
            $('#pagination-demo').twbsPagination({
                totalPages: res.data.totalPage,
                visiblePages: 7,
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '尾页',
                // 页码的点击事件，发送请求获取数据
                onPageClick: function (event, page) {
                    $.get({
                        url: BigNew.article_query,
                        data: {
                            type: $('#selCategory').val(),
                            state: $('#selStatus').val(),
                            page: page,
                            perpage: 10
                        },
                        success: function (res) {
                            // 获取成功写入模板
                            let htmlStr = template('artList', res);
                            $('tbody').html(htmlStr);
                        }
                    })
                }
            })
        }
    });



    //筛选按钮注册点击事件
    $('#btnSearch').on('click', function (e) {
        //阻止默认行为
        e.preventDefault();

        $.get({
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: 1,
                perpage: 10
            },
            success: function (res) {
                console.log(res);
                // 搜索成功把数据写入模板
                let htmlStr = template('artList', res);
                $('tbody').html(htmlStr);
                //搜索到的数据条目是不一样的，所以总的页数是会动态改变的
                $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
            }
        });
    })



})