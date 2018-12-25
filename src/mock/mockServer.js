/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs';
import data from './data';

//goods接口
Mock.mock('/goods',{code:0,data:data.goods});
//rating接口
Mock.mock('/rating',{code:0,data:data.ratings});
//info接口
Mock.mock('/info',{code:0,data:data.info});
