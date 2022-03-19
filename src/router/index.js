import Vue from 'vue'
import VueRouter from 'vue-router'
import $http from '../network'
import $utils from '../libs/utils'
import { isURL } from '../libs/validate'
// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    // 重写路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const Login = () =>
    import ('_vie/global/Login')
const Index404 = () =>
    import ('_vie/global/404')
    // 全局理由路由入口
const globalRoutes = [
        { path: '/login', component: Login, name: 'login', meta: { title: '登录' } },
        { path: '/404', component: Index404, name: '404', meta: { title: '404未找到' } }
    ]
    // 主路由
    // 菜单路由
let routeMenu = []
const Main = () =>
    import ('_vie/main/Main')
const CarWashing = () =>
    import ('_vie/main/carWashing/CarWashing')
const mainRoutes = {
        path: '/',
        component: Main,
        name: 'main',
        meta: { title: '主入口整体布局' },
        children: routeMenu,
        beforeEnter(to, from, next) {
            // 为了验证token，如果失效跳转至登录页
            // let token = Vue.cookie.get('token')
            // if (!token || !/\S/.test(token)) {
            //   next({ name: 'login' })
            //   return
            // }
            next()
        }
    }
    // 实例化路由
const router = new VueRouter({
        mode: 'hash',
        // 切换路由回到顶部
        scrollBehavior: () => ({ y: 0 }),
        // 是否已经添加动态(菜单)路由
        isLoadMenu: false,
        routes: [...globalRoutes, ...[mainRoutes]]
    })
    // 路由前置守卫
router.beforeEach((to, from, next) => {
        if (to.path === '/login') {
            router.options.isLoadMenu = false
            next()
        } else if (!router.options.isLoadMenu) {
            getMenuData(to, next)
        } else {
            next()
        }
    })
    // 获取动态路由
function getMenuData(to, next) {
    mainRoutes.children = []
    $http({ url: `/menu/nav${to.params.userId || ''}` }).then(data => {
        data = data || []
    }, err => {
        // router.push({ name: 'login' })
        // 下面逻辑当能获取菜单时移入reslove里面，且需要判断是否返回数据
        router.options.isLoadMenu = true
        const list = [
                { id: '1', key: 1, menuType: 'tab', title: '预警监控', url: '@/home/Home', parentId: '00' },
                { id: '2', key: 2, menuType: 'sub', title: '扬尘监测', parentId: '00', url: '@/dustMonitoring/DustMonitoring' },
                { id: '2-1', key: 1, title: '测试1', parentId: '2', url: '@/dustMonitoring/children/vue1' },
                { id: '2-2', key: 2, title: '测试2', parentId: '2', url: '@/dustMonitoring/children/vue2' },
                { id: '2-3', key: 3, title: '测试3', parentId: '2', url: '@/dustMonitoring/children/vue3' },
                { id: '2-4', key: 4, title: '测试4', parentId: '2', url: '@/dustMonitoring/children/vue4' },
                { id: '3', key: 3, menuType: 'tab', title: '噪声监测', parentId: '00', url: '@/noiseMonitoring/NoiseMonitoring' },
                { id: '4', key: 4, menuType: 'tab', title: '车洗裸土', parentId: '00', url: '@/carWashing/CarWashing' },
                { id: '5', key: 5, menuType: 'tab', title: 'AI识别', url: '@/AIdistinguish/AIdistinguish', parentId: '00' },
                { id: '5-1', key: 1, title: 'AI识别安装率', parentId: '5', url: '@/AIdistinguish/children/vue1' },
                { id: '5-2', key: 2, title: '测试2', parentId: '5', url: '@/AIdistinguish/children/vue2' },
                { id: '5-3', key: 3, title: '测试3', parentId: '5', url: '@/AIdistinguish/children/vue3' },
                { id: '5-4', key: 4, title: '测试4', parentId: '5', url: '@/AIdistinguish/children/vue4' },
                { id: '6', key: 6, menuType: 'tab', title: '项目管理', parentId: '00', url: '@/projectManagement/ProjectManagement' },
                { id: '7', key: 7, menuType: 'tab', title: '巡查整改', url: '@/patrolRectification/PatrolRectification', parentId: '00' },
                { id: '8', key: 8, menuType: 'tab', parentId: '00', title: '管理员', url: '@/manageUser/index' }
            ]
            // 根据key值排序并储存当前菜单
        const menuList = $utils.compareSort($utils.treeDataTranslate(list), 'key')
        sessionStorage.setItem('menuList', JSON.stringify(menuList))
        let temp = []
        list.map(item => {
            if (item.url && /\S/.test(item.url)) {
                // 设置路由信息
                const route = {
                    parentId: item.parentId,
                    path: item.url.replace('@', ''),
                    component: null,
                    name: item.url.replace('@/', '').replace(/\//g, '-'),
                    meta: {
                        id: item.id,
                        title: item.title,
                        menuType: item.menuType || false,
                        iframeUrl: '',
                        type: ''
                    }
                }
                if (item.isHome) {
                    mainRoutes.redirect = { name: route.name }
                }
                // url以http[s]://开头的，通过iframe展示
                if (isURL(item.url)) {
                    route.path = `i-${item.id}`
                    route.name = `i-${item.id}`
                    route.meta.type = 'iframe'
                    route.meta.iframeUrl = item.url
                } else {
                    next()
                }
            }
        })
        mainRoutes.children = temp
        router.addRoutes([mainRoutes])
            // 储存菜单路由
        sessionStorage.setItem('menuRoutes', JSON.stringify(mainRoutes.children))
        next({...to, replace: true })
    })
}
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