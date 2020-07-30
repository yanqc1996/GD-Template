/**
 * @description 基础api配置对象
 * @author dunfee
 * @date 2019/10/30
 */
import axios from './http';
import {
    Message
} from 'element-ui';
import {
    aesEncrypt
} from "@/utils/utils";

class BaseApi {
    constructor() {
        this.prefix = "/api"; // 前缀，用于接口的分发
        this.axios = axios; // 直接使用axios的api
    }

    _doRequest_$1(method = "get", url, params, config, successText) {
        /**
         * @description 执行请求$1（get方式）
         * @param {String} method 指定的请求方式，默认值为"get"
         * @param {String} url 接口的url
         * @param {Object} params 请求参数
         * @param {Object} config 请求配置（config.headers）
         * @param {String} successText 请求成功提示的信息，值为"-1"时，即不需要提示
         * @returns {Object} promise对象
         */
        return new Promise(resolve => {
            axios[method](url, {
                params
            }, config).then(response => {
                let res = response.data;
                if (typeof response.retCode !== "undefined") {
                    res = response;
                }

                if (res.retCode !== 416) {
                    if (res.retCode === 200) {
                        if (successText !== "-1") {
                            Message({
                                message: successText,
                                type: 'success'
                            });
                        }
                    } else if (res.retMsg) {
                        Message({
                            message: res.retMsg,
                            type: 'warning'
                        });
                    }
                }
                resolve(res);
            });
        });
    }

    _doRequest_$2(method = "post", url, data, config, successText) {
        /**
         * @description 执行请求$2（post方式 ｜ put方式 ｜ delete方式）
         * @param {String} method 指定的请求方式，默认值为"post"
         * @param {String} url 接口的url
         * @param {Object} data 提交的数据
         * @param {Object} config 请求配置（config.headers）
         * @param {String} successText 请求成功提示的信息，值为"-1"时，即不需要提示
         * @returns {Object} promise对象
         */
        return new Promise(resolve => {
            axios[method](url, data, config).then(response => {
                let res = response.data;
                if (typeof response.retCode !== "undefined") {
                    res = response;
                }

                if (res.retCode !== 416) {
                    if (res.retCode === 200) {
                        if (successText !== "-1") {
                            Message({
                                message: successText,
                                type: 'success'
                            });
                        }
                    } else if (res.retMsg) {
                        Message({
                            message: res.retMsg,
                            type: 'warning'
                        });
                    }
                }
                resolve(res);
            });
        });
    }

    get(url, params = {}, {
        config = {},
        encrypted = false,
        successText = "-1"
    } = {
        config: {},
        encrypted: false,
        successText: "-1"
    }) {
        /**
         * @description get方式
         * @param {String} url 接口的url
         * @param {Object} params 请求参数
         * @param {Object} config.config 请求配置（config.headers）
         * @param {Boolean} config.encrypted 是否对暴露在url后面的 id 进行加密处理（aes加密）,默认值为 false
         * @param {String} config.successText 请求成功提示的信息，默认值为"-1"，即不需要提示
         * @returns {Object} promise对象
         */
        if (encrypted) {
            let _arr = url.split("/"),
                _len = _arr.length,
                _lastWord = _arr[_len - 1];
            if (!Object.is(Number(_lastWord), NaN)) {
                _arr[_len - 1] = aesEncrypt(_lastWord);
                url = _arr.join("/");
            }
        }

        return this._doRequest_$1("get", url, params, config, successText);
    }

    delete(url, id, {
        config = {},
        encrypted = false,
        successText = "-1"
    } = {
        config: {},
        encrypted: false,
        successText: "-1"
    }) {
        /**
         * @description delete方式
         * @param {String} url 接口的url
         * @param {Number} id 要删除的记录的id
         * @param {Object} config.config 请求配置（config.headers）
         * @param {Boolean} config.encrypted 是否对暴露在url后面的 id 进行加密处理（aes加密）,默认值为 false
         * @param {String} config.successText 请求成功提示的信息，默认值为"-1"，即不需要提示
         * @returns {Object} promise对象
         */
        if (encrypted) {
            id = aesEncrypt(id);
        }
        let _url = `${url}/${id}`;
        return this._doRequest_$2("delete", _url, {}, config, successText);
    }

    post(url, data, {
        config = {},
        successText = "-1"
    } = {
        config: {},
        successText: "-1"
    }) {
        /**
         * @description post方式
         * @param {String} url 接口的url
         * @param {Object} data 提交的数据
         * @param {Object} config 请求配置（config.headers）
         * @param {String} successText 请求成功提示的信息，默认值为"-1"，即不需要提示
         * @returns {Object} promise对象
         */
        return this._doRequest_$2("post", url, data, config, successText);
    }

    put(url, data, {
        config = {},
        successText = "-1"
    } = {
        config: {},
        successText: "-1"
    }) {
        /**
         * @description put方式
         * @param {String} url 接口的url
         * @param {Object} data 提交的数据
         * @param {Object} config 请求配置（config.headers）
         * @param {String} successText 请求成功提示的信息，默认值为"-1"，即不需要提示
         * @returns {Object} promise对象
         */
        return this._doRequest_$2("put", url, data, config, successText);
    }

    create(formData, {
        config = {},
        successText = "创建成功！"
    } = {
        config: {},
        successText: "创建成功！"
    }) {
        /**
         * @description 新增记录
         * @param {Object} formData 新增表单数据
         * @param {Object} config.config 请求配置（config.headers），默认值为 {}
         * @param {String} config.successText 请求成功提示的信息，默认值为"创建成功！"
         * @returns {Object} promise对象
         */
        let _url = `${this.prefix}${this.baseUrl}`;
        return this.post(_url, formData, {
            config,
            successText
        });
    }

    remove(id, {
        method = "delete",
        config = {},
        encrypted = false,
        successText = "删除成功！"
    } = {
        method: "delete",
        config: {},
        encrypted: false,
        successText: "删除成功！"
    }) {
        /**
         * @description 删除记录
         * @param {Number} id 记录id
         * @param {String} config.method 指定请求方式，可能取值为 get 和 post,默认值为 delete
         * @param {Object} config.config 请求配置（config.headers），默认值为 {}
         * @param {Boolean} config.encrypted 是否对暴露在url后面的 id 进行加密处理（aes加密）,默认值为 false
         * @param {String} config.successText 请求成功提示的信息，默认值为"删除成功！"
         * @returns {Object} promise对象
         */
        if (!["delete", "post"].includes(method)) {
            console.error("Only get and post methods can be used.");
            return Promise.reject("Only get and post methods can be used.");
        }

        let _url = `${this.prefix}${this.baseUrl}`;
        if (method === "delete") {
            return this.delete(_url, id, {
                config,
                encrypted,
                successText

            });
        } else {
            return this.post(_url, {
                ids: id
            }, {
                config,
                successText
            });
        }
    }

    modify(formData, {
        config = {},
        successText = "修改成功！"
    } = {
        config: {},
        successText: "修改成功！"
    }) {
        /**
         * @description 修改记录
         * @param {Object} formData 修改表单数据
         * @param {Object} config.config 请求配置（config.headers），默认值为 {}
         * @param {String} config.successText 请求成功提示的信息，默认值为"修改成功！"
         * @returns {Object} promise对象
         */
        let _url = `${this.prefix}${this.baseUrl}`;
        return this.put(_url, formData, {
            config,
            successText
        });
    }

    page(params = {}, {
        method = "get",
        config = {}
    } = {
        method: "get",
        config: {}
    }) {
        /**
         * @description 获取分页表格信息
         * @param {Object} 请求参数（包含分页请求参数）
         * @param {String} config.method 指定请求方式，可能取值为 get 和 post,默认值为 get
         * @param {Object} config.config 请求配置（config.headers），默认值为 {}
         * @returns {Object} promise对象
         */
        if (!["get", "post"].includes(method)) {
            console.error("Only get and post methods can be used.");
            return Promise.reject("Only get and post methods can be used.");
        }

        let _url = `${this.prefix}${this.baseUrl}`;
        return this[method](_url, params, {
            config
        });
    }

    detail(id, {
        config = {},
        encrypted = false
    } = {
        config: {},
        encrypted: false
    }) {
        /**
         * @description 记录详情信息
         * @param {Number} id 记录id
         * @param {Object} config.config 请求配置（config.headers），默认值为 {}
         * @param {Boolean} config.encrypted 是否对暴露在url后面的 id 进行加密处理（aes加密）,默认值为 false
         * @returns {Object} promise对象
         */
        let _url = `${this.prefix}${this.baseUrl}/${id}`;
        return this.get(_url, {}, {
            config,
            encrypted
        });
    }

    download(url, {
        takeToken = true,
        method = "get",
        params = {},
        config = {},
        filename = "下载文件.xlsx",
        responseType = "blob"
    } = {
        takeToken: true,
        method: "get",
        params: {},
        config: {},
        filename: "下载文件.xlsx",
        responseType: "blob"
    }) {
        /**
         * @description 下载接口
         * @param {String} url 接口的url
         * @param {Boolean} config.takeToken 是否在请求header中携带token，默认值为 true
         * @param {String} config.method 指定的请求方式，可能取值为 get 和 post,默认值为"get"
         * @param {Object} config.params 请求参数数据，默认值为 {}
         * @param {Object} config.config 请求配置（config.headers），默认值为 {}
         * @param {String} config.filename 下载文件文件名（包含文件格式），默认值为 "下载文件.xlsx"
         * @param {String} config.responseType 返回值类型（blob表示二进制文件）
         */
        if (!["get", "post"].includes(method)) {
            console.error("Only get and post methods can be used.");
            return Promise.reject("Only get and post methods can be used.");
        }
        if (method === "post" || takeToken) {
            /**
             * 需要在请求header中携带token 或 请求方式需要为 post 方式时
             * 先使用axios发出请求，获取到服务端文件资源的blob格式数据
             * 然后再利用浏览器行为下载blob格式数据
             */
            let _utils = {
                method,
                url,
                config,
                responseType
            };
            if (method === "get") {
                _utils["params"] = params;
            } else {
                _utils["data"] = params;
            }

            this.axios(_utils).then(res => {
                if (res.status === 200) {
                    let _aEl = document.createElement("a"),
                        _blob = res.data; // blob格式数据

                    _aEl.setAttribute("style", "display: none;");
                    _aEl.href = URL.createObjectURL(_blob);
                    _aEl.download = filename;
                    _aEl.click();
                    URL.revokeObjectURL(_blob);
                } else {
                    Message({
                        message: "下载失败！",
                        type: 'warning'
                    });
                }
            });
        } else {
            /**
             * 不需要在请求header中携带token
             * 则直接使用浏览器行为下载服务端对应的文件资源
             */
            let _url = `${url}?`;
            Object.keys(params).map(item => _url += `${item}=${params[item]}&`);
            _url = _url.substring(0, _url.length - 1);
            window.location.href = _url;
        }
    }

}

export default BaseApi;