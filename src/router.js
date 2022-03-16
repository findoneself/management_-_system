import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Users from './components/user/Users'
import Main from './pages/main/index' //首页（预警管控）
import Dustmonitoring from './pages/dustMonitoring/index' //扬尘监测
import Noisemonitoring from './pages/noiseMonitoring/index' //噪声监测
import Carwashing from './pages/carWashing/index' //车洗裸土
import AIdistinguish from './pages/AIdistinguish/index' //AI识别
import Projectmanagement from './pages/projectManagement/index' //项目管理
import Patrolrectification from './pages/patrolRectification/index' //巡查整改


Vue.use(Router)

const router = new Router({
        routes: [{ path: '/', redirect: '/main' },
            { path: '/login', component: Login },
            {
                path: '/home',
                component: Home,
                redirect: '/main',
                children: [
                    { path: '/main', component: Main },
                    { path: '/dustMonitoring', component: Dustmonitoring },
                    { path: '/noiseMonitoring', component: Noisemonitoring },
                    { path: '/carWashing', component: Carwashing },
                    { path: '/aiDistinguish', component: AIdistinguish },
                    { path: '/projectManagement', component: Projectmanagement },
                    { path: '/patrolRectification', component: Patrolrectification },

                ]
            }
        ]
    })
    // 拦截路由导航守卫
    // router.beforeEach((to, from, next) => {
    //     // 如果访问的是登录页 就放行
    //     // 如果不是登录页 获取本地存储 是否有登录后的token值
    //     // 没有 强制跳转到登录页
    //     // 如果有token 放行
    //     if (to.path === '/login') return next()
    //     const tokenStr = window.sessionStorage.getItem('token')
    //     if (!tokenStr) return next('/login')
    //     next()
    // })
export default router