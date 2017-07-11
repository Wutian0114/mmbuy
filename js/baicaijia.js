$(function () {

    $.ajax({
        url: "http://127.0.0.1:3000/api/getbaicaijiatitle",
        type: "get",
        dataType: "json",
        success: function (data) {
            var itemTag = template("list-template", data);
            $("#baicai-title > ul").html(itemTag);

            var liWidth = $("ul > li").width();
            var ulWidth = data.result.length * liWidth;

            $("#baicai-title > ul").css({
                width: ulWidth
            });

            //初始化第一个标题页面
            $("#baicai-title > ul >li:first-of-type > a").addClass("active");
            var firstTitleId = $("#baicai-title > ul >li:first-of-type > a").attr("data-title-id");
            getProductList(firstTitleId);
            //ul中的li点击事件
            $("ul > li > a").click(function () {
                $("ul > li > a").removeClass("active");
                $(this).addClass("active");
                var titleId = $(this).attr("data-title-id");
                getProductList(titleId);

                return false;
            });

            //ul滑动
            var startX = 0, currentX = 0, offsetX = 0;
            var minOffset = $(window).width() - ulWidth;
            var isMove = false;

            $("#baicai-title > ul").on("touchstart", function (e) {
                startX = e.originalEvent.touches[0].clientX;

            });
            $("#baicai-title > ul").on("touchmove", function (e) {
                var moveX = e.originalEvent.touches[0].clientX;
                offsetX = moveX - startX;
                $("#baicai-title > ul").css({
                    transform: "translateX(" + (offsetX + currentX) + "px)",
                    transition: "none"
                });
                // if ((offsetX + currentX) <= 0 && (offsetX + currentX) >= minOffset) {
                //     $("#baicai-title > ul").css({
                //         transform: "translateX(" + (offsetX + currentX) + "px)"
                //     });
                // }
                isMove = true;
                // startX = moveX;
            });
            $("#baicai-title > ul").on("touchend", function (e) {
                console.log("触摸结束");
                if (isMove) {
                    if ((offsetX + currentX) > 0) {
                        currentX = 0;
                        $("#baicai-title > ul").css({
                            transform: "translateX(" + currentX + "px)",
                            transition: "transform 500ms"
                        });
                    } else if ((offsetX + currentX) < minOffset) {
                        currentX = minOffset;
                        $("#baicai-title > ul").css({
                            transform: "translateX(" + currentX + "px)",
                            transition: "transform 500ms"
                        });
                    } else {
                        currentX += offsetX;
                        console.log("currentX=" + currentX);
                    }
                    isMove = false;
                }


            });
        }
    });

    //获取产品列表
    function getProductList(titleId) {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getbaicaijiaproduct",
            type: "get",
            dataType: "json",
            data: { titleid: titleId },
            success: function (data) {
                // console.log(data);
                var itemTag = template("product-list-template", data);
                $("#baicai-product-list").html(itemTag);
            }
        });
    }
});