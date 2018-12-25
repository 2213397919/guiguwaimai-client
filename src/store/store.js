/*
vuex最核心的管理对象模块
 */
import Vue from 'vue';
import Vuex from 'vuex';
// import actions from './actions';
// import getters from './getters';
import mySite from './modules/mysite'
import user from './modules/user'
//声明使用插件
Vue.use(Vuex);
export default new Vuex.Store({
  actions,
  getters,
  modules:{
    mySite,
    user
  }
})
