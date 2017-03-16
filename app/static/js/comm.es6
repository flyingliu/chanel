"use strict";

$(function() {

    var myScroll, aListScroll, myListScroll;

    var scrollOption = {
        scrollX: false,
        scrollY: true,
        preventDefault: false
    };
    // getList
    var domain = location.port == "8080" ? "//devch.minuteschina.com" : "";
    var postHeart = domain + '/post_heart.html';

    var getList = domain + '/post_getList.html';
    var getDetail = domain + '/post_getDetail.html';

    var postSend = domain + '/post_send.html';
    var sendComment = domain + '/post_sendComment.html';
    var delPost = domain + '/post_del.html';

    var getAcList = domain + '/announcement_getList.html';
    var getAcDetail = domain + '/announcement_getDetail.html';
    var sendReply = domain + '/announcement_sendReply.html';

    var getFaqList = domain + '/faq_getList.html';
    var getQuestion = domain + '/faq_getQuestion.html';
    var sendQuestion = domain + '/faq_sendQuestion.html';

    var aTmpPage = 1;
    var myTmpPage = 1;
    var mytab = localStorage.getItem("mytab") || 1;
    var localIds = '';
    var vm = new Vue({
        el: "#community",
        data: {
            aList: [],
            myList: [],
            acList: [],
            qaList: [],
            faqList: [],
            mytab: mytab,
            qaflag: false,
            question: '',
            acDetail: {},
            detail: {},
            reply: '',
            comment: '',
            loadFlag: false,
            detailFlag: false,
            faqFlag: false,
            model: {
                carId: '@carId',
                imageTitle: '',
                img64: ''
            },
            content: ''
        },
        methods: {
            closeLoad: function closeLoad() {
                this.loadFlag = false;
            },
            closePop: function closePop(name) {
                Vue.set(this.$data, name, false);
            },
            showPop: function showPop(name) {
                Vue.set(this.$data, name, true);
                if (name == "faqFlag") {
                    getQuestionFn();
                }
            },
            addClass: function addClass(e) {
                $(e.target).addClass("active");
            },
            tabs: function tabs(type) {
                this.mytab = type;
                localStorage.setItem("mytab", type);
                if (type == 1 && this.aList.length < 1) {
                    getListFn(1);
                }

                if (type == 2 && this.myList.length < 1) {
                    getListFn(2);
                }

                if (type == 3 && this.faqList.length < 1) {
                    getFaqListFn();
                }
                if (type == 4 && this.acList.length < 1) {
                    getAcListFn();
                }
            },
            showDetail: function showDetail(pid) {
                this.detailFlag = true;
                getDetailFn(pid);
            },
            sendCommentFn: function sendCommentFn(pid, list) {
                this.comment = $.trim(this.comment);
                if (this.comment.length > 0) {
                    _sendCommentFn(pid, this.comment, list);
                } else {
                    msg("评论不能为空");
                }
            },
            acinfo: function acinfo(id) {
                getAcDetailFn(id);
            },
            acinfoClose: function acinfoClose() {
                this.reply = '';
                this.acDetail = {};
            },
            sendReplyFn: function sendReplyFn() {
                this.reply = $.trim(this.reply);
                if (this.reply.length > 0) {
                    _sendReplyFn(this.acDetail.id, this.reply);
                } else {
                    msg("评论不能为空");
                }
            },
            addHeart: function addHeart(pid, item) {
                postHeartFn(pid, item);
            },
            sendQuestionFn: function sendQuestionFn(q) {
                this.question = $.trim(this.question);
                if (this.question.length > 0) {
                    _sendQuestionFn(this.question);
                } else {
                    msg("内容不能为空");
                }
            },
            showQuestionForm: function showQuestionForm() {
                this.qaflag = true;
            },
            uploadImg: function uploadImg() {
                var _this = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    success: function success(res) {
                        localIds = res.localIds;
                        var $img = $('<img>').attr("src", localIds);
                        $('#previewImg').empty().append($img);
                        _this.loadFlag = true;
                    }
                });
                //$("#fileImg").trigger("click");
            },
            fileImg: function fileImg() {
                this.imageHandle();
            },
            imageHandle: function imageHandle() {
                var _this = this;
                var fup = $("#fileImg")[0];
                var img = fup.files[0];
                var image = new Image();
                var canvas = $("#canvas")[0];
                var ctx = canvas.getContext('2d');
                image.onload = function() {
                    _this.loadFlag = true;
                    var w = image.naturalWidth,
                        h = image.naturalHeight;
                    var toSize = $(window).width();
                    canvas.width = toSize;
                    canvas.height = h * toSize / w;
                    var w2 = toSize,
                        h2 = h * toSize / w;
                    ctx.drawImage(image, 0, 0, w, h, 0, 0, w2, h2);
                };

                if (!img) {
                    return;
                }
                console.log(img);
                // if (!(img.type.indexOf('image') > -1)) {
                //     msg('图片只能是jpg,jpeg,gif,png,bmp');
                //     return;
                // }

                var reader = new FileReader();

                reader.onload = function(e) {
                    var url = reader.result;
                    image.src = url;
                };
                reader.readAsDataURL(img);
            },
            deleteFn: function(id, index) {
                deletePostFn(id, index);
            },
            postSendFn: function postSendFn() {
                /*var canvas = $("#canvas")[0];
                this.model.img64 = canvas.toDataURL("image/jpeg", 1);
                if (this.content.length > 1) {
                    _postSendFn(this.model.img64, this.content);
                }*/
                _postSendFn(localIds, this.content);
            }
        },

        mounted: function mounted() {
            var myScroll;
            // myScroll = new IScroll('#mescroll', scrollOption);
            this.tabs(mytab);
        }
    });

    function deletePostFn(id, index) {
        $.ajax({
            type: "POST",
            url: delPost,
            data: {
                id: id
            },
            success: function(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    //console.log(index);
                    vm.myList.splice(index, 1);
                    msg(data.data);
                }

            }
        })
    }

    function postHeartFn(id, item) {
        $.ajax({
            type: "POST",
            url: postHeart,
            data: {
                pid: id
            },
            success: function success(res) {
                var data = JSON.parse(res);
                console.log(data);
                if (data.status == 200) {
                    item.isActive = true;
                    item.heart++;
                    msg(data.data);
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function addEvent(dom) {
        dom.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, isPassive() ? {
            capture: false,
            passive: false
        } : false);
    }

    function getListFn(type) {
        $.ajax({
            type: "POST",
            url: getList,
            data: {
                type: type, // 1全部列表 2我的列表
                page: 1
            },
            success: function success(res) {
                // res = '{"status":200,"data":[{"id":"1","userid":"rogerzhao","content":"为让同学们更深刻地感受「两美浙江」，由中国美术学院党委宣传部主办，中国美术学院设计艺术学院承办，组织开展「五水共治」主题海报征集活动。","image_name":"","heart":"1","status":"1","create_time":"2017-03-08 17:12:03","delete_time":"0000-00-00 00:00:00","httpPostImg":"\/app\/static\/images\/comm.png","commentList":[{"id":"1","userid":"SimonDing","pid":"1","content":"12312313","create_time":"2017-03-08 18:24:11","userArr":false}],"userArr":{"userid":"rogerzhao","name":"\u8d75\u6587\u9f99","avatar":"http:\/\/shp.qpic.cn\/bizmp\/UFadNArWOKiaApIgnFEyr2HzkqxvtjXW1Mgdoib3VRwLOm3PEavr54XQ\/","usercode":"001"}}],"totalPage":1}'
                var data = JSON.parse(res);
                if (data.status == 200) {
                    if (type == 1) {
                        vm.aList = data.data;
                        aListScroll = new IScroll($('.aList')[0], scrollOption);
                        vm.$nextTick(function() {
                            $('.aList').find("img").on("load", function() {
                                aListScroll.refresh();
                            });
                            addEvent($('.aList')[0]);
                        });


                        if (data.totalPage > 1) {
                            aListScroll.on('scrollEnd', function() {
                                aTmpPage++;
                                if (aTmpPage > data.totalPage) {
                                    return false;
                                }
                                $.ajax({
                                    type: "POST",
                                    url: getList,
                                    data: {
                                        type: 1,
                                        page: aTmpPage
                                    },
                                    success: function(res) {
                                        var data = JSON.parse(res);
                                        if (data.status == 200) {
                                            for (var i = 0; i < data.data.length; i++) {
                                                vm.aList.push(data.data[i]);
                                            };
                                            vm.$nextTick(function() {
                                                $('.aList').find("img").on("load", function() {
                                                    aListScroll.refresh();
                                                });
                                            });
                                        }

                                    }
                                })
                            });
                        }


                    } else {
                        vm.myList = data.data;

                        myListScroll = new IScroll($('.myList')[0], scrollOption);
                        vm.$nextTick(function() {
                            $('.myList').find("img").on("load", function() {
                                myListScroll.refresh();
                            });
                            addEvent($('.myList')[0]);
                        });

                        if (data.totalPage > 1) {
                            myListScroll.on('scrollEnd', function() {
                                myTmpPage++;
                                if (myTmpPage > data.totalPage) {
                                    return false;
                                }
                                $.ajax({
                                    type: "POST",
                                    url: getList,
                                    data: {
                                        type: 2,
                                        page: myTmpPage
                                    },
                                    success: function(res) {
                                        var data = JSON.parse(res);
                                        if (data.status == 200) {
                                            for (var i = 0; i < data.data.length; i++) {
                                                vm.myList.push(data.data[i]);
                                            };
                                            vm.$nextTick(function() {
                                                $('.myList').find("img").on("load", function() {
                                                    myListScroll.refresh();
                                                });
                                            });
                                        }

                                    }
                                })
                            });
                        }
                    }
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function _sendCommentFn(pid, content, list) {
        $.ajax({
            type: "POST",
            url: sendComment,
            data: {
                pid: pid,
                content: content
            },
            success: function success(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.comment = '';
                    vm.detailFlag = false;
                    var cindex;
                    if (mytab == 1) {
                        for (var i = 0; i < vm.aList.length; i++) {
                            if (vm.aList[i].id == pid) {
                                vm.aList[i].commentList.unshift(data.returnArr);
                                break;
                            };
                        };
                    } else if (mytab == 2) {
                        for (var i = 0; i < vm.myList.length; i++) {
                            if (vm.myList[i].id == pid) {
                                vm.myList[i].commentList.unshift(data.returnArr);
                                break;
                            };
                        };
                    }

                    // list.unshift(data.returnArr);
                    msg(data.data);
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function _postSendFn(image, content) {
        wx.uploadImage({
            localId: image[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function success(res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                $.ajax({
                    type: "POST",
                    url: postSend,
                    data: {
                        image: serverId,
                        content: content
                    },
                    success: function success(res) {
                        var data = JSON.parse(res);
                        if (data.status == 200) {
                            vm.content = '';
                            vm.loadFlag = false;
                            document.location.reload();
                        } else {
                            msg(data.data);
                        }
                    }
                });
            }
        });
    }

    function getQuestionFn(type) {
        $.ajax({
            type: "POST",
            url: getQuestion,
            data: {},
            success: function success(res) {
                // res = '{"status":200,"data":[{"id":"1","userid":"rogerzhao","question":"1312312312312312312","create_time":"2017-03-10 21:21:35","delete_time":"0000-00-00 00:00:00"},{"id":"2","userid":"rogerzhao","question":"1312312312312312312","create_time":"2017-03-10 21:21:35","delete_time":"0000-00-00 00:00:00"}]}'
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.qaList = data.data;
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function getFaqListFn() {
        $.ajax({
            type: "POST",
            url: getFaqList,
            data: {},
            success: function success(res) {
                // res = '{"status":200,"data":[{"id":"1","question":"faq\u63d0\u95ee\u63d0\u95eefaq\u63d0\u95ee\u63d0\u95ee1","answer":"这是一个问题。就是不同的问题要好好解决。三大发生地方。三大发生的发生大发生的。","status":"1","rank":"2","create_time":"2017-03-10 17:15:03","update_time":"2017-03-10 17:17:29","delete_time":"2017-03-10 17:17:32"},{"id":"2","question":"faq\u63d0\u95ee\u63d0\u95eefaq\u63d0\u95ee\u63d0\u95ee1","answer":"faq\u56de\u7b54\u56de\u7b541","status":"1","rank":"2","create_time":"2017-03-10 17:15:03","update_time":"2017-03-10 17:17:29","delete_time":"2017-03-10 17:17:32"},{"id":"3","question":"faq\u63d0\u95ee\u63d0\u95eefaq\u63d0\u95ee\u63d0\u95ee1","answer":"faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543","status":"1","rank":"2","create_time":"2017-03-10 17:15:03","update_time":"2017-03-10 17:17:29","delete_time":"2017-03-10 17:17:32"}]}';
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.faqList = data.data;
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function getDetailFn(pid) {
        $.ajax({
            type: "POST",
            url: getDetail,
            data: { pid: pid },
            success: function success(res) {
                // res = '{"status":200,"data":[{"id":"1","question":"faq\u63d0\u95ee\u63d0\u95eefaq\u63d0\u95ee\u63d0\u95ee1","answer":"这是一个问题。就是不同的问题要好好解决。三大发生地方。三大发生的发生大发生的。","status":"1","rank":"2","create_time":"2017-03-10 17:15:03","update_time":"2017-03-10 17:17:29","delete_time":"2017-03-10 17:17:32"},{"id":"2","question":"faq\u63d0\u95ee\u63d0\u95eefaq\u63d0\u95ee\u63d0\u95ee1","answer":"faq\u56de\u7b54\u56de\u7b541","status":"1","rank":"2","create_time":"2017-03-10 17:15:03","update_time":"2017-03-10 17:17:29","delete_time":"2017-03-10 17:17:32"},{"id":"3","question":"faq\u63d0\u95ee\u63d0\u95eefaq\u63d0\u95ee\u63d0\u95ee1","answer":"faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543faq\u56de\u7b54\u56de\u7b543","status":"1","rank":"2","create_time":"2017-03-10 17:15:03","update_time":"2017-03-10 17:17:29","delete_time":"2017-03-10 17:17:32"}]}';
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.detail = data.data;
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function getAcListFn() {
        $.ajax({
            type: "POST",
            url: getAcList,
            data: {},
            success: function success(res) {
                // res = '{"status":200,"data":[{"id":"1","userid":"","content":"\u5206\u624b\u7684\u65b9\u5f0f\u5bf9\u65b9\u7684\u8bf4\u6cd5\u662f\u6c83\u5c14\u6587\u5cf0\u80a1\u4efd\u7684\u5e7f\u6cdb\u5927\u6982\u53cd\u5bf9\u611f\u8c46\u8150\u5e72\u6211\u800c\u4e3a1","pid":"0","rank":"5","status":"1","create_time":"2017-03-09 17:51:33","update_time":"2017-03-09 17:56:50","delete_time":"0000-00-00 00:00:00","replyNum":1,"replyList":[{"id":"2","userid":"rogerzhao","content":"fsdfsdfsfss","pid":"1","rank":"0","status":"1","create_time":"2017-03-10 14:48:02","update_time":"0000-00-00 00:00:00","delete_time":"2017-03-10 14:52:24","userArr":{"userid":"rogerzhao","name":"\u8d75\u6587\u9f99","avatar":"http:\/\/shp.qpic.cn\/bizmp\/UFadNArWOKiaApIgnFEyr2HzkqxvtjXW1Mgdoib3VRwLOm3PEavr54XQ\/","usercode":"001"}}]}],"totalPage":1}';
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.acList = data.data;
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function getAcDetailFn(aid) {
        $.ajax({
            type: "POST",
            url: getAcDetail,
            data: {
                aid: aid
            },
            success: function success(res) {
                // res = '{"status":200,"data":[{"id":"1","userid":"","content":"\u5206\u624b\u7684\u65b9\u5f0f\u5bf9\u65b9\u7684\u8bf4\u6cd5\u662f\u6c83\u5c14\u6587\u5cf0\u80a1\u4efd\u7684\u5e7f\u6cdb\u5927\u6982\u53cd\u5bf9\u611f\u8c46\u8150\u5e72\u6211\u800c\u4e3a1","pid":"0","rank":"5","status":"1","create_time":"2017-03-09 17:51:33","update_time":"2017-03-09 17:56:50","delete_time":"0000-00-00 00:00:00","replyNum":1,"replyList":[{"id":"2","userid":"rogerzhao","content":"fsdfsdfsfss","pid":"1","rank":"0","status":"1","create_time":"2017-03-10 14:48:02","update_time":"0000-00-00 00:00:00","delete_time":"2017-03-10 14:52:24","userArr":{"userid":"rogerzhao","name":"\u8d75\u6587\u9f99","avatar":"http:\/\/shp.qpic.cn\/bizmp\/UFadNArWOKiaApIgnFEyr2HzkqxvtjXW1Mgdoib3VRwLOm3PEavr54XQ\/","usercode":"001"}}]}],"totalPage":1}';
                var data = JSON.parse(res);
                if (data.status == 200) {
                    vm.acDetail = data.data;
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function _sendReplyFn(aid, content) {
        $.ajax({
            type: "POST",
            url: sendReply,
            data: {
                aid: aid,
                content: content
            },
            success: function success(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    var acLength = vm.acList.length;
                    for (var i = 0; i < acLength; i++) {
                        if (vm.acList[i].id == aid) {
                            vm.acList[i].replyList.unshift(data.returnArr);
                            break;
                        }
                    }
                    vm.reply = '';
                    vm.acDetail = {};
                } else {
                    msg(data.data);
                }
            }
        });
    }

    function _sendQuestionFn(question) {
        $.ajax({
            type: "POST",
            url: sendQuestion,
            data: {
                question: question
            },
            success: function success(res) {
                var data = JSON.parse(res);
                if (data.status == 200) {
                    var item = {
                        question: question
                    };
                    vm.qaList.unshift(item);
                    vm.qaflag = false;
                    vm.question = '';
                    msg(data.data);
                } else {
                    msg(data.data);
                }
            }
        });
    }
});

/**
 * 接口名称：公告点赞
 * URL：	/post_heart.html
 * 方式：	POST
 * 参数：pid 信息id
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		403:已经点赞过了
 * 		{"status":"200","data":"success"}
 */
/**
 * 接口名称：获取全部公告列表
 * URL：	/post_getList.html
 * 方式：	POST
 * 参数：page 页数
 *      type 默认为1  1全部列表 2我的列表
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":列表,"totalPage":总页数}
 */

/**
 * 接口名称：公告评论详情
 * URL：	/post_getDetail.html
 * 方式：	POST
 * 参数：pid 公告id
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		{"status":"200","data":"success"}
 */
/**
 * 接口名称：公告表单提交
 * URL：	/post_send.html
 * 方式：	POST
 * 参数：image    图片数据 64base格式
 * 		content  内容
 * 返回：200:成功
 * 		401:图片参数错误
 * 		402:授权错误
 *      403:图片格式错误
 *      404:数据操作错误
 *       {"status":"200","data":"success"}
 */
/**
 * 接口名称：公告评论提交
 * URL：	/post_sendComment.html
 * 方式：	POST
 * 参数：pid    	信息id
 * 		content  评论内容
 * 返回：200:成功
 * 		401:参数错误
 * 		402:授权错误
 *      404:数据操作错误
 *       {"status":"200","data":"success"}
 */

/**
 * 接口名称：获取全部faq列表
 * URL：	/faq_getList.html
 * 方式：	POST
 * 参数：
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":列表}
 */

/**
 * 接口名称：获取当前用户提问列表
 * URL：	/faq_getQuestion.html
 * 方式：	POST
 * 参数：
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":列表}
 */

/**
 * 接口名称：提交问题
 * URL：	/faq_sendQuestion.html
 * 方式：	POST
 * 参数：question  问题内容
 * 返回：200:成功
 * 		401:参数错误
 * 		402:授权错误
 *      404:数据操作错误
 *       {"status":"200","data":"success"}
 */

// ----------
/**
 * 接口名称：获取全部公告版列表
 * URL：	/announcement_getList.html
 * 方式：	POST
 * 参数：page 页数
 *  返回 200:成功
 * 		401:未知错误
 * 		402:授权错误
 * 		{"status":"200","data":列表,"totalPage":总页数}
 */

/**
 * 接口名称：获取单条公告版详情
 * URL：	/announcement_getDetail.html
 * 方式：	POST
 * 参数：aid  公告id
 *  返回 200:成功
 * 		401:参数缺失
 * 		402:授权错误
 * 		{"status":"200","data":列表,"totalPage":总页数}
 */

/**
 * 接口名称：公告板回复提交
 * URL：	/announcement_sendReply.html
 * 方式：	POST
 * 参数：aid    	公告id
 * 		content  评论内容
 * 返回：200:成功
 * 		401:参数错误
 * 		402:授权错误
 *      404:数据操作错误
 *       {"status":"200","data":"success"}
 */