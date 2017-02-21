$(function() {


    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com/" : "";
    var getList = domain + '/product_getListBySeason.html';
    var tmpPage = 1;
    var myScroll;

    var vm = new Vue({
        el: "#product",
        data: {
            list: [],
            isnodata: true
        },
        methods: {
            showfilter: function() {
                $(".filter").show();
            },
            getfilter: function(type, size) {
                console.log(type);
                getListFn(type, size)
                $(".filter").hide();
            },
            activeitem: function(e) {
                var dom = $(e.target);
                dom.parent().addClass("active").siblings().removeClass("active");
            }
        },
        mounted: function() {
            getListFn();
            this.$nextTick(function() {
                // myScroll = new IScroll($(".train")[0], { mouseWheel: true, scrollbars: false, click: true, interactiveScrollbars: true });
                // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
            })
        }
    });

    function getListFn(type, size) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                page: tmpPage,
                type: type,
                size: size
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.list = data.data;
                    vm.isnodata = true;
                    for (var i = 0; i < vm.list.length; i++) {
                        if (vm.list[i].productList.length > 0) {
                            vm.isnodata = false;
                            return;
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
	 * 接口名称：获取列表（按系列分）
	 * URL：	/product_getListBySeason.html
	 * 方式：	POST
	 * 参数：page 页数
			type 1.hobo 2.backpack 3.shopping 4.purse
			size 1.小 2.中 3.大
	 *  返回 200:成功
	 * 		401:未知错误
	 * 		402:授权错误
	 * 		{"status":"200","data":列表,"totalPage":总页数}
	 */