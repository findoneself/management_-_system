import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './common/utils'
// 引入element组件配置
import './plugins/element'
// 引入图标库
import './assets/fonts/iconfont.css'
// 引入nprogress样式
import 'nprogress/nprogress.css'
// 引入富文本编辑器
<<<<<<< HEAD
// import VueQuillEditor from "vue-quill-editor";
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
// Vue.use(VueQuillEditor);
=======
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
>>>>>>> cacb1a1ba8f0f790c19563ba4b9ba81d38e88802

Vue.config.productionTip = false
Vue.prototype.$utils = Utils

new Vue({
<<<<<<< HEAD
    router,
    store,
    render: h => h(App)
}).$mount("#app");
=======
  router,
  store,
  render: h => h(App)
}).$mount('#app')
>>>>>>> cacb1a1ba8f0f790c19563ba4b9ba81d38e88802
