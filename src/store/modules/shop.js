import {GET_GOODS,GET_RATINGS,GET_INFO} from '../mutation_type'
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
  }
}
const actions = {
  async getInfo({commit}){
    const result = await reqInfo();
    if (result.code === 0){
      const info = result.data;
      commit(GET_INFO,{info})
    }
  },
  async getGoods({commit}){
    const result = await reqGoods();
    if (result.code === 0){
      const goods = result.data;
      commit(GET_GOODS,{goods})
    }
  },
  async getRating({commit}){
    const result = await reqRating();
    if (result.code === 0){
      const ratings = result.data;
      commit(GET_RATINGS,{ratings})
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
