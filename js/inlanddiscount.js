$(function () {
    var pageId = 1;
    var categoryId = 1;
    
    getAjax(categoryId, pageId);

    function getAjax(categoryId, pageId) {
        setTimeout(function () {
            /* 注意：这里使用getproductlist的地址是为了实现分页 */
            $.ajax({
                url: "http://127.0.0.1:3000/api/getproductlist",
                type: "get",
                dataType: "json",
                data: { categoryid: categoryId, pageid: pageId },
                success: function (data) {

                    var itemTag = template("product-list-template", data);
                    $("#product-list").append(itemTag);
                    $("#loading-img").css({
                        display: "none"
                    });

                    var isLoading = false;
                    //页数
                    var pageNum = Math.ceil(data.totalCount / data.pagesize);

                    $(window).scroll(function () {

                        var scrollTop = $(this).scrollTop();
                        var mainHeight = $("#header").height() + $("#product-list").height() - $(window).height();
                        // console.log("mainHeight: " + mainHeight);
                        if (scrollTop >= mainHeight && !isLoading) {
                            // console.log("-----------对对对-------------");
                            isLoading = true;
                            $("#loading-img").css({
                                display: "block"
                            });
                            if (pageId < pageNum) {
                                pageId++;
                                getAjax(categoryId, pageId);
                            } else {
                                $("#loading-img").css({
                                    display: "none"
                                });
                                $("#loading-over").css({
                                    display:"block"
                                });
                            }

                        }
                    });
                }
            });
        }, 2000);
    }



    // console.log($("#loading-img").css("transform"))
});