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
import RightLoginBox from '@/components/RightLoginBox'
import ForgotBox from '@/components/ForgotBox'

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
    {
      path: '/Admin',
      name: 'Admin',
      children: [{
        path: '/',
        name: 'Dashboard',
        component: AdminDashboard,
      },
      {
        path: 'Add',
        name: 'Add',
        component: AdminAdd,
      },
      {
        path: 'Edit',
        name: 'Edit',
        component: AdminEdit,
      },
      {
        path: 'Delete',
        name: 'Delete',
        component: AdminDelete,
      },
      {
        path: 'History',
        name: 'History',
        component: TransactionHistory,
      }],
      component: Admin
    }
  ]
})