$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/product_getDetail.html';
    var tmpPage = 1;
    var myScroll;

    var vm = new Vue({
        el: "#offer",
        data: {
            list: {},
            curr: {}
        },
        methods: {
            addbuy: function() {
                console.log("buy");
            },
            changtype: function(type) {
                console.log(type);
            }
        },
        mounted: function() {
            getListFn(8);
            this.$nextTick(function() {})
        }
    });

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