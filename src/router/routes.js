//定义路由
// import MySite from '../pages/MySite/MySite'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'
// import Profile from '../pages/Profile/Profile'

//路由组件懒加载
//通过import（）加载的模块会被单独打包。（单独的js文件：code split）
const MySite = () => import('../pages/MySite/MySite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Search = () => import('../pages/Search/Search.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
export default [
  {
    path: '/mysite',
    component: MySite,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/mysite'
  },
  {
    path: '/shop',
    component: Shop,
    children:[
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '/shop/rating',
        component: ShopRating
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },
]
