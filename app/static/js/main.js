$(function() {
    var fontSize = parseFloat(document.documentElement.style.fontSize);
    var indexdom = $(".indexmenu");
    if (indexdom.length > 0) {
        var load = new Loading();

        $("body >.header,body >.footer").hide();
        var bgimg = new Image();
        bgimg.src = $(".bgimg")[0].src;
        bgimg.onload = function() {
            load.hide();
        }
        $("body").swipe({
            //Generic swipe handler for all directions
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

                if (direction == "down") {
                    indexdom.removeClass("active");
                } else if (direction == "up") {
                    indexdom.addClass("active");
                }
            }
        });

        indexdom.on("click", ".iconfont,.liup", function() {
            indexdom.toggleClass("active");
        });
    };
})

function Loading() {
    $("body").append('<div class="loading"></div');
}

var loadingFn = Loading.prototype;
loadingFn.hide = function() {
    if ($(".loading").length > 0) {
        $(".loading").remove();
    }
}

function getQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (url) {
        try {
            url = url.split("?")[1];
            var r = url.match(reg);
            if (r != null)
                return decodeURI(r[2]);
            return null;
        } catch (e) {
            return null;
        }
    } else {
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    }
}