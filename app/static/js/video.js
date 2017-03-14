$(function() {

    // const Home = {

    //     template: '#home-template',
    //     data() {
    //         return {
    //             msg: [1, 3, 3]
    //         }
    //     },
    //     methods: {
    //         msgFn: function() {
    //             console.log("click");
    //         }
    //     },
    //     beforeRouteEnter(to, from, next) {
    //         next(vm => {
    //             // getListFn(1, vm)
    //             // 通过 `vm` 访问组件实例
    //         })
    //     }
    // }
    // const Bar = { template: '<div>bar</div>' }
    // const routes = [{
    //         path: '/',
    //         component: Home
    //     },
    //     {
    //         path: '/bar',
    //         component: Bar,
    //         // beforeEnter: (to, from, next) => {
    //         //     console.log("/bar");
    //         // }
    //     }
    // ]

    // const router = new VueRouter({


    //     routes: routes

    // })

    // const app = new Vue({
    //     router: router
    // }).$mount('#community')

    // router.beforeEach((to, from, next) => {
    //     // console.log(next);
    // })


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