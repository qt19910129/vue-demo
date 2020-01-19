import router from './index.js'

export default function () {
  /*
    全局路由钩子
    访问资源时需要验证sessionStorage中是否存在token
 */
    router.beforeEach((to, from, next) => {
        if(to.fullPath != '/login') {
            if(localStorage.getItem("token")) {
                next()
            } else {
                next('/login')
            }
        } else {
            next()
        }
    })
}
