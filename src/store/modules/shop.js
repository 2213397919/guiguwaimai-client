import Vue from 'vue'
import {GET_GOODS,GET_RATINGS,GET_INFO,ADD_COUNT,REDUCE_COUNT} from '../mutation_type'
import {reqGoods,reqInfo,reqRating} from '../../api'

const state = {
  info:{},
  goods:[],
  ratings:[]
}
const mutations ={
  [GET_GOODS](state,{goods}) {
    state.goods = goods
  },
  [GET_RATINGS](state,{ratings}) {
    state.ratings = ratings
  },
  [GET_INFO](state,{info}) {
    state.info = info
  },
  //数量同步
  [ADD_COUNT](state,{food}) {
   if (!food.count){
     Vue.set(food,'count',1);
   } else {
     food.count++;
   }
  },
  [REDUCE_COUNT](state,{food}) {
   if (food.count>0){
     food.count--;
   }
  }
}
const actions = {
  //商家
  async getInfo({commit}){
    const result = await reqInfo();
    // console.log(result)
    if (result.code === 0){
      const info = result.data;
      commit(GET_INFO,{info})
    }
  },
  //食物
  async getGoods({commit},cb){
    const result = await reqGoods();
    if (result.code === 0){
      const goods = result.data;
      commit(GET_GOODS,{goods})
      typeof cb === 'function' && cb();
    }
  },
  //评价
  async getRating({commit}){
    const result = await reqRating();
    if (result.code === 0){
      const ratings = result.data;
      commit(GET_RATINGS,{ratings})
    }
  },
  //更新数量
  updateCount ({commit}, {food, isAdd}) {
    if(isAdd) {
      commit(ADD_COUNT, {food})
    } else {
      commit(REDUCE_COUNT, {food})
    }
  }
}
const getters ={
}
export default {
  state,
  mutations,
  actions,
  getters
}
