/**
 * @description 登录登出模块，接口api配置
 */

import BaseApi from "../base"; // 引入基础api

class LoginApi extends BaseApi {
    constructor() {
        super();

        this.loginUrl = `/login`; // 登录接口的url
        this.logoutUrl = `/logout`; // 登出（退出登录）接口的url
    }

    login(formData) {
        // 登录
        let _url = `${this.prefix}${this.loginUrl}`;
        return this.post(_url, formData, {
            successText: "登录成功！"
        });
    }

    logout(successText = "退出登录成功！") {
        // 登出（退出登录）
        let _url = `${this.prefix}${this.logoutUrl}`;
        return this.post(_url, {}, {
            successText
        });
    }
}

export default new LoginApi();