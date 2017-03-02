$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/training_getList.html';
    var tmpPage = 1;
    var myScroll;

    var vm = new Vue({
        el: "#presslist",
        data: {
            list: [],
            mytab: 1
        },
        methods: {
            tabs: function(type) {},
            closeFilter: function() {}
        },
        mounted: function() {
            this.$nextTick(function() {
                $('#gul').wookmark({
                    align: 'center',
                    autoResize: true,
                    fillEmptySpace: true,
                    flexibleWidth: 0,
                    offset: 10
                });
            })
        }
    });

    var dm = new Vue({
        el: "#pressdetail",
        data: {
            addbuy: function() {}
        },
        methods: {
            tabs: function(type) {},
            addbuy: function() {}
        },
        mounted: function() {
            this.$nextTick(function() {
                $('#gul').wookmark({
                    align: 'center',
                    autoResize: true,
                    fillEmptySpace: true,
                    flexibleWidth: 0,
                    offset: 10
                });
            })
        }
    });

    function getListFn(type) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                page: tmpPage,
                type: type
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {


                } else {
                    alert(data.status);
                }
            }
        })
    }



})

/**
 * 接口名称：获取列表
 * URL：	/training_getList.html
 * 方式：	POST
 * 参数：page 页数
 *      type 1.最新 2.主题 3.tips
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":列表,"totalPage":总页数}
 */