import Admin from '@/components/admin/Admin'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import AdminAdd from '@/components/admin/AdminAdd'
import TransactionHistory from '@/components/admin/TransactionHistory'
import store from '../store/store'

export default[
    {
        path: '/Admin',
        name: 'Admin',
        beforeEnter: (to,from,next)=>{ //eslint-disable-line
          console.log(store.state.userType)
          if(store.state.userType != 6){
            if(store.state.userType == 1){
              next('/Customer');
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
          path: '/',
          name: 'Dashboard',
          beforeEnter: (to,from,next)=>{ //eslint-disable-line
            console.log(store.state.userType)
            if(store.state.userType != 6){
              if(store.state.userType == 1){
                next('/Customer');
              }else if(store.state.userType == -1){
                next('/');
              }else if(store.state.userType == 9){
                next('/Employee');
              }
            }else{
            next();
            }
          },
          component: AdminDashboard,
        },
        {
          path: 'Add',
          name: 'Add',
          beforeEnter: (to,from,next)=>{ //eslint-disable-line
            console.log(store.state.userType)
            if(store.state.userType != 6){
              if(store.state.userType == 1){
                next('/Customer');
              }else if(store.state.userType == -1){
                next('/');
              }else if(store.state.userType == 9){
                next('/Employee');
              }
            }else{
            next();
            }
          },
          component: AdminAdd,
        },
        {
          path: 'History',
          name: 'History',
          beforeEnter: (to,from,next)=>{ //eslint-disable-line
            console.log(store.state.userType)
            if(store.state.userType != 6){
              if(store.state.userType == 1){
                next('/Customer');
              }else if(store.state.userType == -1){
                next('/');
              }else if(store.state.userType == 9){
                next('/Employee');
              }
            }else{
            next();
            }
          },
          component: TransactionHistory,
        }],
        component: Admin
      }]