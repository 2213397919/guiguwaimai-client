import Vue from 'vue'
import App from './App'
import router from './router'
import NavHeader from './components/NavHeader/NavHeader'
import store from './store/store'

//全局注册组件
Vue.component('NavHeader', NavHeader)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
