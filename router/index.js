
// 1. 使用extend扩展vue后，创建vue实例
var Head = Vue.extend({
    template: '<div class="row">' +
        '<div class="page-header" >' +
        '<h2>Router Basic - 01</h2>' +
        '</div>' +
        '</div>',
});

var Home = Vue.extend({
    template: "<div><h1>{{this.$route.params.page}}</h1><p>{{msg}}</p></div>",
    data: function() {
        return {
            msg: "Hello, vue router!"
        }
    }
});

var About = Vue.extend({
    template: "<div><h1>{{this.$route.params.about}}</h1><p>This is the tutorial about vue-router.</p></div>"
});

var Study = Vue.extend({
    template: "<div><h1>{{this.$route.params.class}}</h1><p>This is the tutorial about math.</p></div>"
});

// 2. 定义路由
var routes = [
    { path: "/", redirect: "/home"},
    { path: "/:page", component: Home},
    { path: "/home/:about", component: About},
    { name: "study", path: "/study/math/", component: Study}
];

// 3. 创建路由
var router = new VueRouter({
    routes: routes
});

// 5. 使用<router-view>

// 6. 启动路由
new Head().$mount("#head");

var App = new Vue({
    router: router
}).$mount("#app");