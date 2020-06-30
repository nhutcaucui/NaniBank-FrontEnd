import Employee from '@/components/employee/Employee'
import EmployeeDashboard from '@/components/employee/EmployeeDashboard'
import EmployeeAdd from '@/components/employee/EmployeeAdd'
import EmployeeRecharge from '@/components/employee/EmployeeRecharge'
import EmployeeHistory from '@/components/employee/EmployeeHistory'
import SendTable from '@/components/employee/SendTable'
import ReceiveTable from '@/components/employee/ReceiveTable'
import DebtTable from '@/components/employee/DebtTable'
import store from '../store/store'

export default[
    {
        path: '/Employee',
        name: 'Employee',
        beforeEnter: (to,from,next)=>{ //eslint-disable-line
          console.log(store.state.userType)
          if(store.state.userType != 9){
            if(store.state.userType == 6){
              next('/Admin');
            }else if(store.state.userType == -1){
              next('/');
            }else if(store.state.userType == 1){
              next('/Customer');
            }
          }else{
          next();
          }
        },
        children: [{
          path: '/',
          name: 'Dashboard',
          beforeEnter: (to,from,next)=>{ //eslint-disable-line
            console.log(store.state.userType)
            if(store.state.userType != 9){
              if(store.state.userType == 6){
                next('/Admin');
              }else if(store.state.userType == -1){
                next('/');
              }else if(store.state.userType == 1){
                next('/Customer');
              }
            }else{
            next();
            }
          },
          component: EmployeeDashboard,
        },
        {
          path: 'Add',
          name: 'Add',
          beforeEnter: (to,from,next)=>{ //eslint-disable-line
            console.log(store.state.userType)
            if(store.state.userType != 9){
              if(store.state.userType == 6){
                next('/Admin');
              }else if(store.state.userType == -1){
                next('/');
              }else if(store.state.userType == 1){
                next('/Customer');
              }
            }else{
            next();
            }
          },
          component: EmployeeAdd,
        },
        {
          path: 'Recharge',
          name: 'Recharge',
          beforeEnter: (to,from,next)=>{ //eslint-disable-line
            console.log(store.state.userType)
            if(store.state.userType != 9){
              if(store.state.userType == 6){
                next('/Admin');
              }else if(store.state.userType == -1){
                next('/');
              }else if(store.state.userType == 1){
                next('/Customer');
              }
            }else{
            next();
            }
          },
          component: EmployeeRecharge,
        },
        {
          path: 'History',
          name: 'History',
          beforeEnter: (to,from,next)=>{ //eslint-disable-line
            console.log(store.state.userType)
            if(store.state.userType != 9){
              if(store.state.userType == 6){
                next('/Admin');
              }else if(store.state.userType == -1){
                next('/');
              }else if(store.state.userType == 1){
                next('/Customer');
              }
            }else{
            next();
            }
          },
          children:[{
            path: 'Send',
            name: 'EmployeeSend',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 9){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 1){
                  next('/Customer');
                }
              }else{
              next();
              }
            },
            component: SendTable,
            props:true
          },
          {
            path: 'Receive',
            name: 'EmployeeReceive',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 9){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 1){
                  next('/Customer');
                }
              }else{
              next();
              }
            },
            component: ReceiveTable,
            props:true
          },
          {
            path: 'Debt',
            name: 'EmployeeDebt',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 9){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 1){
                  next('/Customer');
                }
              }else{
              next();
              }
            },
            component: DebtTable,
            props:true
          }],
          component: EmployeeHistory,
        }],
        component: Employee
      }]