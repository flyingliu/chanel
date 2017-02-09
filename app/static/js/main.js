function play(obj) {
    var defaults = {//通过js调用播放器并安装到指定容器（#player）内
        stretching: "fill", //锁定高宽比填满屏幕
        flashplayer: "/app/static/js/player.swf", //调用播放器
        image: "/app/static/images/t.png", //视频预览图片
        width: "100%", //播放器宽
        height: "100%",
        file: "/app/static/images/1234.flv" ////调用视频文件
    }
    var obj = $.extend({},defaults,obj)

    jwplayer(obj.id).setup(obj);
}




$(function(){
    var timer;



    var v1 = {
        id:"v1",
        image:$("#v1").data("image"),
        file:$("#v1").data("file")
    }

    var v2 = {
        id:"v2",
        image:$("#v2").data("image"),
        file:$("#v2").data("file")
    }

    var v3 = {
        id:"v3",
        image:$("#v3").data("image"),
        file:$("#v3").data("file")
    }

    var v4 = {
        id:"v4",
        image:$("#v4").data("image"),
        file:$("#v4").data("file")
    }

    play(v1);
    play(v2);
    play(v3);
    play(v4);


    // top is fixed----------
    $(window).scroll( function() { 
        var sTop = $(document).scrollTop();
        if(sTop > 133) {
            $(".navi").addClass("fixed"); 
        } else {
            $(".navi").removeClass("fixed"); 
        }
    });

    // --------show erweima

    $(".showerweima").hover(function(){
        $(this).parent().hide().next().removeClass("hide").show();
    });
    $(".reseterweima").hover(function(){
    },function(){
        $(this).find("ol").show().end().find(".div").hide();
    });

    // show time--------
    function showTime() {
        var gametime = +new Date( $(".gametime").text() );
        var nowtime = +new Date();

        var timeNum = gametime - nowtime;
        var timeText;
        var mytime = {
            d: parseInt(timeNum / 86400000),
            h: parseInt( (timeNum % 86400000) / 3600000 ),
            m: parseInt( (timeNum % 3600000) / 60000 ),
            s: parseInt( (timeNum % 60000) / 1000 )
        }
        if(timeNum>0) {
            timeText = mytime.d + '天'+ mytime.h +'小时'+ mytime.m +'分'+ mytime.s +'秒';

        } else {
            timeText = "比赛开始！"
            clearInterval(timer);
        }

        $(".togametime").text(timeText);   
    }
     
    timer = setInterval(showTime,1000)

    // set zoom
    var winWidth = $(window).width();

    // if(winWidth < 1440) {
    //     $("body").css("zoom",winWidth/1600);
    // }

    //search
    $("#doSearch").click(function(){
        location.href="/search_index.html?key="+$("#searchContent").val();
    });



})