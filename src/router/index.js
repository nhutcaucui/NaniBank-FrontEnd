
import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Home from '@/components/Home'
import Login from '@/components/Login' // this is the import line to add

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      component: Login
  }
  ]
})