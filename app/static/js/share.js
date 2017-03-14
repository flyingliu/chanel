$(function() {

    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com" : "";
    var getList = domain + '/share_getList.html';
    var deleteShare = domain + '/share_del.html';
    var tmpPage = 1;
    var myScroll;
    var pid = getQueryString("pid");
    var wookOptions = {
        align: 'left',
        autoResize: true,
        container: $('#gul'),
        offset: 10
    };

    var vm = new Vue({
        el: "#share",
        data: {
            list: {},
            curr: {},
            mytab: 1,
            shareId: '',
            isEdit: false,
            press: []
        },
        methods: {
            addbuy: function() {
                addShareFn(pid, this.curr.cid, 1);
            },
            hideNotice: function() {
                this.isNotice = false;

            },
            editFn: function(flag) {
                this.isEdit = flag;
            },
            deleteFn: function(pid, colorid, type, index) {
                deleteShareFn(pid, colorid, type, index);
            },
            tabs: function(index) {
                this.mytab = index;
                this.isEdit = false;
                getListFn(this.mytab);
            },
            changtype: function(index) {
                this.currIndex = index;
                this.isError = false;
                this.curr = this.list.colorList[index];
                if (!this.curr.colorImg) {
                    this.isError = true;
                    // this.curr.colorImg = this.default.colorImg;
                }

            }
        },
        mounted: function() {
            var _this = this;
            getListFn(1);
        }
    });

    function deleteShareFn(pid, colorid, type, index) {
        $.ajax({
            type: "POST",
            url: deleteShare,
            data: {
                pid: pid,
                colorid: colorid,
                type: type
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    console.log(index);
                    if (vm.mytab == 1) {
                        vm.list.splice(index, 1);
                    } else {
                        vm.press.splice(index, 1);
                    }
                }
                msg(data.data);

            }
        })
    }

    function getListFn(type) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                type: type
            },
            success: function(res) {
                var data = JSON.parse(res);
                console.log(data);
                if (data.status == 200) {
                    if (vm.mytab == 1) {
                        vm.list = [];
                        vm.list = data.data;
                        for (var i = 0; i < vm.list.length; i++) {
                            if (vm.list[i].shareid > 0) {
                                vm.shareId = vm.list[i].shareid;
                                return;
                            }
                        };
                    } else {
                        vm.press = [];
                        vm.press = data.data;
                        vm.$nextTick(function() {
                            var imgs = [];

                            var imgsLength = vm.press.length
                            for (var i = 0; i < imgsLength; i++) {
                                var img = new Image();
                                vm.shareId = vm.press[i].shareid;
                                img.src = vm.press[i].pressArr.httpPostImg;
                                img.onload = function() {
                                    imgsLength--;
                                    if (imgsLength < 1) {
                                        $('#gul').wookmark(wookOptions);
                                        $('#gul').trigger('refreshWookmark');
                                    }
                                }
                            }
                        })
                    }
                } else {
                    msg(data.data);
                }
            }
        })
    }


})

/**
 * 接口名称：从分享列表删除
 * URL：/share_del.html
 * 方式：POST
 * 参数：pid 产品或媒介id
 *	colorid 如果type=1 colorid必填
 *      type 1产品 2媒介
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		403:颜色缺失
 * 		404:分享列表为空
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