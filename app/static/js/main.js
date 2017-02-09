$(function() {
    var fontSize = parseFloat(document.documentElement.style.fontSize);
    var indexdom = $(".indexmenu");
    if (indexdom.length > 0) {
        var listTop = $(window).height() - fontSize * 4;
        var backTop = $(window).height() - fontSize * 2.8;
        var activeListTop = fontSize * 2.2;
        indexdom.find(".list").css({ "top": listTop });
        indexdom.find(".black").css({ "top": backTop });

        indexdom.on("click", ".up", function() {
            indexdom.toggleClass("active");
            indexdom.find(".black").css({ "top": 0 });
            indexdom.find(".list").css({ "top": activeListTop });
        });
        indexdom.on("click", ".down", function() {
            indexdom.toggleClass("active");
            indexdom.find(".black").css({ "top": backTop });
            indexdom.find(".list").css({ "top": listTop });
        });

    };

})