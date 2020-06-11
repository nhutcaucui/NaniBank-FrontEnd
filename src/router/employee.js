import Employee from '@/components/employee/Employee'
import EmployeeDashboard from '@/components/employee/EmployeeDashboard'
import EmployeeAdd from '@/components/employee/EmployeeAdd'
import EmployeeRecharge from '@/components/employee/EmployeeRecharge'
import EmployeeHistory from '@/components/employee/EmployeeHistory'
import SendTable from '@/components/employee/SendTable'
import ReceiveTable from '@/components/employee/ReceiveTable'
import DebtTable from '@/components/employee/DebtTable'

export default[
    {
        path: '/Employee',
        name: 'Employee',
        children: [{
          path: '/',
          name: 'Dashboard',
          component: EmployeeDashboard,
        },
        {
          path: 'Add',
          name: 'Add',
          component: EmployeeAdd,
        },
        {
          path: 'Recharge',
          name: 'Recharge',
          component: EmployeeRecharge,
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
          component: EmployeeHistory,
        }],
        component: Employee
      }]