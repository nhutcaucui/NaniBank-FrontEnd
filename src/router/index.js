import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Home from '@/components/Home'
import Login from '@/components/Login' // this is the import line to add
import RightLoginBox from '@/components/RightLoginBox'
import ForgotBox from '@/components/ForgotBox'
import AdminRoutes from './admin'
import EmployeeRoutes from './employee'

Vue.use(Router)

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// }

export default new Router({
  routes:[{
    path: '/',
    name: 'Trang chủ',
    component: Home
  },
  {
      path: '/About',
      name: 'Thông tin',
      component: About
  },
  {
    path: '/Login',
    name: 'Đăng nhập',
    children: [{
      path: '/',
      name: 'Login',
      component: RightLoginBox,
    },
    {
      path: 'ForgotPass',
      name: 'Forgot',
      component: ForgotBox,
    }],
    component: Login
  },
    ...AdminRoutes,
  ...EmployeeRoutes]
})