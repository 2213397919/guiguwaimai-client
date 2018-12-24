/*
包含n个用于间接更新状态数据的方法的对象
 */

import {
  reqAddress,
  reqShops,
  reqCategorys
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER
 } from './mutation_type'

export default {
//  获取地理位置的异步请求
  async getAddress({commit,state}){
    //获取默认值
    const {longitude,latitude} = state;
    //发送ajax
    const result = await reqAddress(longitude,latitude);
    //判断是否成功。
    if (result.code === 0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address});
    }
  },
//异步获取食物列表分类
  async getFoods({commit}){
    //发送ajax
    const result = await reqCategorys();
    if (result.code === 0 ){
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS,{categorys});
    }
  },
  //异步获取商家列表
  async getShops({commit,state}){
    //获取默认值
    const {longitude,latitude} = state;
    //发送ajax
    const result = await reqShops(longitude,latitude);
    if (result.code === 0 ){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops});
    }
  },
//  同步保存到user
  saveUser({commit},user){
    commit(RECEIVE_USER,{user});
  }
}
