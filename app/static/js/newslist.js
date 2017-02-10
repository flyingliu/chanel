$(function() {



    var vm = new Vue({
        el: "#newslist",
        data: {
            list: [{
                title: "这个的撒发生的标题",
                desc: "着啊士大夫倒萨，描述啊不错的",
                time: "03/04/2017"
            }, {
                title: "这个的撒发生的标题",
                desc: "着啊士大夫倒萨，描述啊不错的着啊士大夫倒萨，描述啊不错的",
                time: "03/04/2017"
            }]
        },
        mounted: function() {
            this.$nextTick(function() {
                var myScroll = new IScroll($(".onelist")[0], { mouseWheel: true, scrollbars: false, interactiveScrollbars: true });
                document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
            })
        }



    });
})