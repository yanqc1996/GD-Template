/**
 * @description 下拉选项模块，接口api配置
 */

import BaseApi from "../base"; // 引入基础api

class DropdownApi extends BaseApi {
    constructor() {
        super();

        this.baseUrl = `/dropdown`; // 获取非级联的下拉选项的url
        
        this.dynamicFormColumnsUrl = `${this.baseUrl}/component`; // 获取动态表单字段（包含控件）配置的url
        this.groupOptionsUrl = `${this.baseUrl}/group`; // 获取行政组下拉选项的url
        this.userOptionsUrl = `${this.baseUrl}/user`; // 获取用户下拉选项的url
    }

    getDynamicFormColumns(params) {
        // 获取动态表单字段（包含控件）配置
        let _url = `${this.prefix}${this.dynamicFormColumnsUrl}`;
        return this.get(_url, params);
    }

    getGroupOptions(id) {
        // 获取行政组下拉选项
        let _url = `${this.prefix}${this.groupOptionsUrl}/${id}`;
        return this.get(_url);
    }

    getUserOptions(deptId, groupId, roleIds) {
        // 获取用户下拉选项
        let _url = `${this.prefix}${this.userOptionsUrl}`;
        return this.get(_url, {
            deptId, // 部室id
            groupId, // 行政组id
            roleIds // 角色ids
        });
    }
}

export default new DropdownApi();