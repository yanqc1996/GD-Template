/**
 * @description axios二次封装（请求延时时间，拦截器等）
 * @author dunfee
 * @date 2019/10/30
 */
import axios from 'axios';
import qs from 'qs';
import router from '../../router';

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

let toString = Object.prototype.toString, // toString
    pending = [], // pending
    cancelToken = axios.CancelToken, // cancelToken
    removePending = (config) => {
        pending.map((item, index) => {
            if (item.key === `${config.url}:${config.method}`) {
                item.cancel({ isDuplicateRequest: true });
                pending.splice(index, 1);
            }
        })
    }; // remove pending

const services = axios.create({
    timeout: 120000, // 请求延时时间
    withCredentials: false
});

// 需要忽略掉的请求参数，可根据实际需要更改
const ignoreParams = [null, undefined, ""];

// status -> message
const STATUS_MAPPING_MESSAGE = new Map([
    [400, "错误请求"],
    [401, "未授权，请重新登录"],
    [403, "拒绝访问"],
    [404, "请求错误,未找到该资源"],
    [405, "请求方法未允许"],
    [408, "请求超时"],
    [500, "服务器端出错"],
    [501, "网络未实现"],
    [502, "网络错误"],
    [503, "服务不可用"],
    [504, "网络超时"],
    [505, "http版本不支持该请求"]
]);

function checkResponeData(data) {
    // check response data
    if (data.retCode === 416) {
        // 416为登录失效
        sessionStorage.clear();
        router.push({
            path: "/login",
            query: {
                sessionIsInvalid: true
            }
        });
    }
}

// 请求拦截器
services.interceptors.request.use(config => {
    // 去掉需要忽略的请求参数（数据）
    removePending(config);
    config.cancelToken = new cancelToken(cancel => {
        pending.push({
            cancel,
            key: `${config.url}:${config.method}`
        });
    });

    let _configParams = config.params,
        _params = {};
    for (var column in _configParams) {
        if (ignoreParams.every(item => item !== _configParams[column])) {
            _params[column] = _configParams[column];
        }
    }
    config.params = _params;

    if (config.method === "get") {
        config.paramsSerializer = function(params) {
            return qs.stringify(params, { indices: false });
        };
    }

    if (config.url.indexOf("login") < 0) {
        let {
            authenticate = {}
        } = JSON.parse(sessionStorage.getItem("vuex")) || {},
            token = authenticate.token || "";

        config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
}, err => {
    return Promise.reject(err);
});

// 响应拦截器
services.interceptors.response.use(config => {
    checkResponeData(config.data);
    return config;
}, err => {
    let isDuplicateRequest = false;
    if (toString.call(err.message) === "[object Object]") {
        // isDuplicateRequest 表示是否为重复请求（重复请求被 cancel 之后，会走到这里）
        isDuplicateRequest = err.message;
    }

    let _message, // message
        _retCode = 0; // retCode

    if (isDuplicateRequest) {
        _retCode = 212; // 212 状态码表示拒绝（cancel）请求
    } else {
        let _response;
        if (err && (_response = err.response)) {
            _retCode = _response.status;
            _message = STATUS_MAPPING_MESSAGE.get(_retCode);
            if (_retCode === 212) {
                _message = _response.data.message;
            }
        }
    }

    let data = {
        retCode: _retCode,
        data: {},
        retMsg: _message
    }
    checkResponeData(data);
    return Promise.resolve(data);
});

export default services;