$(function() {
    var pscroll;
    var vm = new Vue({
        el:"body",
        data: {
            isShow:false
        },
        methods: {

            showitem:function(e,type){
                var _this = this;
                var curitem = 0;
                if(!this.isShow) {
                    this.isShow = true;
                    $(".pul").find("li").removeClass("active");
                    var dom = $(e.target).parents("li");

                    this.$nextTick(function(){
                        $(".psimg").find("li").removeClass("active");
                        $(this).addClass("active");
                        var title = dom.find("p").text();
                        var time  = dom.find("span").text();
                        var src   = dom.find("img").data("src");
                        $(".overlay").find(".tit").html(title);
                        $(".overlay").find(".time").html(time);
                        $(".overlay").find("#source").attr("flashvars","vcastr_file=" + src);
                        console.log(title);

                        layer.open({
                            type: 1,
                            title:false,
                            closeBtn:2,
                            scrollbar:false,
                            area:["100%","100%"],
                            offset: [0,0],
                            content: $('.overlay'),
                            anim:7,
                            end: function(index) {
                                $(".psimg").find("li").removeClass("active");
                                _this.isShow = false;
                            },
                            success:function(dom){
                                var liLen = $(dom).find("li").length;
                                var height = $(window).height()-20-125;
                                $(dom).find(".con").height(height);
                                $(dom).find("#source").width(height*4/3).height(height);
                            } 
                        });



                    });

                } else {

                }

            }
        },
        ready:function() {
            // 
            // console.log(domimg);
            // $(document).on("click","img",function(){
            //     console.log(e);
            // })
        }
    });
})