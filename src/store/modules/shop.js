import Vue from 'vue'
import {GET_GOODS,GET_RATINGS,GET_INFO,ADD_COUNT,REDUCE_COUNT} from '../mutation_type'
import {reqGoods,reqInfo,reqRating} from '../../api'

const state = {
  info:{}, //商家信息
  goods:[], //商品列表
  ratings:[],//评论
  shopping:[] //购物
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
     state.shopping.push(food)
   } else {
     food.count++;
   }
  },
  [REDUCE_COUNT](state,{food}) {
   if (food.count>0){
     food.count--;
     if (food.count === 0 ){
     //  从shopping中移出food
       state.shopping.splice(state.shopping.indexOf(food),1);
     }
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
  async getRatings({commit},cb){
    const result = await reqRating();
    if (result.code === 0){
      const ratings = result.data;
      commit(GET_RATINGS,{ratings});
      typeof cb === 'function' && cb();
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
  totalCount(state){
    return state.shopping.reduce((pre,food)=> pre + food.count,0);
  },
  totalPrice(state){
    return state.shopping.reduce((pre,food)=> pre + food.count * food.price,0);
  },
  totalRatingCount (state) {
    return state.ratings.length
  },

  positiveRatingCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType===0 ? 1 : 0), 0)
  },

  negativeRatingCount (state, getters) {
    return getters.totalRatingCount - getters.positiveRatingCount
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
