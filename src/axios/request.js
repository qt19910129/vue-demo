import axios from "axios";
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

service.interceptors.request.use(
  config => {
    let reqData = config.data;
    for (let key in reqData) {
      if (reqData[key] === "") {
        delete reqData[key];
      }
    }
    config.data = reqData;
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
        } else {
            return Promise.resolve(response.data);
        }
    },
    error => {
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
