$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/share_getList.html';
    var addShare = domain + '/share_add.html';
    var shareSend = domain + '/share_send.html';
    var tmpPage = 1;
    var myScroll;
    var pid = getQueryString("pid");
    var shareid = getQueryString("id");
    var type = getQueryString("type");
    var winHeight = $(window).height();
    var currProduct, isEnd;


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
            currIndex: 0,
            isError: false,
            isShowForm: false,
            isNotice: true
        },


        methods: {
            addbuy: function() {
                addShareFn(pid, this.curr.cid, 1);
            },
            hideNotice: function() {
                // this.isNotice = false;

            },
            showform: function(flag) {
                console.log(flag);
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
        mounted: function() {
            var _this = this;
            getListFn(1, shareid);

            this.$nextTick(function() {

            })
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
                var data = JSON.parse(res);
                console.log(data);
                if (data.status == 200) {
                    vm.list = data.data;
                    if (vm.list.length < 2) {
                        $(".noticeup").hide();

                    }
                    vm.$nextTick(function() {

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