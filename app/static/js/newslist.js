$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/news_getList.html';
    var tmpPage = 1;
    var myScroll;

    var vm = new Vue({
        el: "#newslist",
        data: {
            list: []
        },
        mounted: function() {
            getListFn();
            this.$nextTick(function() {
                myScroll = new IScroll($(".onelist")[0], { mouseWheel: true, scrollbars: false, click: true, interactiveScrollbars: true });
                document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
            })
        }
    });

    function getListFn() {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                page: tmpPage
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].link = "news_detail_id_" + data.data[i].id + ".html"
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
                                    page: tmpPage
                                },
                                success: function(res) {
                                    var data = JSON.parse(res);
                                    if (data.status == 200) {
                                        for (var i = 0; i < data.data.length; i++) {
                                            data.data[i].link = "news_detail_id_" + data.data[i].id + ".html";
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
 * 接口名称：获取新闻列表
 * URL：	/news_getList.html
 * 方式：	POST
 * 参数：page 页数
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":新闻列表,"totalPage":总页数}
 */