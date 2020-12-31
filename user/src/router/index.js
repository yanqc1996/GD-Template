import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../pages/Index.vue";
import Test1 from "../components/three/Test1.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    redirect: "/test1",
    component: Index,
    children: [
      {
        path: "test1",
        component: Test1,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
