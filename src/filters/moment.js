//用来自定义过滤器模块
import Vue from 'vue';
import moment from 'moment'
Vue.filter('data-format',(value,format)=>{
  return moment(value).format(format ||'YYYY-MM-DD HH:mm:ss')
})
