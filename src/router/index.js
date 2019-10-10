import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'content'
    }
  }, {
    name: 'content',
    path: '/content',
    component: resolve => require(['../components/common/content.vue'], resolve),
    children: [

    ]
  }]
});
