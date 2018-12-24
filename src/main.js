import Vue from 'vue'
import App from './App'
import router from './router'
import NavHeader from './components/NavHeader/NavHeader'
import Star from './components/Star/Star'
import store from './store/store'
import {Button} from 'mint-ui'

//全局注册组件
Vue.component('NavHeader', NavHeader)
Vue.component('Star', Star)
Vue.component(Button.name,Button);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
