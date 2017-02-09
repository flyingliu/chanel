$(function() {
    var pscroll;
    var vm = new Vue({
        el:"body",
        data: {
            pics:[],
            isShow:false,
            bigimg:'',
            title:'',
            time:''
        },
        methods: {
            showBigImg: function(index) {
                this.bigimg = this.pics[index];
                console.log(this.pics[index]);
            },

            showitem:function(e){
                var _this = this;
                var curitem = 0;
                if(!this.isShow) {
                    this.isShow = true;
                    $(".pul").find("li").removeClass("active");
                    var dom = $(e.target).parents("li");
                    var index = dom.index();
                    var lis = $(e.target).find("img").data("src").split("|");
                    var src   = $(this).find("img").data("src");

                    this.pics = lis;
                    this.title = dom.find("p").html();
                    this.time =  dom.find("span").html();

                    this.$nextTick(function(){
                        // var domimg = $(".pul").clone(true).appendTo(".psimg");
                        $(".psimg").on("click","li",function(){
                            $(".psimg").find("li").removeClass("active");
                            $(this).addClass("active");
                            var index = $(this).index();
                            _this.bigimg = lis[index];

                        })
                        $(".psimg").find("li").eq(index).click();

                        layer.open({
                            type: 1,
                            title:false,
                            closeBtn:2,
                            scrollbar:false,
                            area:["100%","100%"],
                            content: $('.overlay'),
                            anim:7,
                            end: function(index) {
                                $(".psimg").find("li").removeClass("active");
                                _this.isShow = false;
                            },
                            success:function(dom){
                                var liLen = $(dom).find("li").length;
                                $(dom).find(".con").height($(window).height()-140-125);
                                $(dom).find(".onul").width(175*liLen + 85);
            

                                pscroll = new IScroll($(".psimg")[0], {
                                    scrollX: true,
                                    scrollY: false,
                                    mouseWheel: false,
                                    click: true
                                });

                                $(".psimg li").eq(0).trigger("click");

                                $(dom).find(".next").click(function(){
                                    var len = $(".onul li").length;
                                    if(curitem < len) {
                                        curitem++;
                                        pscroll.scrollTo(-curitem * 350,0,500);
                                    }
                                });

                                $(dom).find(".prev").click(function(){
                                    if(curitem>0) {
                                        curitem--;
                                        pscroll.scrollTo(-curitem * 350,0,500);

                                    }
                                });

                                $(dom).on("click",".keynext",function(){
                                    var actIndex = $(dom).find(".onul").find("li.active").next().trigger("click");
                                    if($(".onul li.active").prev()[0]) {
                                        pscroll.scrollToElement($(".onul li.active").prev()[0]);
                                        var curitem = $(".onul li.active").index();
                                    }
                                    
                                    if(!actIndex.length) {
                                        layer.msg("最后一张了");
                                    }                                    

                                });
                                $(dom).on("click",".keyprev",function(){
                                    var actIndex = $(dom).find(".onul").find("li.active").prev().trigger("click");
                                    if($(".onul li.active").prev()[0]) {
                                        pscroll.scrollToElement($(".onul li.active").prev()[0]);
                                        var curitem = $(".onul li.active").index();

                                    }
                                    if(!actIndex.length) {
                                        layer.msg("这是第一张了");
                                    }
                                   
                                });


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
        document.onkeydown=function(event){
            var isOk = $('.overlay:visible').length > 0;
            if(isOk) {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode==37){ // left
                    console.log("left");
                    $(".keyprev").trigger("click");
                }
                if(e && e.keyCode==39){ // right 
                    console.log("right");
                    $(".keynext").trigger("click");
                    //要做的事情
                }   
            }


            }; 
        }
    });


})