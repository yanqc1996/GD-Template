/**
 * @description 模块一路由配置
 */

const ModuleOne = () => import('@/views/moduleOne/ModuleOne');

module.exports = {
    path: 'moduleOne',
    component: ModuleOne
}