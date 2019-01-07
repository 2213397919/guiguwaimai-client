import {RECEIVE_USER, RESET_USER} from '../mutation_type'
import {reqLogOut, reqUserInfo} from '../../api'

const state = {
  user:{},//保存用户信息
}
const mutations ={
//  保存用户个人信息
  [RECEIVE_USER](state,{user}){
    state.user=user;
  },
//  退出登录，清除用户信息
  [RESET_USER](state){
    state.user='';
  }
}
const actions = {
// 同步保存到user
  saveUser ({commit}, user) {
    commit(RECEIVE_USER, {user});
  },
//  异步获取当前用户的信息
  async getUser ({commit}) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      const user = result.data;
      //提交mutation，修改用户信息。
      commit(RECEIVE_USER, {user})
    }
  },
//  登录退出，清空用户记录
  async logout ({commit}) {
    const result = await reqLogOut();
    if (result.code === 0) {
      commit(RESET_USER)
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
