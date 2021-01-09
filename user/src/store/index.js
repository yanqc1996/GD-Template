import Vue from 'vue';
import Vuex from 'vuex';

const state = require('./core/state');
const getters = require('./core/getters');
const actions= require('./core/actions');
const mutations = require('./core/mutations');

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});