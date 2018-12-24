/*
包含n个用于间接更新状态数据的方法的对象
 */

import {
  reqAddress,
  reqShops,
  reqCategorys,
  reqUserInfo,
  reqLogOut
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER
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
  },
//  异步获取当前用户的信息
  async getUser({commit}){
    const result = await reqUserInfo();
    if (result.code === 0){
      const user = result.data;
      //提交mutation，修改用户信息。
      commit(RECEIVE_USER,{user})
    }
  },
//  登录退出，清空用户记录
  async logout({commit}){
    const result =await reqLogOut();
    if (result.code === 0){
      commit(RESET_USER)
    }
  }
}
