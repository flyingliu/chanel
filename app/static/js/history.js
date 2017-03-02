$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/share_getHistory.html';
    var tmpPage = 1;
    var myScroll;
    var pid = getQueryString("pid");

    var vm = new Vue({
        el: "#history",
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
            getListFn(1);
            this.$nextTick(function() {

            })
        }
    });


    function getListFn(type) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                type: type
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.list = data.data;
                } else {
                    console.log(data.status);
                }
            }
        })
    }



})

/**
 * 接口名称：获取分享历史
 * URL：/share_getHistory.html
 * 方式：POST
 * 参数：type 1.产品 2.媒介
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		{"status":"200","data":数据}
 */