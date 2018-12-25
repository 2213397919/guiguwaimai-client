import Vue from 'vue'
import App from './App'
import router from './router'
import NavHeader from './components/NavHeader/NavHeader'
import Star from './components/Star/Star'
import store from './store/store'
import {Button} from 'mint-ui'
import CartControl from './components/CartControl/CartControl'
//使用mock接口
import mockServer from './mock/mockServer'

//全局注册组件
Vue.component('NavHeader', NavHeader)
Vue.component('Star', Star)
Vue.component(Button.name,Button);
Vue.component('CartControl',CartControl)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
