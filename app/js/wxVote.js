// setTimeout(function(){
//   getFree();  
// },5000)
// getFree();

wx.config({
    debug: false, // 开启调试模式。
    appId: ENV.appId, // 必填，公众号的唯一标识
    timestamp: ENV.timestamp, // 必填，生成签名的时间戳
    nonceStr: ENV.nonceStr, // 必填，生成签名的随机串
    signature: ENV.signature, // 必填，签名，见附录1
    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function() {
    wx.onMenuShareTimeline({
        title: ENV.shareTitle, // 分享标题
        link: ENV.lineLink, // 分享链接
        imgUrl: ENV.imgUrl, // 分享图标
        success: function() {getFree();},
        cancel: function() {getFree();}
    });

    wx.onMenuShareAppMessage({
        title: ENV.shareTitle, // 分享标题
        desc: ENV.descContent, // 分享描述
        link: ENV.lineLink, // 分享链接
        imgUrl: ENV.imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {getFree();},
        cancel: function() {getFree();}
    });
});
