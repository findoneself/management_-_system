import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  // 面包屑导航数据
  breadCrumb: {},
  // 当前点击的菜单
  activeMenu: {}
}

export default new Vuex.Store({
  state,
  mutations
})
