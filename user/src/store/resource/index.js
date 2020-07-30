/**
 * @description Vuex（资源管理模块）
 */

// state
const state = {
    menuTabs: {} // tabs
};

// mutations
const mutations = {
    setMenuTabs(state, menuTabs) {
        state.menuTabs = menuTabs;
    }
};

module.exports = {
    namespaced: true,
    state,
    mutations
};