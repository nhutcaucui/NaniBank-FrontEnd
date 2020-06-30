import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Home from '@/components/Home'
import Login from '@/components/Login' // this is the import line to add
import RightLoginBox from '@/components/RightLoginBox'
import ForgotBox from '@/components/ForgotBox'
import AdminRoutes from './admin'
import EmployeeRoutes from './employee'
import CustomerRoutes from './customer'
import store from '../store/store'
import PageNotFound from '@/components/404'

Vue.use(Router)

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// }

export default new Router({
  routes:[{
    path: '/',
    name: 'Trang chủ',
    beforeEnter: (to,from,next)=>{ //eslint-disable-line
      console.log(store.state.userType)
      if(store.state.userType != -1){
        if(store.state.userType == 1){
          next('/Customer');
        }else if(store.state.userType == 6){
          next('/Admin');
        }else if(store.state.userType == 9){
          next('/Employee');
        }
      }else{
      next();
      }
    },
    component: Home
  },
  {
      path: '/About',
      name: 'Thông tin',
      beforeEnter: (to,from,next)=>{ //eslint-disable-line
        console.log(store.state.userType)
        if(store.state.userType != -1){
          if(store.state.userType == 1){
            next('/Customer');
          }else if(store.state.userType == 6){
            next('/Admin');
          }else if(store.state.userType == 9){
            next('/Employee');
          }
        }else{
        next();
        }
      },
      component: About
  },
  {
    path: '/Login',
    name: 'Đăng nhập',
    children: [{
      path: '/',
      name: 'Login',
      beforeEnter: (to,from,next)=>{ //eslint-disable-line
        console.log(store.state.userType)
        if(store.state.userType != -1){
          if(store.state.userType == 1){
            next('/Customer');
          }else if(store.state.userType == 6){
            next('/Admin');
          }else if(store.state.userType == 9){
            next('/Employee');
          }
        }else{
        next();
        }
      },
      component: RightLoginBox,
    },
    {
      path: 'ForgotPass',
      name: 'Forgot',
      beforeEnter: (to,from,next)=>{ //eslint-disable-line
        console.log(store.state.userType)
        if(store.state.userType != -1){
          if(store.state.userType == 1){
            next('/Customer');
          }else if(store.state.userType == 6){
            next('/Admin');
          }else if(store.state.userType == 9){
            next('/Employee');
          }
        }else{
        next();
        }
      },
      component: ForgotBox,
    }],
    component: Login
  },
    ...AdminRoutes,
  ...EmployeeRoutes,
...CustomerRoutes,
{ path: "*", component: PageNotFound }]
})