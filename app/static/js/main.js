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

    if ($(".product").outerHeight() < $(window).height()) {
        $(".noticeup").fadeOut();
    }



    document.addEventListener('touchstart', touch, false);

    function touch() {
        $(".noticeup").fadeOut();
        $(".mescroll > i").fadeOut();
    }

})

var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
var shareSend = domain + '/share_send.html';

function msg(msg) {
    //提示
    layer.open({
        content: msg,
        skin: 'msg',
        time: 2
    });
}


function Loading() {
    $("body").append('<div class="loading"></div');
}

function gotoid(dom) {
    $("html,body").animate({ scrollTop: $(dom).offset().top }, 500);
}


var loadingFn = Loading.prototype;
loadingFn.hide = function() {
    if ($(".loading").length > 0) {
        $(".loading").remove();
    }
}


function shareSendFn(shareid) {
    var name = localStorage.getItem("name") ? localStorage.getItem("name") : "未填写姓名";
    var sex = localStorage.getItem("sex");
    $.ajax({
        type: "POST",
        url: shareSend,
        data: {
            shareid: shareid,
            touser: name,
            sex: sex
        },
        success: function(res) {
            var data = JSON.parse(res);
            if (data.status == 200) {
                msg(data.data);
            } else {
                msg(data.data);
            }
        }
    })
}

// ref https://github.com/WICG/EventListenerOptions/pull/30
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassiveOption = true;
            }
        }));
    } catch (e) {}
    return supportsPassiveOption;
}

function updateUrl(url, title) {
    var index = 0;
    var z = 0;

    if (!url)
        return;
    if (url.indexOf("http") >= 0) {
        for (var i = 0; i < url.length; i++) {
            var k = url.charAt(i);
            if (k == "/") {
                z++;
            }

            if (z == 3) {
                index == i;
                break;
            }
        }

        url = url.substr(index, url.length);
    }
    if (!title)
        title = document.title;

    var state = { // 这里可以是你想给浏览器的一个State对象，为后面的StateEvent做准备。
        title: title,
        url: url
    };

    history.pushState(state, title, url);
    document.title = title;

    window.onpopstate = function(e) {
        document.title = e.state.title;
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