import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.use(elementUI)

//EventBus事件中转
Vue.prototype.$bus = new Vue()  

Vue.directive('highlight', {
    deep: true,
    bind(el, binding) {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach(block => {
            hljs.highlightBlock(block)
        })
    },
    componentUpdated(el) {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach(block => {
            hljs.highlightBlock(block)
        })
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
