import axios from "axios";
import { Message, Loading } from "element-ui";
import qs from 'qs'

//loading设置 START
let loading;
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.5)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}
export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}
//loading END


axios.defaults.withCredentials = false;
// create an axios instance
const service = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

service.interceptors.request.use(
  config => {
      // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      // if (config.method === 'post') {
      //     config.data = qs.stringify(config.data)
      // }
    let reqData = config.data;
    for (let key in reqData) {
      if (reqData[key] === "") {
        delete reqData[key];
      }
    }
    config.data = reqData;
    showFullScreenLoading();
      // console.log(config);
      return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);
// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if(res.code == 4) {  //接口验证，返回值为4时，跳转登陆页
            window.location.href = "http://localhost:8888/#/login";
            return;
        } else if(res.code == 1) {
            Message.error('网络异常，请稍后再试');
        } else {
            tryHideFullScreenLoading();
            return Promise.resolve(response.data);
        }
    },
    error => {
        setTimeout(function () {
            tryHideFullScreenLoading();
            Message.error('网络异常，请稍后再试');
        },5000);
        return Promise.reject(error);
    }
  // /**
  //  * If you want to get information such as headers or status
  //  * Please return  response => response
  //  */
  //
  // /**
  //  * Determine the request status by custom code
  //  * Here is just an example
  //  * You can also judge the status by HTTP Status Code.
  //  */
  // response => {
  //   const res = response.data;
  //   const headers = response.headers;
  //   if (headers["content-type"] === "application/octet-stream;charset=UTF-8") {
  //     return response.data;
  //   }
  //   // if the custom code is not 20000, it is judged as an error.
  //   if (res.code !== 0) {
  //     Message({
  //       message: res.msg || "error",
  //       type: "error",
  //       duration: 5 * 1000
  //     });
  //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  //     if (res.code === 4) {
  //       window.open("http://localhost:8888/#/login");
  //     }
  //     return Promise.reject(res || {});
  //   } else {
  //     return res;
  //   }
  // },
  // error => {
  //   console.log("err" + error); // for debug
  //   Message({
  //     message: error.message,
  //     type: "error",
  //     duration: 5 * 1000
  //   });
  //   return Promise.reject(error);
  // }
);

export default service;
