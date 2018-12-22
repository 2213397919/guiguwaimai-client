/*
vuex最核心的管理对象模块
 */
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutation from './mutations';
import actions from './actions';
import getters from './getters';
//声明使用插件
Vue.use(Vuex);
export default {
  state,
  mutation,
  actions,
  getters
}
