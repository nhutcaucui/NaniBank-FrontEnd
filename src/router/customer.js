import Customer from '@/components/customer/Customer'
import CustomerDashboard from '@/components/customer/CustomerDashboard'


export default[
    {
        path: '/Customer',
        name: 'Customer',
        children: [{
            path: '/',
            name: 'Dashboard',
            component: CustomerDashboard,
          },
        ],
        component: Customer
      }]