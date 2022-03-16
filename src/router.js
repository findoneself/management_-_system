import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome'
import Users from './components/user/Users'
import Main from './pages/main/index'
Vue.use(Router)

const router = new Router({
        routes: [{ path: '/', redirect: '/main' },
            { path: '/login', component: Login },
            {
                path: '/home',
                component: Home,
                redirect: '/main',
                children: [
                    { path: '/main', component: Main }
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