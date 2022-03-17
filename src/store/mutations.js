export default {
  // 设置面包屑导航数据
  setBreadCrumb (state, obj) {
    state.breadCrumb = obj
    // 保存在临时缓存，对象必须转换成字符串保存
    window.sessionStorage.setItem('asideNav', JSON.stringify(obj))
  },
  // 设置缓存的面包屑导航数据至状态管理中
  setSessionAsideNav (state, obj) {
    state.breadCrumb = obj
  },
  // 设置当前点击的菜单
  setActiveMenu (state, obj) {
    state.activeMenu = obj
  }
}
