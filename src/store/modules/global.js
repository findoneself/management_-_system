import $http from '_new/index'
export default {
  namespaced: true,
  state: {
    // 当前点击的菜单
    activeMenu: {},
    // 菜单数据
    menuList: [],
    // 菜单路由数据
    menuRoutes: [],
    // 用户信息
    userInfo: {}
  },
  mutations: {
    // ----用户
    setUserInfo (state, data) {
      if (!state.userInfo.id) {
        state.userInfo = data
      }
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    // 清除用户信息
    clearUserInfo (state) {
      state.userInfo = {}
      localStorage.removeItem('userInfo')
    },
    // ----菜单
    // 设置当前点击的菜单
    setActiveMenu (state, obj) {
      state.activeMenu = obj
      // 存缓存，为了页面刷新也有点击效果
      sessionStorage.setItem('currentMenu', JSON.stringify(obj))
    },
    // 保存菜单数据
    saveMenuList (state, list) {
      state.menuList = list
    },
    // 清空菜单数据
    clearMenuList (state) {
      state.menuList = []
    },
    // 保存菜单路由数据
    saveMenuRouteList (state, list) {
      state.menuRoutes = list
    },
    // 清空菜单数据
    clearMenuRouteLis (state) {
      state.menuRoutes = []
    }
  },
  actions: {
    // 获取用户信息
    getUserInfo ({ commit }, userId) {
      return new Promise(resolve => {
        $http({ url: `/userInfo${userId}` })
          .then(res => {
            if (res.code === 200) {
              // 储存缓存
              commit('setUserInfo', res.data)
              resolve({
                isUser: true
              })
            } else {
              commit('setUserInfo', {})
              resolve({
                isUser: false,
                message: '获取用户信息失败！'
              })
            }
          })
          .catch((err) => {
            commit('setUserInfo', {
              id: '1',
              username: 'admin',
              fullname: '管理员',
              mobile: '13211111111',
              // 首页菜单的id
              homeId: '15'
            })
            resolve({
              isUser: false,
              message: `获取用户信息失败！-${err}`
            })
          })
      })
    }
  }
}