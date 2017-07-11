$(function(){
    var obj = new GetRequest();
    var productId = obj["productid"];
    // console.log(productId);
    $.ajax({
        url: "http://127.0.0.1:3000/api/getmoneyctrlproduct",
        type: "get",
        dataType: "json",
        data: {productid: productId},
        success: function(data){
            // console.log(data);
            var itemTag = template("product-detail-template",data);
            $("#detail-info").html(itemTag);
            $("#comment").html(data.result[0].productComment);
        }
    });
});
