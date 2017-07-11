$(function(){
    $.ajax({
        url: "http://127.0.0.1:3000/api/getcoupon",
        type: 'get',
        dataType: "json",
        success: function(data){
            console.log(data);
            var itemTag = template("coupon-title-template", data);
            $("#coupon-title-list > .row ").html(itemTag);
        }
    });
});