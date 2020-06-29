import Admin from '@/components/admin/Admin'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import AdminAdd from '@/components/admin/AdminAdd'
import TransactionHistory from '@/components/admin/TransactionHistory'

export default[
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
          path: 'History',
          name: 'History',
          component: TransactionHistory,
        }],
        component: Admin
      }]