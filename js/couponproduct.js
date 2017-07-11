$(function(){
    var obj = new GetRequest();
    var couponId = obj["couponid"];
    
    $.ajax({
        url: "http://127.0.0.1:3000/api/getcouponproduct",
        type: "get",
        dataType: "json",
        data: {couponid: couponId},
        success: function(data){
            console.log(data);
            var itemTag = template("coupon-product-template", data);
            $("#coupon-product-list").html(itemTag);
        }
    });
});