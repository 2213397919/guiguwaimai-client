import Vue from 'vue'
import App from './App'
import router from './router'
import NavHeader from './components/NavHeader/NavHeader'
import Star from './components/Star/Star'
import store from './store/store'
import {Button} from 'mint-ui'
import CartControl from './components/CartControl/CartControl'
import Split from './components/Split/Split'
//使用mock接口
import mockServer from './mock/mockServer'
import './filters/moment'
import vueLazyLoad from 'vue-lazyload'
import loading from './common/img/load.gif'

//全局注册组件
Vue.component('NavHeader', NavHeader)
Vue.component('Star', Star)
Vue.component(Button.name,Button);
Vue.component('CartControl',CartControl)
Vue.component('Split',Split)
//内部定义一个全局指令
Vue.use(vueLazyLoad,{
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
