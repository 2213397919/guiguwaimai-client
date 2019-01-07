import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: "hash",
  routes
})

//导航守卫
const paths = ['mysite','order','search','profile'];
router.beforeEach((to,from,next)=>{
  // 得到请求的路由路径
  const path = to.path
  // 如果在需要检查的paths中
  if(paths.indexOf(path)>=0) {
    // 判断是否已经登陆
    const userId = Vue.store.state.user.user._id
    // 如果已登陆, 放行
    if(userId) {
      next()
    } else {// 如果没有, 直接跳转到登陆
      next('/login')
    }
  } else { // 如果不在, 直接放行
    // 放行
    next()
  }
})
export default router

