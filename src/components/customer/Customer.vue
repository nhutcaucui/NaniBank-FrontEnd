<template>
    <div class="customer">
        <sidebar-menu :menu="menu" @item-click="onItemClick" :collapsed= 'true'/>
        <router-view></router-view>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
    name:'Customer',
    mounted(){
        this.debtCheck();
    },
    methods: {
    onItemClick(event, item) {
        if(item.name==='logout'){
            console.log(this.$store.state.userType);
            this.$parent.emitDisconnect(this.$store.state.id);
            this.$store.commit('clearUser')
            this.$router.push("/")    
    }

    if(item.name === 'debtHandle'){
        var icon = this.$el.querySelector('.debt-handle-icon');
        if(icon == undefined){
            icon = this.$el.querySelector('.debt-handle-noti-icon');
        }
        icon.classList.add('debt-handle-icon')
        icon.classList.remove('debt-handle-noti-icon')
    }
    },
    async debtCheck(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                customer_id: self.$store.state.id,
                filter: "receiver"
                },
                }

               await axios.get(self.$store.state.host+'debt/', config).then(async response =>{
          console.log(response);
          if(response.data.Status){
              var debtCount = 0;
              for(let i =0; i<response.data.Debt.length ; i ++){
                  console.log(self.$store.state.id, response.data.Debt[i].debtor)
                if(response.data.Debt[i].description != "Paid" && response.data.Debt[i].description != "Canceled" && response.data.Debt[i].debtor == self.$store.state.id){
                    debtCount++;
                }
              }
              console.log(debtCount)
            if(debtCount > 0){                      
                var icon = this.$el.querySelector('.debt-handle-icon');
                icon.classList.remove('debt-handle-icon')
                icon.classList.add('debt-handle-noti-icon')
            }
          }
        }).catch(e =>{
          console.log(e);
        })
      }
    },
    data() {
            return {
                menu: [
                    {
                        href: '/Customer',
                        title: 'Dashboard',
                        icon: {
                            element: 'span',
                            class: 'sb-icon dashboard-icon',
                        }
                    },
                    {
                        href: '/Customer/List',
                        title: 'Danh sách tài khoản',
                        icon: {
                            element: 'span',
                            class: 'sb-icon list-icon',
                        }
                    },
                    {
                        href: '/Customer/Receiver',
                        title: 'Danh sách người nhận',
                        icon: {
                            element: 'span',
                            class: 'sb-icon edit-icon',
                        }
                    },
                    {
                        href: '/Customer/Transfer',
                        title: 'Chuyển khoản',
                        icon: {
                            element: 'span',
                            class: 'sb-icon transfer-icon',
                        }
                    },
                    {
                        href: '/Customer/DebtCreate',
                        title: 'Tạo nhắc nợ',
                        icon: {
                            element: 'span',
                            class: 'sb-icon add-icon',
                        }
                    },
                    {
                        name:'debtHandle',
                        href: '/Customer/DebtHandle',
                        title: 'Xử lí nợ',
                        icon: {
                            element: 'span',
                            class: 'sb-icon debt-handle-icon',
                        }
                    },
                    {
                        href: '/Customer/History',
                        title: 'Lịch sử giao dịch',
                        icon: {
                            element: 'span',
                            class: 'sb-icon history-icon',
                        }
                    },
                    {
                        href: '/Customer/ChangePassword',
                        title: 'Đổi mật khẩu',
                        icon: {
                            element: 'span',
                            class: 'sb-icon password-icon',
                        }
                    },
                    {
                        name:'logout',
                        title: 'Đăng xuất',
                        icon: {
                            element: 'span',
                            class: 'sb-icon logout-icon',
                        }
                    },
                ]
            }
        },
}
</script>

<style>
.customer{
    width: 100%;
    height: 100%;
    padding-left: 50px;
    box-sizing: border-box;
}
.sb-icon{
    background-repeat: no-repeat  !important;
    background-size: contain  !important;

    background-color: transparent !important;
}

.dashboard-icon{
    background: url('../../assets/dashboard.png');
}

.list-icon{
    background: url('../../assets/list.png');
}

.debt-handle-icon{
    background: url('../../assets/debt.png');
}

.debt-handle-noti-icon{
    background: url('../../assets/debt_noti.png');
}

.transfer-icon{
    background: url('../../assets/transfer.png');
}

.history-icon{
    background: url('../../assets/clock.png');
}
.logout-icon{
    background: url('../../assets/logout.png')
}

.password-icon{
    background: url('../../assets/password.png')
}

@import '../../style/side-bar.css';
</style>