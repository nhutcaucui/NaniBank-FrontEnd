import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Home from '@/components/Home'
import Login from '@/components/Login' // this is the import line to add
import Admin from '@/components/Admin'
import AdminDashboard from '@/components/AdminDashboard.vue'

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
    },
    {
      path: '/Admin',
      name: 'Admin',
      children: [{
        path: 'Dashboard',
        name: 'Dashboard',
        component: AdminDashboard,
      },
      {
        path: 'Add',
        name: 'Dashboard',
        component: About,
      },
      {
        path: 'Edit',
        name: 'Dashboard',
        component: About,
      },
      {
        path: 'Delete',
        name: 'Dashboard',
        component: About,
      },
      {
        path: 'History',
        name: 'Dashboard',
        component: About,
      }],
      component: Admin
    }
  ]
})