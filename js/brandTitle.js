$(function(){
    $.ajax({
        url: "http://127.0.0.1:3000/api/getbrandtitle",
        type: "get",
        dataType: "json",
        success: function(data){
            var liTag = template("brands-ul-template", data);
            $(".brands > ul").html(liTag);
        }
    });
});