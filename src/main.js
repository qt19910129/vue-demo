// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false


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
