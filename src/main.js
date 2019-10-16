// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

//ueditor 引入
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

//Echarts 引入
import Echarts from 'echarts'
Vue.prototype.$echarts=Echarts;

//添加
import ElementUI from 'element-ui';
import './static/css/theme/index.css';
Vue.use(ElementUI);

//添加element-ui

// 引入公用css
import "./static/css/main.css";
import "./static/css/animate.css";

// 路由开始
import router from './router'
import routerInterceptor from './router/routerInterceptor'  //路由守卫
routerInterceptor();
//路由结束


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
