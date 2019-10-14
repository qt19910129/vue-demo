import Vue from 'vue'
import Router from 'vue-router'
import navRouter from './nav'  //左侧导航路由页面配置
const Content = () => import("@/components/common/content.vue");  //首页

Vue.use(Router);

//防止路由报错 START
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
//防止路由报错 END

export default new Router({
    mode: "history",
    routes: [
        {
            path:'/',           //这个表示的是根目录，即一进入的页面
            redirect:'content/pageIndex'    //设置页面一进来就显示的页面，即重定向到goods组件
        },
        {
            name: 'content',
            path: '/content/pageIndex',
            component: Content,
            children: navRouter
        }
    ]
});
