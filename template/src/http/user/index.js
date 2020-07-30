/**
 * @description 用户管理模块，接口api配置
 */

import BaseApi from "../base"; // 引入基础api

class UserMgtApi extends BaseApi {
    constructor() {
        super();
        this.baseUrl = `/user`; // 基础url
        this.modifyPasswordUrl = `${this.baseUrl}/modifyPassword`; // 修改密码的url
    }

    modifyPassword(formData) {
        // 修改密码
        let _url = `${this.prefix}${this.modifyPasswordUrl}`;
        return this.put(_url, formData);
    }
}

export default new UserMgtApi();