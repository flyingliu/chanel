$(function() {
    var myScroll = new IScroll($(".onelist")[0], { mouseWheel: true });
    document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
})