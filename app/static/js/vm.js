$(function() {

    var listScroll;
    var wookmark;
    var scrollOption = {
        preventDefault: false
    };
    var wookOptions = {
        align: 'left',
        autoResize: true,
        container: $('#gul'),
        offset: 10
    };
    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/vm_getList.html';
    var pressHeart = domain + '/press_heart.html';
    var getTagList = domain + '/press_tagList.html';
    var addShare = domain + '/share_add.html';

    var tmpPage = 1;
    var myScroll;
    if ($("#presslist").length > 0) {
        var vm = new Vue({
            el: "#presslist",
            data: {
                list: []
            },
            methods: {
                tabs: function(type) {}
            },
            mounted: function() {
                getListFn();

            }
        });
    }

    if ($("#vmdetail").length > 0) {
        var dm = new Vue({
            el: "#pressdetail",
            methods: {
                addbuy: function() {
                    var pid = getQueryString("id");
                    addShareFn(pid, undefined, 2);
                }
            }
        });
    }

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
                    vm.list = data.data;
                    $(".fsearch").hide();
                    if (listScroll) {
                        listScroll.destroy();
                        listScroll = null;
                    }
                    listScroll = new IScroll('#mypress', scrollOption);
                    document.addEventListener('touchmove', function(e) { e.preventDefault(); }, isPassive() ? {
                        capture: false,
                        passive: false
                    } : false);

                    vm.$nextTick(function() {
                        var imgs = [];
                        var imgsLength = vm.list.length
                        for (var i = 0; i < imgsLength; i++) {
                            var img = new Image();
                            img.src = vm.list[i].httpPostImg;
                            img.onload = function() {
                                imgsLength--;
                                if (imgsLength < 1) {
                                    wookmarkFn('#gul');
                                    $('#gul').trigger('refreshWookmark');
                                    listScroll.refresh();
                                }
                            }
                        }
                    })

                    if (data.totalPage > 1) {
                        listScroll.on('scrollEnd', function() {
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
                                        var imgsLength = data.data.length;
                                        for (var i = 0; i < data.data.length; i++) {
                                            vm.list.push(data.data[i]);

                                            var img = new Image();
                                            img.src = data.data[i].httpPostImg;
                                            img.onload = function() {
                                                imgsLength--;
                                                if (imgsLength < 1) {

                                                    $('#gul').wookmark(wookOptions)
                                                    $('#gul').trigger('refreshWookmark');
                                                    listScroll.refresh();
                                                }
                                            }
                                        };
                                    }
                                }
                            })
                        });
                    }


                } else {
                    msg(data.status);
                }
            }
        })
    }

    function wookmarkFn(dom) {
        $('#gul').wookmark(wookOptions);

    }


})

/**
 * 接口名称：获取陈列列表
 * URL：	/vm_getList.html
 * 方式：	POST
 * 参数：page 页数
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":列表,"totalPage":总页数}
 */