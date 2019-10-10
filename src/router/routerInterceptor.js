import router from './index.js'

export default function () {
  /*
    全局路由钩子
    访问资源时需要验证sessionStorage中是否存在token
 */
router.beforeEach((to, from, next) => {
    let islogin = false;//开关，是否开启登录
    if(islogin){
        let token = sessionStorage.getItem("token");
        if(token){
          next()
        }
        else{
          if (to.path === '/login') { //这就是跳出循环的关键
            next()
          } else {
              next('/login')
          }
        }
    }
    else{
        next()
    }

  });
}
