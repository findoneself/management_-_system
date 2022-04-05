import Vue from 'vue'
import VueRouter from 'vue-router'
// import $http from '../network'
import $utils from '../libs/utils'
import { isURL } from '../libs/validate'
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
const Login = () =>
  import('_vie/global/Login')
const Index404 = () =>
  import('_vie/global/404')
// 全局理由路由入口
const globalRoutes = [
  { path: '/login', component: Login, name: 'login', meta: { title: '登录' } },
  { path: '/404', component: Index404, name: '404', meta: { title: '404未找到' } }
]
// 主路由
// 菜单路由
let routeMenu = []
const Main = () =>
  import('_vie/main/Main')
const mainRoutes = {
  path: '/',
  component: Main,
  name: 'main',
  meta: { title: '主入口整体布局' },
  children: routeMenu,
  beforeEnter (to, from, next) {
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
// 获取动态路由--数据应该返回两个数组：用户有权限的菜单列表和所有菜单列表，处理逻辑一样但是还没写
function getMenuData (to, next) {
  mainRoutes.children = []
  // 下面逻辑当能获取菜单时移入reslove里面，且需要判断是否返回数据
  // key：用来排序
  // title：菜单名
  // alias：菜单别名，为了菜单和显示在内容中的标题不一致而设立，默认和菜单名一样
  // type：菜单类型（hoe首页(不会出现在菜单中),menu菜单，可点击跳转；cat目录，如果carType是tabs可点击，但是是需要跳转到默认第一个子菜单）
  // catType：目录类型，tabs可点击，默认第一个子菜单，sub就是下拉子菜单，当前不可点击
  // url：路由路径，需要和组件路径一致
  // parentId：父节点id
  /*   一级菜单四种情况：
      1.单纯的目录，type='cat'且catType='sub'不可点击，只能点击下拉菜单
      1.单纯的目录，type='cat'且catType='tabs'，可以点击，但是默认跳转至子菜单第一个顺序的
      3.仅一个菜单type='menu'未勾选是否需要子菜单
      4.菜单且有子菜单，必须在创建菜单是勾选是否需要子菜单，然后添加选择catType类型
  */
  router.options.isLoadMenu = true
  const list = [
    { id: '0', key: 0, type: 'home', title: '首页', alias: '', parentId: '00', url: '@/home/Home' },
    { id: '1', key: 1, type: 'menu', title: '预警监控', alias: '预警监控', parentId: '00', url: '@/warnMonitor/WarnIndex' },
    { id: '2', key: 2, type: 'menu', title: '扬尘监测', alias: '扬尘监测', parentId: '00', url: '@/dustMonitoring/DusIndex' },
    { id: '2-1', key: 1, type: 'menu', title: '地图', alias: '地图', parentId: '2', url: '@/dustMonitoring/DusMap' },
    { id: '2-2', key: 2, type: 'menu', title: '单设备统计', alias: '单设备统计', parentId: '2', url: '@/dustMonitoring/DusSingleEcharts' },
    { id: '2-3', key: 3, type: 'menu', title: '多设备统计', alias: '多设备统计', parentId: '2', url: '@/dustMonitoring/DusMultipleEcharts' },
    { id: '2-4', key: 4, type: 'menu', title: '排名统计', alias: '排名统计', parentId: '2', url: '@/dustMonitoring/DusRankingEcharts' },
    { id: '3', key: 3, type: 'menu', title: '噪声监测', alias: '噪声监测', parentId: '00', url: '@/dustMonitoring/NoiseMonitoring' },
    { id: '4', key: 4, type: 'menu', catType: 'tabs', title: '车洗裸土', alias: '车洗裸土', parentId: '00', url: '@/carWashing/index' },
    { id: '4-1', key: 1, type: 'menu', title: 'AI识别安装率', alias: 'AI识别安装率', parentId: '4', url: '@/carWashing/CarAIinstall' },
    { id: '4-2', key: 2, type: 'menu', title: '违规渣土车', alias: '违规渣土车', parentId: '4', url: '@/carWashing/CarViolation' },
    { id: '4-3', key: 3, type: 'menu', title: '合规车次', alias: '合规车次', parentId: '4', url: '@/carWashing/CarCompliance' },
    { id: '4-4', key: 4, type: 'menu', title: '备案渣土车', alias: '备案渣土车', parentId: '4', url: '@/carWashing/CarKeepRecord' },
    { id: '4-5', key: 5, type: 'menu', title: '在监工程', alias: '在监工程', parentId: '4', url: '@/carWashing/CarMonitorProject' },
    { id: '4-6', key: 6, type: 'menu', title: '准运渣土车', alias: '准运渣土车', parentId: '4', url: '@/carWashing/CarQuasiTransportation' },
    { id: '4-7', key: 7, type: 'menu', title: '合规视频', alias: '合规车次+点击弹窗视频', parentId: '4', url: '@/carWashing/CarVideo' },
    { id: '5', key: 5, type: 'menu', title: 'AI识别', alias: 'AI识别', parentId: '00', url: '@/AIdistinguish/AIdistinguish' },
    { id: '6', key: 6, type: 'menu', title: '巡查整改', alias: '巡查整改', parentId: '00', url: '@/patrolRectification/PatrolIndex' },
    { id: '7', key: 7, type: 'menu', title: '项目管理', alias: '项目管理', parentId: '00', url: '@/projectManagement/ProjectIndex', catType: 'sub' }
  ]
  let temp = []
  list.map(item => {
    if (item.url && /\S/.test(item.url)) {
      const path = item.url.replace('@', '')
      const name = item.url.replace('@/', '').replace(/\//g, '-')
      item.path = path
      item.name = name
      // 设置路由信息
      const route = {
        path,
        component: null,
        name,
        meta: {
          id: item.id,
          parentId: item.parentId,
          title: item.title,
          alias: item.alias,
          menuType: item.menuType || false,
          iframeUrl: '',
          type: item.type,
          catType: item.catType || ''
        }
      }
      // if (item.isHome) {
      //   mainRoutes.redirect = { name: route.name }
      // }
      // url以http[s]://开头的，通过iframe展示
      if (isURL(item.url)) {
        route.path = `i-${item.id}`
        route.name = `i-${item.id}`
        route.meta.type = 'iframe'
        route.meta.iframeUrl = item.url
      } else {
        // 动态引入路由组件
        route.component = () =>
          import(`_vie/main${route.path}`)
      }
      temp.push(route)
    }
  })
  // 根据key值排序并储存当前菜单
  const menuList = $utils.compareSort($utils.treeDataTranslate(list), 'key')
  // 过滤掉作为首页的菜单，不作显示
  const menus = menuList.filter(item => item.type && item.type !== 'home')
  sessionStorage.setItem('menuList', JSON.stringify(menus))
  mainRoutes.children = temp
  router.addRoutes([mainRoutes])
  // 储存菜单路由
  sessionStorage.setItem('menuRoutes', JSON.stringify(mainRoutes.children))
  next({ ...to, replace: true })
  // $http({ url: `/menu/nav${to.params.userId || ''}` }).then(data => {
  //   data = data || []
  //   console.log(data)
  // }, () => {

  // })
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