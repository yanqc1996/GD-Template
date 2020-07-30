// 集中状态管理Vuex
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const common = require("./common"); // common模块
const authenticate = require("./authenticate"); // authenticate认证模块
const dropdown = require("./dropdown"); // dropdown模块
const resource = require("./resource"); // resource模块

export default new Vuex.Store({
    ...common,
    modules: {
        authenticate,
        dropdown,
        resource
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(obj) {
            return {
                authenticate: obj.authenticate,
                dropdown: obj.dropdown,
                resource: obj.resource
            }
        }
    })]
});