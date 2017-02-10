$(function() {
    var fontSize = parseFloat(document.documentElement.style.fontSize);
    var indexdom = $(".indexmenu");
    if (indexdom.length > 0) {
        $("body >.header,body >.footer").hide();
        indexdom.on("click", ".iconfont", function() {
            indexdom.toggleClass("active");
        });
    };
})