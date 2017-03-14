$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/share_getList.html';
    var addShare = domain + '/share_add.html';
    var shareSend = domain + '/share_send.html';
    var tmpPage = 1;
    var pid = getQueryString("pid");
    var shareid = getQueryString("id");
    var maintype = getQueryString("maintype");
    var type = getQueryString("type");

    var winHeight = $(window).height();
    var currProduct, isEnd;
    var myScroll;
    var scrollOption = {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: "li",
        preventDefault: false,
        eventPassthrough: true

    };


    if (type > 0) {
        getList = domain + '/share_getHistoryDetail.html';
    }

    var vm = new Vue({
        el: "#sharedetail",
        data: {
            list: {},
            curr: {},
            mydefault: {},
            touser: '',
            mysex: 0,
            maintype: maintype || 1,
            currIndex: 0,
            isError: false,
            isShowForm: false,
            isNotice: true,
            imgIndex: ''
        },
        computed: {
            // a computed getter
            showIndex: function() {

                var tmpIndex = 0;
                if (this.imgIndex < 9) {
                    tmpIndex = "0" + (this.imgIndex + 1);
                } else {
                    tmpIndex = this.imgIndex + 1;
                }
                return tmpIndex;
            }
        },
        methods: {
            addbuy: function() {
                addShareFn(pid, this.curr.cid, 1);
            },
            hideNotice: function() {
                // this.isNotice = false;

            },
            showform: function(flag) {
                this.isShowForm = flag;
            },
            saveLocal: function() {

                if (!this.touser) {
                    msg("请填写姓名");
                    return false;
                }
                if (!this.mysex) {
                    msg("请选择称谓");
                    return false;
                }
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: ENV.appId, // 必填，公众号的唯一标识
                    timestamp: ENV.timestamp, // 必填，生成签名的时间戳
                    nonceStr: ENV.nonceStr, // 必填，生成签名的随机串
                    signature: ENV.signature, // 必填，签名，见附录1
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'showOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    wx.showOptionMenu();
                    wx.onMenuShareTimeline({
                        title: shareTitle, // 分享标题
                        link: lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function() {
                            shareSendFn(shareid);
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: shareTitle, // 分享标题
                        desc: descContent, // 分享描述
                        link: lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            shareSendFn(shareid);
                        }
                    });

                });


                this.isShowForm = false;
                if (this.touser) {
                    localStorage.setItem("name", this.touser);
                }
                layer.open({
                    title: false,
                    className: 'mypop',
                    content: '点击 &bull;&bull;&bull; 分享'
                });

                // shareSendFn(5);


            },
            selectMale: function(sex) {
                var _this = this;

                localStorage.setItem("sex", sex);
                this.mysex = sex;
                return false;
            }
        },
        watch: {
            'imgIndex': function(a, b) {
                console.log(a);

                var ms = $("#mescroll");
                var imgWidth = $(window).width();
                var fontSize = parseFloat(document.documentElement.style.fontSize);
                var winHeight = $(window).height() - fontSize * 2.2;
                var imgHeight = ms.find("img").eq(a).height();
                var textHeight = 2.2 * fontSize
                ms.height(imgHeight + textHeight);
                ms.width(imgWidth);
                ms.find("ul").height(imgHeight + textHeight);

                $("i.prev,i.next").show();
                $(".mescroll > i").fadeIn();
                if (a == 0) {
                    $("i.prev").hide();
                } else if (a == this.list.length - 1) {
                    $("i.next").hide();
                }

                myScroll.refresh();

            }
        },
        mounted: function() {
            var _this = this;
            getListFn(this.maintype, shareid);

        }
    });


    function getListFn(type, shareid) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                type: type,
                shareid: shareid
            },
            success: function(res) {
                // res = '{ "status": 200, "data": [{ "id": "81", "shareid": "14", "pid": "11", "colorid": "6", "productArr": { "id": "11", "name": "\u9999\u5948\u513fGABRIELLE\u5927\u53f7\u8d2d\u7269\u5305", "type": "3", "size": "3", "season": "4", "tag": "", "description": "\u590d\u53e4\u5c0f\u725b\u76ae\u3001\u5149\u6ed1\u5c0f\u725b\u76ae\u3001\u94f6\u8272\u4e0e\u91d1\u8272\u91d1\u5c5e", "image_name": "20170228511263.jpeg", "default_color": "13", "model_no": "A93823 Y61477", "spec": "30.5 x 35 x 13 CM", "price": "29,500", "url": "", "rank": "0", "status": "1", "create_time": "2017-02-26 23:08:06", "update_time": "2017-02-28 13:00:52", "delete_time": "0000-00-00 00:00:00" }, "httpPostImg": "http:\/\/pch.minuteschina.com\/upload\/image\/product\/20170228929686.jpeg", "colorArr": { "id": "6", "name": "\u9ed1", "code": "94305" } }, { "id": "80", "shareid": "14", "pid": "5", "colorid": "7", "productArr": { "id": "5", "name": "\u9999\u5948\u513fGABRIELLE\u5c0f\u53f7\u6d41\u6d6a\u5305", "type": "1", "size": "1", "season": "4", "tag": "", "description": "\u590d\u53e4\u5c0f\u725b\u76ae\u3001\u5149\u6ed1\u5c0f\u725b\u76ae\u3001\u94f6\u8272\u4e0e\u91d1\u8272\u91d1\u5c5e", "image_name": "20170226269683.jpeg", "default_color": "7", "model_no": "A91810 Y61477", "spec": "15 x 20 x 8 CM", "price": "23,100", "url": "", "rank": "0", "status": "1", "create_time": "2017-02-26 22:53:19", "update_time": "2017-02-27 16:13:45", "delete_time": "0000-00-00 00:00:00" }, "httpPostImg": "http:\/\/pch.minuteschina.com\/upload\/image\/product\/20170226269683.jpeg", "colorArr": { "id": "7", "name": "\u767d\u4e0e\u9ed1", "code": "C0200" } }, { "id": "79", "shareid": "14", "pid": "11", "colorid": "13", "productArr": { "id": "11", "name": "\u9999\u5948\u513fGABRIELLE\u5927\u53f7\u8d2d\u7269\u5305", "type": "3", "size": "3", "season": "4", "tag": "", "description": "\u590d\u53e4\u5c0f\u725b\u76ae\u3001\u5149\u6ed1\u5c0f\u725b\u76ae\u3001\u94f6\u8272\u4e0e\u91d1\u8272\u91d1\u5c5e", "image_name": "20170228511263.jpeg", "default_color": "13", "model_no": "A93823 Y61477", "spec": "30.5 x 35 x 13 CM", "price": "29,500", "url": "", "rank": "0", "status": "1", "create_time": "2017-02-26 23:08:06", "update_time": "2017-02-28 13:00:52", "delete_time": "0000-00-00 00:00:00" }, "httpPostImg": "http:\/\/pch.minuteschina.com\/upload\/image\/product\/20170228511263.jpeg", "colorArr": { "id": "13", "name": "\u7c73\u8272\u4e0e\u9ed1", "code": "C0204" } }] }';
                // res = '{"status":200,"data":[{"id":"102","shareid":"28","pid":"8","colorid":"0","pressArr":{"id":"8","title":"","description":"Gabrielle bag, feature report in Mar issue, 2P","image_name":"20170302671779.jpeg","url":"","heart":"1","status":"1","create_time":"2017-03-02 23:26:40","update_time":"2017-03-03 22:32:59","delete_time":"0000-00-00 00:00:00","httpPostImg":"http:\/\/devpch.minuteschina.com\/upload\/image\/press\/20170302671779.jpeg"}},{"id":"101","shareid":"28","pid":"9","colorid":"0","pressArr":{"id":"9","title":"","description":"Gabrielle bag at SS Press Preview, Jan 11, 2017","image_name":"20170302590786.jpeg","url":"http:\/\/weibo.com\/2796274002\/Eqjn9nmWN","heart":"2","status":"1","create_time":"2017-03-02 23:28:28","update_time":"2017-03-02 23:28:47","delete_time":"0000-00-00 00:00:00","httpPostImg":"http:\/\/devpch.minuteschina.com\/upload\/image\/press\/20170302590786.jpeg"}},{"id":"100","shareid":"28","pid":"7","colorid":"0","pressArr":{"id":"7","title":"","description":"\u5218\u96ef\u5728\u5df4\u9ece\u53c2\u52a0\u9999\u5948\u513f2017 \u79cb\u51ac\u9ad8\u7ea7\u5b9a\u5236\u79c0\uff0c2017\u5e741\u670824\u65e5","image_name":"20170302685883.jpeg","url":"http:\/\/weibo.com\/1747534564\/Esm1FjO1L  ","heart":"2","status":"1","create_time":"2017-03-02 23:24:15","update_time":"2017-03-02 23:24:15","delete_time":"0000-00-00 00:00:00","httpPostImg":"http:\/\/devpch.minuteschina.com\/upload\/image\/press\/20170302685883.jpeg"}},{"id":"99","shareid":"28","pid":"4","colorid":"0","pressArr":{"id":"4","title":"","description":"\u554a\u98d2\u98d2","image_name":"20170301023541.jpeg","url":"","heart":"1","status":"1","create_time":"2017-03-01 15:47:37","update_time":"2017-03-03 22:34:13","delete_time":"0000-00-00 00:00:00","httpPostImg":"http:\/\/devpch.minuteschina.com\/upload\/image\/press\/20170301023541.jpeg"}},{"id":"98","shareid":"28","pid":"6","colorid":"0","pressArr":{"id":"6","title":"","description":"\u5218\u96ef\u5728\u5df4\u9ece\u53c2\u52a0\u9999\u5948\u513f2017 \u79cb\u51ac\u9ad8\u7ea7\u5b9a\u5236\u79c0\uff0c2017\u5e741\u670824\u65e5","image_name":"20170302513042.jpeg","url":"http:\/\/weibo.com\/1747534564\/Esm1FjO1L  ","heart":"1","status":"1","create_time":"2017-03-02 23:23:16","update_time":"2017-03-02 23:23:16","delete_time":"0000-00-00 00:00:00","httpPostImg":"http:\/\/devpch.minuteschina.com\/upload\/image\/press\/20170302513042.jpeg"}}]}';
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.list = data.data;


                    if (vm.list.length < 2) {
                        $(".noticeup").hide();

                    }
                    vm.$nextTick(function() {

                        if (maintype) {
                            //媒介详细
                            var ms = $("#mescroll");
                            var imgWidth = $(window).width();
                            ms.find("ul").width(imgWidth * vm.list.length);
                            myScroll = new IScroll('#mescroll', scrollOption);
                            myScroll.on('scrollEnd', function() {
                                vm.imgIndex = myScroll.currentPage.pageX;
                            });
                            var img = new Image();
                            img.src = vm.list[0].pressArr.httpPostImg;
                            img.onload = function() {
                                    vm.imgIndex = 0;
                                }
                                // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, isPassive() ? {
                                //     capture: false,
                                //     passive: false
                                // } : false);

                        } else {
                            currProduct = $(".shareproduct").find("dd").eq(0);
                            $(".shareproduct").find("dd").height(winHeight);
                            $("body").swipe({
                                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

                                    if (direction == "down") {
                                        if (currProduct.prev().length > 0) {
                                            currProduct = currProduct.prev();
                                            gotoid(currProduct);
                                            $(".noticeup").fadeIn();
                                        }
                                    } else if (direction == "up") {
                                        if (currProduct.next().length > 0) {
                                            currProduct = currProduct.next();
                                            gotoid(currProduct);
                                            $(".noticeup").fadeIn();
                                        } else {
                                            gotoid(".btnfull");
                                        }
                                    }
                                }
                            });
                        }




                    })



                } else {
                    msg(data.data);
                }
            }
        })
    }

    function shareSendFn(shareid) {
        var name = localStorage.getItem("name") ? localStorage.getItem("name") : "未填写姓名";
        var sex = localStorage.getItem("sex");
        $.ajax({
            type: "POST",
            url: shareSend,
            data: {
                shareid: shareid,
                touser: name,
                sex: sex
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
 * 接口名称：获取分享历史详情
 * URL：/share_getHistoryDetail.html
 * 方式：POST
 * 参数：shareid 分享列表id
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		{"status":"200","data":数据}
 */

/**
 * 接口名称：分享成功回调接口（微信js分享接口成功时调用）
 * URL	/share_send.html
 * 方式	POST
 * 参数：shareid 分享列表id
 * 	touser 分享对象姓名
 * 	sex  1 男士 2女士
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		{"status":"200","data":"success"}
 */