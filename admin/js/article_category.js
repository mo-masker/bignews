$(function () {
    // 先获取所有文章分类渲染在页面上
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        success: function (res) {
            // console.log(res);
            let htmlStr = template('categoryList', res);
            $('tbody').html(htmlStr)
        }
    })


    // 当点击取消按钮的时候，将表单中的数据全部重置
    $('#btn-cancel').on('click', function () {
        $('form'[0].reset());
    })


    // 当模态框在显示的时候，获取当前点击的按钮
    $('#myModal').on('show.bs.modal', function (e) {
        // e.relatedTarget 能获取到触发这个模态框显示的dom元素
        let dom = e.relatedTarget;
        // console.log(dom);

        // 判断到底是谁触发了这个模态框显示
        if (dom == $('#xinzengfenlei')[0]) {
            // console.log($('#xinzengfenlei'));
            // console.log($('#xinzengfenlei')[0]);
            // 改变模态框的文本
            $('#exampleModalLabel').text('新增文章分类');
            $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
            //将表单中的数据全部重置，而reset()重置这个方法是原生对象的
            $('form')[0].reset();
            // 模态框中的新增按钮
            $('#btn-confirm').on('click', function () {
                let name = $('#recipient-name').val();
                let slug = $('#message-text').val();
                // 如果表单内容为空  提示
                if (name == '' || slug == '') {
                    alert('请填写数据');
                    return;
                }
                $.post({
                    url: BigNew.category_add,
                    data: {
                        name: name,
                        slug: slug
                    },
                    success:function(res){
                        // 新增成功隐藏模态框
                        if(res.code == 200){
                            $('myModal').modal('hide');
                        }
                    }
                })
            })
        } else {
            $('#exampleModalLabel').text('编辑文章分类');
            $('#btn-confirm').text('编辑').addClass('btn-primary').removeClass('btn-success');
            //当弹出编辑的模态框的时候，需要得到一个文章类别id，根据这个id，发送ajax请求获得具体的文章类别信息
            let cateId = $(dom).attr('data-id');
            // console.log(cateId);
            $.get({
                url: BigNew.category_search,
                data: {
                    id: cateId,
                },
                success: function (res) {
                    // console.log(res);
                    if (res.code == 200) {
                        $('#recipient-name').val(res.data[0].name);
                        $('#message-text').val(res.data[0].slug);
                        $('#cateid').val(res.data[0].id);
                    }
                }
            })

            // 模态框的编辑按钮 收集更改后的数据，发送给服务器
            $('#btn-confirm').on('click', function () {
                let name = $('#recipient-name').val();
                let slug = $('#message-text').val();
                let id = $('#cateid').val();
                $.post({
                    url: BigNew.category_edit,
                    data: {
                        id: id,
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        // console.log(res);
                        // 修改成功隐藏模态框
                        if (res.code == 200) {
                            $('#myModal').modal('hide');
                        }
                    }
                })
            })
        }
    })
})