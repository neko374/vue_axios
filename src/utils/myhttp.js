import axios from "axios";
const service = axios.create({
    baseURL: "http://192.168.69.195:4000/",
    timeout: 10000//超时
})
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    if (config.url.endsWith("login")) {
        return config;
    }
    if (sessionStorage.getItem("mytoken") && !config.headers.Authorization) {
        config.headers.Authorization = sessionStorage.getItem("mytoken")
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service;