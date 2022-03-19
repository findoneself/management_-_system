import Vue from 'vue'
import Vuex from 'vuex'
import _cloneDeep from 'lodash/cloneDeep'
import global from './modules/global'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    global
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = _cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  }
})
