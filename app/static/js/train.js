$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/training_getList.html';
    var tmpPage = 1;
    var myScroll;

    var vm = new Vue({
        el: "#trainlist",
        data: {
            list: [],
            mytab: 1
        },
        methods: {
            tabs: function(type) {
                this.list = [];
                this.mytab = type;
                tmpPage = 1;
                myScroll.scrollTo(0, 0, 1000, IScroll.utils.ease.quadratic);
                getListFn(type);
                console.log(type);
            }
        },
        mounted: function() {
            getListFn(1);
            this.$nextTick(function() {
                myScroll = new IScroll($(".train")[0], { mouseWheel: true, scrollbars: false, click: true, interactiveScrollbars: true });
                document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
            })
        }
    });

    function getListFn(type) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                page: tmpPage,
                type: type
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].link = "training_detail_id_" + data.data[i].id + ".html"
                        data.data[i].haveLittle = data.data[i].little_title.length > 0 ? true : false;
                        vm.list.push(data.data[i]);
                        var img = new Image();
                        img.src = data.data[i].httpPostImg;
                        img.onload = function() {
                            myScroll.refresh();
                        }
                    };
                    if (data.totalPage > 1) {
                        myScroll.on('scrollEnd', function() {
                            tmpPage++;
                            if (tmpPage > data.totalPage) {
                                return false;
                            }

                            $.ajax({
                                type: "POST",
                                url: getList,
                                data: {
                                    page: tmpPage,
                                    type: vm.mytab
                                },
                                success: function(res) {
                                    var data = JSON.parse(res);
                                    if (data.status == 200) {
                                        for (var i = 0; i < data.data.length; i++) {
                                            data.data[i].link = "training_detail_id_" + data.data[i].id + ".html";
                                            data.data[i].haveLittle = data.data[i].little_title.length > 0 ? true : false;
                                            vm.list.push(data.data[i]);
                                            var img = new Image();
                                            img.src = data.data[i].httpPostImg;
                                            img.onload = function() {
                                                myScroll.refresh();
                                            }
                                        };
                                    }
                                }
                            })
                        });
                    }
                } else {
                    alert(data.status);
                }
            }
        })
    }



})

/**
 * 接口名称：获取列表
 * URL：	/training_getList.html
 * 方式：	POST
 * 参数：page 页数
 *      type 1.最新 2.主题 3.tips
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":列表,"totalPage":总页数}
 */