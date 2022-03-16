import Vue from 'vue'
import VueRouter from 'vue-router'

// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 重写路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
// 路由组件
const Login = () => import('_vie/login/Login')
const Main = () => import('_vie/main/Main')
const Home = () => import('_vie/main/home/Home')
const Dustmonitoring = () => import('_vie/main/dustMonitoring/DustMonitoring')
const Noisemonitoring = () => import('_vie/main/noiseMonitoring/NoiseMonitoring')
const Carwashing = () => import('_vie/main/carWashing/CarWashing')
const AIdistinguish = () => import('_vie/main/AIdistinguish/AIdistinguish')
const Projectmanagement = () => import('_vie/main/projectManagement/ProjectManagement')
const Patrolrectification = () => import('_vie/main/patrolRectification/PatrolRectification')

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    component: Main,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/dustMonitoring', component: Dustmonitoring },
      { path: '/noiseMonitoring', component: Noisemonitoring },
      { path: '/carWashing', component: Carwashing },
      { path: '/aiDistinguish', component: AIdistinguish },
      { path: '/projectManagement', component: Projectmanagement },
      { path: '/patrolRectification', component: Patrolrectification }
    ]
  }
]
const router = new VueRouter({
  routes
})

// 全局挂载路由导航守卫--暂时没token不用放开
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路劲
//   // from 代表从哪个路径跳转而来
//   // next是一个函数，表示放行
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   to.path === '/login' ? next() : !tokenStr ? next('/login') : next()
// })
export default router
