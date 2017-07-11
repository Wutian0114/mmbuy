$(function(){
    $.ajax({
        url: "http://127.0.0.1:3000/api/getsitenav",
        type: "get",
        dataType: "json",
        success: function(data){
            var listTag = template("nav-list-template", data);
            $("#nav-list > ul").html(listTag);
        }
    });
});