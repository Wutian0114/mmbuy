$(function () {

    //顶部选择标题的点击事件
    $(".title-select > .shop").click(function () {
        closeArea();
        $(this).toggleClass("active");
        $(".shop-list").slideToggle(300);
    });
    $(".title-select > .area").click(function () {
        closeShop();
        $(this).toggleClass("active");
        $(".area-list").slideToggle(300);
    });

    function closeShop(){
        $(".shop").removeClass("active");
        $(".shop-list").slideUp(300);
    }
    function closeArea(){
        $(".area").removeClass("active");
        $(".area-list").slideUp(300);
    }

    var shopId, areaId;

    //获取店铺列表
    $.ajax({
        url: "http://127.0.0.1:3000/api/getgsshop",
        type: "get",
        dataType: "json",
        success: function (data) {
            var listTag = template("shop-list-template", data);
            $(".shop-list").html(listTag);

            //先加载店铺信息，再加载区域信息
            getAreaAjax();

            //默认店铺名字
            $(".shop-list > li:first-of-type > a").addClass("checked");
            var firstName = $(".shop-list > li:first-of-type > a").text();
            $(".shop").text(firstName);
            //店铺列表点击事件
            $(".shop-list a").click(function () {
                $(".shop-list a").removeClass("checked");
                $(this).addClass("checked");
                var shopName = $(this).text();
                $(".shop").text(shopName);

                shopId = $(this).attr("data-shop-id");
                getProductList(shopId, areaId);

                closeShop();

                return false;
            });
        }
    });
    //获取区域列表
    function getAreaAjax() {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getgsshoparea",
            type: "get",
            dataType: "json",
            success: function (data) {
                var listTag = template("area-list-template", data);
                $(".area-list").html(listTag);

                //默认区域名字
                $(".area-list > li:first-of-type > a").addClass("checked");
                var firstName = $(".area-list > li:first-of-type > a").text();
                firstName = firstName.substr(0, 2);
                $(".area").text(firstName);

                //显示默认商品列表
                shopId = $(".shop-list > li:first-of-type > a").attr("data-shop-id");
                areaId = $(".area-list > li:first-of-type > a").attr("data-area-id");
                getProductList(shopId, areaId);


                //区域列表点击事件
                $(".area-list a").click(function () {
                    $(".area-list a").removeClass("checked");
                    $(this).addClass("checked");
                    var areaName = $(this).text();
                    areaName = areaName.substr(0, 2);
                    $(".area").text(areaName);

                    areaId = $(this).attr("data-area-id");
                    getProductList(shopId, areaId);

                    closeArea();

                    return false;
                });
            }
        });
    }


    //获取商品列表
    function getProductList(shopId, areaId) {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getgsproduct",
            type: "get",
            dataType: "json",
            data: { shopid: shopId, areaid: areaId },
            success: function (data) {
                var listTag = template("product-list-template", data);
                $(".product-content > .row").html(listTag);
            }
        });
    }
});