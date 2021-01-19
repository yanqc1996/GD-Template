import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
// import store from './store/index';

// js
// 引入二次封装后的axios
import { axios } from "./utils/api";

// css
import "./assets/css/common.css";
import "./assets/css/base.css";
import App from "./App";
import store from "./store";

Vue.use(ElementUI);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  store,

  // store,
  render: (h) => h(App),
}).$mount("#app");
