$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/product_getDetail.html';
    var addShare = domain + '/share_add.html';
    var tmpPage = 1;
    var myScroll;
    var pid = getQueryString("pid");

    var vm = new Vue({
        el: "#offer",
        data: {
            list: {},
            curr: {},
            mydefault: {},
            currIndex: 0,
            isError: false,
            isNotice: true
        },
        methods: {
            addbuy: function() {
                addShareFn(pid, this.curr.cid, 1);
            },
            hideNotice: function() {
                this.isNotice = false;

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
            getListFn(pid);
            this.$nextTick(function() {

            })
        }
    });

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
                    alert("添加成功");
                } else {
                    alert(data.data);
                }
            }
        })
    }

    function getListFn(pid) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                pid: pid
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.list = data.data;
                    vm.curr = vm.list.colorList[0];
                    if (!vm.curr.colorImg) {
                        vm.isError = true;
                    }
                    var product = data.data.colorList;
                    for (var i = 0; i < product.length; i++) {
                        if (product[i].isdefault > 0) {
                            vm.mydefault = product[i];
                        }
                    }

                } else {
                    console.log(data.status);
                }
            }
        })
    }



})

/**
 * 接口名称：获取产品详情
 * URL：	/product_getDetail.html
 * 方式：	POST
 * 参数：pid 产品id
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":数据}
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