/**
 * @description 模块一路由配置
 */

const ScrollTimer = () => import("@/views/chj/ScrollTimer");
const LiveSpike = () => import("@/views/chj/LiveSpike");
module.exports = [
  {
    path: "test1",
    component: ScrollTimer,
  },
  {
    path: "test2",
    component: LiveSpike,
  },
];
