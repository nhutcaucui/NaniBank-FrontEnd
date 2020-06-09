import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Home from '@/components/Home'
import Login from '@/components/Login' // this is the import line to add
import Admin from '@/components/Admin'
import AdminDashboard from '@/components/AdminDashboard.vue'
import AdminAdd from '@/components/AdminAdd'
import AdminEdit from '@/components/AdminEdit'
import AdminDelete from '@/components/AdminDelete'
import TransactionHistory from '@/components/TransactionHistory'

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
        component: AdminAdd,
      },
      {
        path: 'Edit',
        name: 'Dashboard',
        component: AdminEdit,
      },
      {
        path: 'Delete',
        name: 'Dashboard',
        component: AdminDelete,
      },
      {
        path: 'History',
        name: 'Dashboard',
        component: TransactionHistory,
      }],
      component: Admin
    }
  ]
})