/**
 * @description 集中状态管理vuex中的mutations
 * @author amao
 * @date 2021/1/11
 */

module.exports = {
    setTest(state, value) {
        state.test = value;
        sessionStorage.setItem("test", value);
    }
};