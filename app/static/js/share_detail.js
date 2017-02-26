$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/share_getList.html';
    var addShare = domain + '/share_add.html';
    var shareSend = domain + '/share_send.html';
    var tmpPage = 1;
    var myScroll;
    var pid = getQueryString("pid");

    var vm = new Vue({
        el: "#sharedetail",
        data: {
            list: {},
            curr: {},
            mydefault: {},
            toUser: {
                name: '',
                sex: ''
            },
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
                this.isNotice = false;

            },
            showform: function(flag) {
                console.log(flag);
                this.isShowForm = flag;
            },
            saveLocal: function() {
                this.isShowForm = false;
                if (this.toUser.name) {
                    localStorage.setItem("name", this.toUser.name);
                }
                shareSendFn(2);


            },
            selectMale: function() {
                var _this = this;
                //询问框
                layer.open({
                    className: "layerbtn",
                    content: '选择性别',
                    btn: ['女士', '男士'],
                    no: function(index) {
                        localStorage.setItem("sex", 1);
                        _this.toUser.sex = "男士";
                    },
                    yes: function(index) {
                        localStorage.setItem("sex", 2);
                        _this.toUser.sex = "女士";
                        layer.close(index);
                    }
                });
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
                console.log(data);
                if (data.status == 200) {
                    vm.list = data.data;

                } else {
                    msg(data.data);
                }
            }
        })
    }

    function shareSendFn(shareid) {
        var name = localStorage.getItem("name") ? localStorage.getItem("name") : "未填写姓名";
        var sex = localStorage.getItem("sex") == "1" ? "男士" : "女士";
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