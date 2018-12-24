/*
包含n个用于直接更新状态数据的方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER
   } from './mutation_type'
export default {
  //地址信息
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address;
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
  state.categorys = categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops;
  },
//  保存用户个人信息
  [RECEIVE_USER](state,{user}){
    state.user=user;
  },
//  退出登录，清除用户信息
  [RESET_USER](state){
    state.user='';
  }
}
