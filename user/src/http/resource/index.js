/**
 * @description 资源管理模块 接口api配置
 */
import BaseApi from "../base"; // 引入基础api

class ResourceMgtApi extends BaseApi {
    constructor() {
        super();
        this.baseUrl = `/resource`; // 基础url

        this.pageUrl = `${this.baseUrl}/data`; // page查询的url
        this.columnOptionsUrl = `${this.baseUrl}/header`; // 获取表格可显示的字段选项的url
        this.columnsUrl = `${this.columnOptionsUrl}/user`; // 表格当前需要显示的字段的url
        this.visitHistoryUrl = `${this.baseUrl}/history`; // 获取访问历史的url
        this.exportUrl = `${this.baseUrl}/export`; // 导出的url
    }

    page(params) {
        // page查询
        let _url = `${this.prefix}${this.pageUrl}/${params.menuId}`;
        return this.post(_url, params);
    }

    getColumnOptions(_params) {
        // 获取表格可显示的字段选项
        let _url = `${this.prefix}${this.columnOptionsUrl}`;
        return this.get(_url, _params);
    }

    getColumns(_params) {
        // 获取表格当前需要显示的字段
        let _url = `${this.prefix}${this.columnsUrl}`;
        return this.get(_url, _params);
    }

    setColumns(data) {
        // 设置表格当前需要显示的字段
        let _url = `${this.prefix}${this.columnsUrl}`;
        return this.put(_url, data);
    }

    getVisitHistory() {
        // 获取访问历史
        let _url = `${this.prefix}${this.visitHistoryUrl}`;
        return this.get(_url);
    }

    export (params) {
        // 导出
        let _url = `${this.prefix}${this.exportUrl}`;
        this.download(_url, {
            method: "post",
            params
        });
    }
}

export default new ResourceMgtApi();