$(function(){
    var obj = new GetRequest();
    var productId = obj["productid"];

    $.ajax({
        url: "http://127.0.0.1:3000/api/getproduct",
        type: "get",
        dataType: "json",
        data: {productid: productId},
        success: function(data){
            var productName = (data.result[0].productName).substr(0, 10);
            var categoryId = data.result[0].categoryId;
            //获取分类名称
            $.ajax({
                url: "http://127.0.0.1:3000/api/getcategorybyid",
                type: "get",
                dataType: "json",
                data: {categoryid: categoryId},
                success: function(data){
                    var categoryName = data.result[0].category;
        
                    $("#detail-nav > .breadcrumb").append('<li><a href="product_list.html?categoryid='+categoryId+'&pageid=1">'+categoryName+'</a></li>');
                    $("#detail-nav > .breadcrumb").append('<li class="active">'+productName+'</li>');
                }
            });

            $("#detail-info > .main-info").append(data.result[0].productImg);
            $("#detail-info > .main-info").append('<p>'+data.result[0].productName+'</p>');
            $("#detail-info > .bj-table").append(data.result[0].bjShop);

            //获取评论
            $.ajax({
                url: "http://127.0.0.1:3000/api/getproductcom",
                type: "get",
                dataType: "json",
                data: {productid: productId},
                success: function(data){
                    var itemTag = template("comment-item-template", data);
                    $("#comment > .comment-container").append(itemTag);
                }
            });
            
        }
    });
});