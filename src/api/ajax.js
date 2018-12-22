/*
能发送ajax请求的函数模块
包装axios
函数的返回值是promise对象
axios.get()/post()返回的就是promise对象
 */
import axios from 'axios'
export default function ajax (url,data={},method='GET') {
  return new Promise((resolve,reject)=>{
    //发送异步ajax
    let promise;
    if (method==='GET'){
      promise = axios.get(url,{params: data});
    }else {
      promise = axios.post(url,data);
    }
    promise
      .then(response =>{
        //  请求成功时
        resolve(response.data);
      })
      .catch(error =>{
        reject("请求失败"+error);
      })
  })
}
