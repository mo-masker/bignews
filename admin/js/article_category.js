$(function(){
    // 先获取所有文章分类渲染在页面上
    $.ajax({
        url:BigNew.category_list,
        type:'get',
        success:function(res){
            // console.log(res);
            let htmlStr = template('categoryList',res);
            $('tbody').html(htmlStr)
        }
    })


    // 当模态框在显示的时候，获取当前点击的按钮
    $('#myModal').on('show.bs.modal',function(e){
        // e.relatedTarget 能获取到触发这个模态框显示的dom元素
        let dom = e.relatedTarget;
        console.log(dom);

        // 判断到底是谁触发了这个模态框显示
        if(dom == $('#xinzengfenlei')[0]){
            // console.log($('#xinzengfenlei'));
            // console.log($('#xinzengfenlei')[0]);
            // 改变模态框的文本
            $('#exampleModalLabel').text('新增文章分类');
            $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
        }else{
            $('#exampleModalLabel').text('编辑文章分类');
            $('#btn-confirm').text('编辑').addClass('btn-primary').removeClass('btn-success');
        }
    })
})