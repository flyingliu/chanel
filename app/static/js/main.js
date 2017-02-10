$(function() {
    var fontSize = parseFloat(document.documentElement.style.fontSize);
    var indexdom = $(".indexmenu");
    if (indexdom.length > 0) {
        indexdom.on("click", ".iconfont", function() {
            indexdom.toggleClass("active");
        });


    };

})