import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './libs/utils'
import './libs/pxtoRem'

// 引入富文本编辑器
// import VueQuillEditor from "vue-quill-editor";

// Vue.use(VueQuillEditor);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
