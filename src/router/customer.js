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
import store from '../store/store'

export default[
    {
        path: '/Customer',
        name: 'Customer',
        beforeEnter: (to,from,next)=>{ //eslint-disable-line
          console.log(store.state.userType)
          if(store.state.userType != 1){
            if(store.state.userType == 6){
              next('/Admin');
            }else if(store.state.userType == -1){
              next('/');
            }else if(store.state.userType == 9){
              next('/Employee');
            }
          }else{
          next();
          }
        },
        children: [{
            path: 'ChangePassword',
            name: 'ChangePassword',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            component: CustomerChangePassword,
          },
          {
            path: 'DebtCreate',
            name: 'DebtCreate',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            component: CustomerDebtCreate,
          },
          {
            path: 'DebtHandle',
            name: 'DebtHandle',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            component: CustomerDebtHandle,
          },
          {
            path: 'History',
            name: 'History',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            children:[{
              path: 'Send',
              name: 'CustomerSend',
              beforeEnter: (to,from,next)=>{ //eslint-disable-line
                console.log(store.state.userType)
                if(store.state.userType != 1){
                  if(store.state.userType == 6){
                    next('/Admin');
                  }else if(store.state.userType == -1){
                    next('/');
                  }else if(store.state.userType == 9){
                    next('/Employee');
                  }
                }else{
                next();
                }
              },
              component: SendTable,
            },
            {
              path: 'Receive',
              name: 'CustomerReceive',
              beforeEnter: (to,from,next)=>{ //eslint-disable-line
                console.log(store.state.userType)
                if(store.state.userType != 1){
                  if(store.state.userType == 6){
                    next('/Admin');
                  }else if(store.state.userType == -1){
                    next('/');
                  }else if(store.state.userType == 9){
                    next('/Employee');
                  }
                }else{
                next();
                }
              },
              component: ReceiveTable,
            },
            {
              path: 'Debt',
              name: 'CustomerDebt',
              beforeEnter: (to,from,next)=>{ //eslint-disable-line
                console.log(store.state.userType)
                if(store.state.userType != 1){
                  if(store.state.userType == 6){
                    next('/Admin');
                  }else if(store.state.userType == -1){
                    next('/');
                  }else if(store.state.userType == 9){
                    next('/Employee');
                  }
                }else{
                next();
                }
              },
              component: DebtTable,
            }],
            component: CustomerHistory,
          },
          {
            path: 'List',
            name: 'List',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            component: CustomerList,
          },
          {
            path: 'Receiver',
            name: 'Receiver',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            component: CustomerReceiver,
          },
          {
            path: '/',
            name: 'Dashboard',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            component: CustomerDashboard,
          },
          {
            path: 'Transfer',
            name: 'Transfer',
            beforeEnter: (to,from,next)=>{ //eslint-disable-line
              console.log(store.state.userType)
              if(store.state.userType != 1){
                if(store.state.userType == 6){
                  next('/Admin');
                }else if(store.state.userType == -1){
                  next('/');
                }else if(store.state.userType == 9){
                  next('/Employee');
                }
              }else{
              next();
              }
            },
            component: CustomerTransfer,
          },
        ],
        component: Customer
      }]