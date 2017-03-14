$(function() {

    var listScroll;
    var tagsScroll;
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
    var getList = domain + '/press_getList.html';
    var pressHeart = domain + '/press_heart.html';
    var getTagList = domain + '/press_tagList.html';
    var addShare = domain + '/share_add.html';
    var ajaxFlag = true;

    var tmpPage = 1;
    var myScroll;
    if ($("#presslist").length > 0) {
        var vm = new Vue({
            el: "#presslist",
            data: {
                list: [],
                tags: [],
                search: undefined,
                season: [],
                size: []
            },
            methods: {
                tabs: function(type) {},
                showformFn: function() {
                    $(".fsearch").show();
                    setTimeout(function() {
                        tagsScroll.refresh();
                    }, 500);
                },
                closeFilter: function() {
                    $(".fsearch").hide();
                },
                addHeart: function(item) {
                    pressHeartFn(item);

                },
                getSearch: function(flag) {
                    tmpPage = 1;
                    if (!flag) {
                        this.size = [];
                        this.season = [];
                        this.search = '';
                    }
                    getListFn(this.size, this.season, this.search);
                    listScroll.scrollTo(0, 0);

                }
            },
            mounted: function() {
                getTagListFn();
                getListFn(this.size, this.season, this.search);

            }
        });
    }

    if ($("#pressdetail").length > 0) {
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

    function getListFn(size, season, search) {
        var size = JSON.parse(JSON.stringify(size));
        var season = JSON.parse(JSON.stringify(season));
        var search = search ? search : undefined;
        if (!ajaxFlag) { return false };
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                page: tmpPage,
                search: search,
                season: season,
                size: size
            },
            traditional: true,
            success: function(res) {
                ajaxFlag = false;
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
                        var imgsLength = vm.list.length;
                        for (var i = 0; i < imgsLength; i++) {
                            var img = new Image();
                            img.src = vm.list[i].httpPostImg;
                            img.onload = function() {
                                imgsLength--;
                                if (imgsLength < 1) {
                                    ajaxFlag = true;
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
                                    page: tmpPage,
                                    search: search,
                                    season: season,
                                    size: size
                                },
                                success: function(res) {
                                    var data = JSON.parse(res);
                                    ajaxFlag = false;
                                    if (data.status == 200) {
                                        var imgsLength = data.data.length;
                                        for (var i = 0; i < data.data.length; i++) {
                                            vm.list.push(data.data[i]);
                                            var img = new Image();
                                            img.src = data.data[i].httpPostImg;
                                            img.onload = function() {
                                                imgsLength--;
                                                if (imgsLength < 1) {
                                                    ajaxFlag = true;
                                                    $('#gul').wookmark(wookOptions);
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
                    alert(data.status);
                }
            }
        })
    }

    function wookmarkFn(dom) {
        $('#gul').wookmark(wookOptions);

    }

    function getTagListFn(type) {
        $.ajax({
            type: "POST",
            url: getTagList,
            data: {},
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.tags = data.data;
                    vm.$nextTick(function() {
                        tagsScroll = new IScroll($('.scrollcon')[0], scrollOption);
                    });

                } else {
                    msg(data.data);
                }
            }
        })
    }

    function pressHeartFn(item) {
        $.ajax({
            type: "POST",
            url: pressHeart,
            data: {
                pid: item.id
            },
            success: function(res) {
                var data = JSON.parse(res);
                console.log(data);
                if (data.status == 200) {
                    msg(data.data);
                    item.heart++;
                    item.isActive = true;
                } else {
                    msg(data.data);
                }
            }
        })
    }

    function addShareFn(pid, colorid, type) {
        $.ajax({
            type: "POST",
            url: addShare,
            data: {
                pid: pid,
                colorid: colorid,
                type: type
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    msg(data.data);
                } else {
                    msg(data.data);
                }
            }
        })
    }


})

/**
 * 接口名称：媒介点赞
 * URL：	/press_heart.html
 * 方式：	POST
 * 参数：pid 媒介id
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		403:已经点赞过了
 * 		{"status":"200","data":"success"}
 */

/**
 * 接口名称：获取媒介列表
 * URL：	/press_getList.html
 * 方式：	POST
 * 参数：page 页s数
        search 搜索框输入内容 可以填多个内容，多个内容以空格隔开
        season 系列id 可多选 以1,2,3形式排列
        size   尺寸id 可多选 以1,2,3形式排列
    *  返回 200:成功
    * 		401:未知错误
    * 		402:授权错误
    * 		{"status":"200","data":列表,"totalPage":总页数}
    */

/**
 * 接口名称：媒介搜索分类
 * URL：	/press_tagList.html
 * 方式：	POST
 * 参数：
 *  返回 200:成功
 * 		402:授权错误
 * 		{"status":"200","data":tagList}
 */

/**
 * 接口名称：添加至分享列表
 * URL：	/share_add.html
 * 方式：	POST
 * 参数：pid 产品或媒介id
 * 		colorid 如果type=1 colorid必填
 *      type 1产品 2媒介
 *  返回 200:成功
 * 		401:参数缺失		
 * 		402:授权错误
 * 		403:颜色缺失
 * 		404:产品已在分享列表中
 * 		{"status":"200","data":"success"}
 */