import Vue from 'vue'
import Router from 'vue-router'
import navRouter from './nav'  //左侧导航路由页面配置


Vue.use(Router)
console.log(navRouter);
export default new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'content'
    }
  }, {
    name: 'content',
    path: '/content/pageIndex',
    component: resolve => require(['../components/common/content.vue'], resolve),
    children: navRouter
  }]
});
