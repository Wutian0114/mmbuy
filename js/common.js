/**
 * 公共头部、搜索框和底部
 */

$(function(){
    //头部内容
    var header = $("#header");
    var headerHtml = '';
    if(header){
        if(header.attr("class") == "back"){
            headerHtml += '<a href="javascript:history.back();" class="return-back"></a>';
            headerHtml += '<span>'+document.title+'</span>';
        }else {
            headerHtml += '<a href="#" class="logo">';
            headerHtml += '<img src="./images/header_logo.png" alt="头部logo">';
            headerHtml += '</a>';
        }
        
        headerHtml += '<a href="#" class="app-download">';
        headerHtml += '<img src="./images/header_app.png" alt="app下载">';
        headerHtml += '</a>';
        header.html(headerHtml);
    }
    
    //搜索内容
    var search = $("#search");
    if(search){
        var searchHtml = '';
        searchHtml += '<input type="search" placeholder="请输入你想比价的商品">';
        searchHtml += '<button type="button">搜索</button>';
        search.html(searchHtml);
    }

    //底部内容
    var footer = $("#footer");
    if(footer){
        var footerHtml = '';
        footerHtml += '<div class="row">';
        footerHtml += '<div class="col-xs-4"><a href="#">登录</a></div>';
        footerHtml += '<div class="col-xs-4"><a href="#">注册</a></div>';
        footerHtml += '<div class="col-xs-4"><a href="javascript:;" id="back-top">返回顶部</a></div>';
        footerHtml += '</div>';
        footerHtml += '<div class="footer-info">';
        footerHtml += '<p><a href="#">手机app下载</a>慢慢买手机版--掌上比价平台</p>';
        footerHtml += '<p>m.manmanbuy.com</p>';
        footerHtml += '</div>';

        footer.html(footerHtml);
    }

    //返回顶部
    $("#back-top").click(function(){
        var speed = 500;
        $("body").animate({scrollTop:0},speed);
    });

});

//获取URL地址的参数（?后面的字符串）
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

 