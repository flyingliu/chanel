$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/share_getList.html';
    var addShare = domain + '/share_add.html';
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
                localStorage.setItem("name", this.toUser.name);
                localStorage.setItem("sex", this.toUser.sex);
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