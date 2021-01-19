/**
 * @description 模块一路由配置
 */

const ModuleTwo = () => import("@/views/moduleTwo/ModuleTwo");

module.exports = {
  path: "moduleTwo",
  component: ModuleTwo,
};
