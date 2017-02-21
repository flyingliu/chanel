$(function() {

    var Watermark = function(container, options) {
        var self = this;
        self.opt = {
            docWidth: $(document).width(),
            docHeight: $(document).height(),
            fontStyle: "24px 黑体", //水印字体设置
            rotateAngle: -20 * Math.PI / 180, //水印字体倾斜角度设置
            fontColor: "rgba(0, 0, 0, .1)", //水印字体颜色设置
            firstLinePositionX: 100, //canvas第一行文字起始X坐标
            firstLinePositionY: 150
        };
        $.extend(self.opt, options);
        self.render(container);
        self.draw(self.opt.docWidth, self.opt.docHeight);
        self.events();
    };

    Watermark.prototype = {
        render: function(d) {
            var self = this;
            d.append(tpl);
        },

        draw: function(docWidth, docHeight) {
            var self = this;
            var cw = $('#watermark')[0];
            var crw = $('#repeat-watermark')[0];

            crw.width = docWidth;
            crw.height = docHeight;

            var ctx = cw.getContext("2d");
            //清除小画布
            ctx.clearRect(0, 0, 160, 100);
            ctx.font = self.opt.fontStyle;
            //文字倾斜角度
            ctx.rotate(self.opt.rotateAngle);

            ctx.fillStyle = self.opt.fontColor;
            //第一行文字
            ctx.fillText(self.opt.watermark, self.opt.firstLinePositionX, self.opt.firstLinePositionY);
            //第二行文字 
            //ctx.fillText(window.watermark.mobile, self.opt.SecondLinePositionX, self.opt.SecondLinePositionY);
            //坐标系还原
            ctx.rotate(-self.opt.rotateAngle);

            var ctxr = crw.getContext("2d");
            //清除整个画布
            ctxr.clearRect(0, 0, crw.width, crw.height);
            //平铺--重复小块的canvas
            var pat = ctxr.createPattern(cw, "repeat");
            ctxr.fillStyle = pat;

            ctxr.fillRect(0, 0, crw.width, crw.height);
        },
        events: function() {
            var self = this;
            $(window).resize(function() {
                var w = $(document).width();
                var h = $(document).height();
                self.draw(w, h);
            });
        }

    };


    var tpl = '<canvas id = "watermark" width = "375px"  height = "200px" style="display:none;"></canvas>' + '<canvas id = "repeat-watermark"></canvas>';
    if (mymark) {
        var firstx = 150 - mymark.length * 7.5;
        new Watermark($("body"), { watermark: mymark, firstLinePositionX: firstx });

    }


})