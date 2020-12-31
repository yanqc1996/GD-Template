/**
 * @description Vuex（dropdown模块）
 */
const DropdownApi = require("@/http/dropdown");
// state
const state = {
    data: {} // dropdown非级联的数据
};

const mutations = {
    setDropdownData(state, data) {
        state.data = data;
    }
}

const actions = {
    getDropdownData({
        commit
    }) {
        // 获取dropdown非级联的数据
        DropdownApi.default.page().then(res => {
            if (res.retCode === 200) {
                commit("setDropdownData", res.data || {});
            }
        });
    }
}

module.exports = {
    namespaced: true,
    state,
    mutations,
    actions
};