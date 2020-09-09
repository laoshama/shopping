import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

//  挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //  用户直接访问登入页面 直接放行
  if (to.path === '/login') return next()
  //  判断是否已经登入
  if (!window.sessionStorage.getItem('token')) return next('/login') // 没有登入 则强制转到登入页面
  next()
})

export default router
