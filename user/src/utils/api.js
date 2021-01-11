/**
 * @description 对axios进行二次封装
 * @author dunfee
 * @date 2019/6/25
 * @update dunfee (2019/7/8) 修改提示方式
 */
import axios from 'axios';
import router from './../router';
import qs from 'qs';
import { Message } from 'element-ui';

axios.defaults.timeout = 1200000;
// axios.defaults.baseURL = 'http://192.168.1.70:9001/';
axios.defaults.baseURL = 'http://www.zhejiangict.com:19070/';
// axios.defaults.baseURL = 'http://192.168.1.174:9001/';
// axios.defaults.baseURL = 'http://192.168.1.215:9001/';
// // axios.defaults.baseURL = 'api/';
axios.defaults.withCredentials = true

// let cancel, promiseArr = [];
// const CancelToken = axios.cancelToken;

axios.interceptors.request.use(config => {
    if (config.headers['Content-Type'] !== 'multipart/form-data') {
        config.data = qs.stringify(config.data);
    }


    // 发起请求时，取消掉当前正在进行的相同请求
    // if (promiseArr[config.url]) {
    //   promiseArr[config.url]('操作取消');
    //   promiseArr[config.url] = cancel;
    // } else {
    //   promiseArr[config.url] = cancel;
    // }

    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(config => {
  if(config.data.errorMsg=="请重新登录!"){
    router.replace("/login");
  }
    return config.data;
}, err => {
    let tipInfo = ''; // 提示信息
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                tipInfo = '错误请求';
                break;
            case 401:
                tipInfo = '未授权，请重新登录';
                break;
            case 403:
                tipInfo = '拒绝访问';
                break;
            case 404:
                tipInfo = '请求错误,未找到该资源';
                break;
            case 405:
                tipInfo = '请求方法未允许';
                break;
            case 408:
                tipInfo = '请求超时';
                break;
            case 500:
                tipInfo = '服务器端出错';
                break;
            case 501:
                tipInfo = '网络未实现';
                break;
            case 502:
                tipInfo = '网络错误';
                break;
            case 503:
                tipInfo = '服务不可用';
                break;
            case 504:
                tipInfo = '网络超时';
                break;
            case 505:
                tipInfo = 'http版本不支持该请求';
                break;
            case 800:
                tipInfo = '登陆失效';
                break;
            default:
                tipInfo = `连接错误${err.response.status}`;
        }
    } else {
        tipInfo = '连接到服务器失败';
    }
    Message({
        showClose: true,
        message: tipInfo,
        type: 'warning'
    })
    return Promise.reject(tipInfo);
});

export { axios };
