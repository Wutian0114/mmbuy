$(function () {
    var obj = new GetRequest();
    var brandTitleId = obj["brandtitleid"];
    var pageSize = 4;

    //获取标题信息
    $.ajax({
        url: "http://127.0.0.1:3000/api/getbrandtitle",
        type: "get",
        dataType: "json",
        success: function (data) {
            var result = data.result;
            result.forEach(function (value, i) {
                if (value.brandTitleId == brandTitleId) {
                    var brandTitle = value.brandTitle.replace("十大品牌", "");
                    $("#route-nav > ol >li.active").text(brandTitle + "哪个牌子好");
                    $("#top-ten >.top-title").text(brandTitle + "哪个牌子好");
                    $("#top-sale >.top-title").text(brandTitle + "产品销量排行");
                    $("#top-comment >.top-title").text(brandTitle + "最新评论");
                }
            });
        }
    });

    //获取排行信息
    $.ajax({
        url: "http://127.0.0.1:3000/api/getbrand",
        type: "get",
        dataType: "json",
        data: { brandtitleid: brandTitleId },
        success: function (data) {
            var listTag = template("top-ten-list-template", data);
            $("#top-ten > ul").html(listTag);
            $("#top-ten > ul > li:nth-of-type(1) > a > .tip").addClass("first");
            $("#top-ten > ul > li:nth-of-type(2) > a > .tip").addClass("second");
            $("#top-ten > ul > li:nth-of-type(3) > a > .tip").addClass("third");

        }
    });

    //获取销量列表
    $.ajax({
        url: "http://127.0.0.1:3000/api/getbrandproductlist",
        type: "get",
        dataType: "json",
        data: { brandtitleid: brandTitleId, pagesize: pageSize },
        success: function (data) {
            
            var listTag = template("top-sale-list-template", data);
            $("#top-sale > .sale-list").html(listTag);

            //获取评论内容，假设获取的是销量列表第一的商品评论
            var firstProductId = data.result[0].productId;
            var firstProductImg = data.result[0].productImg;
            var firstProductName = data.result[0].productName;
            $("#top-comment .item-img").html(firstProductImg);
            $("#top-comment .item-name").html(firstProductName);
            $.ajax({
                url: "http://127.0.0.1:3000/api/getproductcom",
                type: "get",
                dataType: "json",
                data: { productid: firstProductId },
                success: function (data) {
                    
                    $("#top-comment .comment-title > span:first-of-type").html(data.result[0].comName);
                    $("#top-comment .comment-title > span:last-of-type").html(data.result[0].comTime);
                    $("#top-comment .comment-content").html(data.result[0].comContent);
                }
            });
        }
    });
});