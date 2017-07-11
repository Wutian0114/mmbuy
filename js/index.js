$(function(){
    //获取菜单的数据
    $.ajax({
        url: "http://127.0.0.1:3000/api/getindexmenu",
        // url: "http://localhost:8080/mmbuy/php/get_index_menu.php", //测试
        type: "get",
        dataType: "json",
        success: function(data){
            console.log(data);
            var templateHtml = template("menu-template",data);
            $("#nav > .row").html(templateHtml);
            
            var menuHeight = $("#nav > .row > div:first-of-type").height();
            $("#nav > .row > div:nth-last-of-type(-n+4)").css({
                height: 0,
                minHeight:0,
                transition: "height 500ms"
            });
            
            $("#nav > .row > div:nth-of-type(8)").click(function(){
                var lastHeight = $("#nav > .row > div:last-of-type").height();

                if(lastHeight == 0){
                    $("#nav > .row > div:nth-last-of-type(-n+4)").css({
                        height: menuHeight + "px",
                    });
                }else {
                    $("#nav > .row > div:nth-last-of-type(-n+4)").css({
                        height: 0,
                        minHeight:0
                    });
                }
                
                return false; //阻止a标签的默认事件
            });
        }

    });

    //获取推荐商品列表数据
    $.ajax({
        url: "http://127.0.0.1:3000/api/getmoneyctrl ",
        type: "get",
        dataType: "json",
        success: function(data){
            // console.log(data);
            var templateHtml = template("product-template",data);
            $("#recommend > .recommend-list").html(templateHtml);
        }
    });

    
});