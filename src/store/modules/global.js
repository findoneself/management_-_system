import $http from '_new/index'
export default {
  namespaced: true,
  state: {
    // 菜单数据
    menuList: [],
    // 菜单路由数据
    menuRoutes: [],
    // 用户信息
    userInfo: {},
    // 所有字典数据
    dictData: {},
    // 扬尘检测下拉框
    dusDicts: {}
  },
  mutations: {
    // ----用户
    setUserInfo (state, data) {
      if (!state.userInfo.id) {
        state.userInfo = data
      }
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    // ----菜单
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
    },
    // 存储字典数据
    setDictData (state, obj) {
      state.dictData = obj
    },
    // 储存扬尘监测下拉框数据
    setDusDictData (state, obj) {
      state.dusDicts = {}
      state.dusDicts[obj.type] = obj.list

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