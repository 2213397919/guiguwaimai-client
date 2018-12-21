//
import MySite from '../pages/MySite/MySite'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import Profile from '../pages/Profile/Profile'
export default [
  {
    path: '/mysite',
    component: MySite
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/',
    redirect: MySite
  }
]
