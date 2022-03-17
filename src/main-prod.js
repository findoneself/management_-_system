import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './common/utils'
// 引入图标库
import './assets/fonts/iconfont.css'

// 引入富文本编辑器
<<<<<<< HEAD
// import VueQuillEditor from "vue-quill-editor";

// Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
=======
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
Vue.prototype.$utils = Utils
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
>>>>>>> cacb1a1ba8f0f790c19563ba4b9ba81d38e88802
