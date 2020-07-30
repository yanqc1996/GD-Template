// Vuex（common模块）
// state
const state = {
    size: "default"
};

// mutations
const mutations = {
    changeSize(state, size) {
        state.size = size;
    }
};

module.exports = {
    namespaced: true,
    state,
    mutations
};