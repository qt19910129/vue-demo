// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//添加
import ElementUI from 'element-ui';
import './static/css/theme/index.css';
import "./static/css/main.css";

import 'babel-polyfill'




Vue.config.productionTip = false

//ueditor 引入
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

//Echarts 引入
import Echarts from 'echarts'
Vue.prototype.$echarts=Echarts;

// import axios from 'axios';
// Vue.prototype.$axios = axios;

import global_ from './global/global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

Vue.use(ElementUI);

//添加element-ui

// 引入公用css
import "./static/css/animate.css";

// 路由开始
import router from './router'
import routerInterceptor from './router/routerInterceptor'  //路由守卫
routerInterceptor();
//路由结束
import App from './App'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
