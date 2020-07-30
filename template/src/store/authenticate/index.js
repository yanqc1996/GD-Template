// Vuex（authenticate认证模块）
// state
const state = {
    userName: "", // 用户名（当前登录用户）
    realName: "", // 用户真实姓名
    userImg: "", // 用户头像（当前登录用户）
    token: "", // 令牌
    menus: [], // 可访问的菜单项
    menuUrls: [] // 可访问的菜单项的menuUrl
};

// getters
const getters = {
    getTokenObject: state => {
        return {
            userName: state.userName,
            realName: state.realName,
            userImg: state.userImg,
            token: state.token
        };
    }, // 获取令牌对象（包含userName、realName、userImg、departmentId几个属性）
    getMenus: state => (menuPath, menuType) => {
        let toString = Object.prototype.toString;

        function isUndefined(val) {
            return toString.call(val) === "[object Undefined]";
        }

        if (isUndefined(menuPath)) {
            return state.menus;
        }

        let menu = (function recursionFn(arr) {
            let result = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                let item = arr[i];
                if (item.menuUrl === menuPath) {
                    result = item;
                    break;
                } else if (Array.isArray(item.children && item.children.length > 0)) {
                    result = recursionFn(item.children);
                }
            }
            return result;
        })(state.menus);

        if (isUndefined(menuType)) {
            return [menu];
        } else {
            return menu.children.filter(item => {
                item.type === menuType
            });
        }
    }
};

// mutations
const mutations = {
    setTokenObject(state, tokenObject) {
        /**
         * @description 设置令牌对象
         * @param {object} state 当前模块（authenticate认证模块）的状态state
         * @param {object} tokenObject 令牌对象
         * tokenObject.userName 用户名
         * tokenObject.realName 用户真实姓名
         * tokenObject.userImg 用户头像
         * tokenObject.token 令牌
         * tokenObject.menus 可访问的菜单项
         */
        let menuUrls = [];
        (function recursionFn(arr) {
            for (let i = 0, len = arr.length; i < len; i++) {
                let item = arr[i];
                if (Array.isArray(item.children)) {
                    recursionFn(item.children);
                }
                if (item.menuUrl) {
                    menuUrls.push(item.menuUrl);
                }
            }
        })(tokenObject.menus || []);

        state.userName = tokenObject.userName;
        state.realName = tokenObject.realName;
        state.userImg = tokenObject.userImg;
        state.token = tokenObject.token;
        state.menus = tokenObject.menus;
        state.menuUrls = menuUrls;
    }
};

module.exports = {
    namespaced: true,
    state,
    getters,
    mutations
};