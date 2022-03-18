import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './libs/utils'
import './libs/pxtoRem'
Vue.config.productionTip = false
Vue.prototype.$utils = Utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
