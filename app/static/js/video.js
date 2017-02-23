$(function() {




    var vm = new Vue({
        el: "#video",
        data: {
            video: {
                src: "http://www.w3school.com.cn/i/movie.ogg",
                poster: "app/static/images/t1.jpg"
            },
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

        }
    });




})