import Admin from '@/components/admin/Admin'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import AdminAdd from '@/components/admin/AdminAdd'
import AdminEdit from '@/components/admin/AdminEdit'
import AdminDelete from '@/components/admin/AdminDelete'
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
      }]