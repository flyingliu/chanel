$(function() {

    var myScroll;
    var scrollOption = {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: "li",
        preventDefault: false
    };
    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/press_getList.html';

    var tmpPage = 1;

    var vm = new Vue({
        el: "#media",
        data: {
            list: []
        },
        methods: {
            tabs: function(type) {}
        },
        mounted: function() {
            // d 
            var myScroll;
            myScroll = new IScroll('#mescroll', scrollOption);
            myScroll.on('scrollEnd', function() {
                console.log(myScroll.currentPage.pageX);
            });
            document.addEventListener('touchmove', function(e) { e.preventDefault(); }, isPassive() ? {
                capture: false,
                passive: false
            } : false);

        }
    });



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
                    //d
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
 * 接口名称：获取当前分享列表
 * URL：/share_getList.html
 * 方式：POST
 * 参数：type 1.产品 2.媒介
 *  返回 200:成功
 * 	401:参数缺失
 * 	402:授权错误
 * 	{"status":"200","data":数据}
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