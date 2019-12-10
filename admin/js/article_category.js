$(function(){
    // 先获取数据渲染在页面上
    $.ajax({
        url:BigNew.category_list,
        type:'get',
        success:function(res){
            // console.log(res);
            let htmlStr = template('categoryList',res);
            $('tbody').html(htmlStr)
        }
    })
})