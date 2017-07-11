$(function(){
    //标题信息
    $.ajax({
        url:"http://127.0.0.1:3000/api/getcategorytitle",
        type: "get",
        datatype: "json",
        success: function(data){
            var stringHtml = template("category-title-template",data);
            $("#category > .panel-group").html(stringHtml);

            $("#category .panel-title > a").click(function(){
                var titleId = $(this).attr("data-title-id");
                var hrefString = $(this).attr("href");

                //分类内容
                if($(hrefString +" > .panel-body > .row").html() == ""){
                    $.ajax({
                        url: "http://127.0.0.1:3000/api/getcategory",
                        type: "get",
                        dataType: "json",
                        data: {titleid: titleId},
                        success: function(data){
                            var stringHtml2 = template("category-content-template", data);
                            $(hrefString + " > .panel-body > .row").html(stringHtml2);
                        }
                    });
                }

            });
            
        }
    });
});