import Customer from '@/components/customer/Customer'
import CustomerDashboard from '@/components/customer/CustomerDashboard'
import CustomerChangePassword from '@/components/customer/CustomerChangePassword'
import CustomerDebtCreate from '@/components/customer/CustomerDebtCreate'
import CustomerDebtHandle from '@/components/customer/CustomerDebtHandle'
import CustomerHistory from '@/components/customer/CustomerHistory'
import CustomerList from '@/components/customer/CustomerList'
import CustomerReceiver from '@/components/customer/CustomerReceiver'
import CustomerTransfer from '@/components/customer/CustomerTransfer'
import SendTable from '@/components/customer/SendTable'
import ReceiveTable from '@/components/customer/ReceiveTable'
import DebtTable from '@/components/customer/DebtTable'

export default[
    {
        path: '/Customer',
        name: 'Customer',
        children: [{
            path: 'ChangePassword',
            name: 'ChangePassword',
            component: CustomerChangePassword,
          },
          {
            path: 'DebtCreate',
            name: 'DebtCreate',
            component: CustomerDebtCreate,
          },
          {
            path: 'DebtHandle',
            name: 'DebtHandle',
            component: CustomerDebtHandle,
          },
          {
            path: 'History',
            name: 'History',
            children:[{
              path: 'Send',
              name: 'Send',
              component: SendTable,
            },
            {
              path: 'Receive',
              name: 'Receive',
              component: ReceiveTable,
            },
            {
              path: 'Debt',
              name: 'Debt',
              component: DebtTable,
            }],
            component: CustomerHistory,
          },
          {
            path: 'List',
            name: 'List',
            component: CustomerList,
          },
          {
            path: 'Receiver',
            name: 'Receiver',
            component: CustomerReceiver,
          },
          {
            path: '/',
            name: 'Dashboard',
            component: CustomerDashboard,
          },
          {
            path: 'Transfer',
            name: 'Transfer',
            component: CustomerTransfer,
          },
        ],
        component: Customer
      }]