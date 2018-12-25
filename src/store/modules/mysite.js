import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from '../mutation_type'
import {reqAddress, reqCategorys, reqShops} from '../../api'

const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], //商家数组
}
const mutations ={
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
}
const actions ={
//  获取地理位置的异步请求
  async getAddress({commit,state}){
    //获取默认值
    const {longitude,latitude} = state;
    //发送ajax
    const result = await reqAddress(longitude,latitude);
    // console.log(result)
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
}
const getters ={

}
export default {
  state,
  mutations,
  actions,
  getters
}
