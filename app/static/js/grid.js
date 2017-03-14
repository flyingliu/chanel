var vueImg = new Vue({
    el: "#divCarImages",
    data: {
        model: {
            carId: '@carId',
            imageTitle: '',
            img64: ''
        },
        images: []
    },
    methods: {
        imageHandle: function() {
            var fup = $("#fileImg")[0];

            var img = fup.files[0];

            var image = new Image();
            var canvas = $("#canvas")[0];
            var ctx = canvas.getContext('2d');

            image.onload = function() {
                var w = image.naturalWidth,
                    h = image.naturalHeight;

                var toSize = 400;
                canvas.width = toSize;
                canvas.height = toSize;

                var w2 = toSize,
                    h2 = toSize;
                if (w > h) {
                    h2 = h / w * toSize;
                } else {
                    w2 = w / h * toSize;
                }

                ctx.drawImage(image, 0, 0, w, h, 0, 0, w2, h2);

            }

            if (!img) {
                return;
            }

            // 判断图片格式
            if (!(img.type.indexOf('image') == 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))) {
                msg('图片只能是jpg,gif,png');
                return;
            }

            var reader = new FileReader();

            reader.onload = function(e) { // reader onload start
                    var url = reader.result;
                    image.src = url;

                } // reader onload end

            reader.readAsDataURL(img);
        }

    }
});

function uploadImg() {
    var canvas = $("#canvas")[0];
    vueImg.model.img64 = canvas.toDataURL("image/jpeg", 0.1);
    //$("#testMsg").html(imgData.length);
}