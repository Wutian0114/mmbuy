$(function(){
    //获取url地址的参数
    var reqObj = GetRequest();
    var categoryId = reqObj["categoryid"];
    //初始化页数
    var pageId = 1;
    getAjax(categoryId, pageId);

    
});

//封装ajax函数
function getAjax(categoryId, pageId){
        $.ajax({
            url: "http://127.0.0.1:3000/api/getproductlist",
            type: "get",
            dataType: "json",
            data: {categoryid: categoryId, pageid: pageId },
            success: function(data){
                var productHtml = template("product-template", data);
                $("body").animate({scrollTop:0},500);
                $("#product > .product-list").html(productHtml);

                //计算页数
                var pageCount = Math.ceil(data.totalCount/data.pagesize);
                var optionHtml = '';
                for(var i=1; i<=pageCount; i++){
                    if(i == pageId){
                        optionHtml += '<option value="'+i+'" selected>'+i+'/'+pageCount+'</option>'
                    }else {
                        optionHtml += '<option value="'+i+'">'+i+'/'+pageCount+'</option>'
                    }
                    
                }
                $("#product .selectBtn > select").html(optionHtml);

                //点击上下页按钮
                $("#product .prevBtn").off("click").on("click",function(){
                    if(pageId>1){
                        pageId -= 1;
                        getAjax(categoryId, pageId);
                    }else {
                        alert('已经到第一页');
                    }
                    
                    return false;
                });
                $("#product .nextBtn").off("click").on("click",function(){
                    if(pageId<pageCount){
                        pageId += 1;
                        getAjax(categoryId, pageId);
                    }else {
                        alert('已经到最后一页');
                    }

                    return false;
                });
                // $("#product .selectBtn > select > option:nth-of-type("+pageId+")").attr("selected","selected");

                //点击select选择框
                $("#product .selectBtn > select").off("change").on("change", function(){
                    
                    pageId = parseInt($(this).val());
                    getAjax(categoryId, pageId);
                });
            }
        });
    }