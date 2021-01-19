import Vue from "vue";
import Router from "vue-router";
import moduleOne from "./lib/moduleOne";
// 登录页
const Login = () => import("@/views/Login");
// 主页
const Main = () => import("@/views/Main");
//注册
const Register = () => import("@/views/Register");
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    component: Main,
    children: moduleOne,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

// 创建router对象
const router = new Router({
  routes,
});

// 全局前置守卫，用于权限拦截
// router.beforeEach((to, from, next) => {
//     let accessPathName = ["login", "register"]; // 不需要登陆就可以直接访问
//     if (sessionStorage.getItem('token')) {
//         // 如果已登陆，即可放行
//         next();
//     } else if (accessPathName.indexOf(to.name) > -1) {
//         /**
//          * 此时是没有登陆的情况，
//          * 如果访问是不需要登陆就可访问的，直接放行
//          */
//         next();
//     } else {
//         /**
//          * 此时是在没有登陆情况下，访问需要登陆之后才能访问的内容，
//          * 前往登陆
//          */
//         next("/login");
//     }
// })

export default router;
