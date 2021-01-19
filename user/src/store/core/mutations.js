/**
 * @description 集中状态管理vuex中的mutations
 * @author dunfee
 * @date 2019/7/9
 */

module.exports = {
  setTest(state, value) {
    state.test = value;
    sessionStorage.setItem("test", value);
  },
};
