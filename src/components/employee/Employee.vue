<template>
    <div class="employee">
        <sidebar-menu :menu="menu" @item-click="onItemClick" :collapsed= 'true'/>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'Employee',
    methods: {
    onItemClick(event, item) {
        if(item.name==='logout'){
            console.log(this.$store.state.userType);
            this.$store.commit('clearUser')
            this.$router.push("/")
        }
    }
    },
    data() {
            return {
                menu: [
                    {
                        href: '/Employee',
                        title: 'Dashboard',
                        icon: {
                            element: 'span',
                            class: 'sb-icon dashboard-icon',
                        }
                    },
                    {
                        href: '/Employee/Add',
                        title: 'Tạo tài khoản khách hàng',
                        icon: {
                            element: 'span',
                            class: 'sb-icon add-icon',
                        }
                    },
                    {
                        href: '/Employee/Recharge',
                        title: 'Nạp tiền',
                        icon: {
                            element: 'span',
                            class: 'sb-icon money-icon',
                        }
                    },
                    {
                        href: '/Employee/History',
                        title: 'Lịch sử giao dịch',
                        icon: {
                            element: 'span',
                            class: 'sb-icon history-icon',
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
.employee{
    width: 100%;
    height: 100%;
    padding-left: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    justify-items: center;
}
.sb-icon{
    background-repeat: no-repeat  !important;
    background-size: contain  !important;

    background-color: transparent !important;
}

.dashboard-icon{
    background: url('../../assets/dashboard.png');
}

.add-icon{
    background: url('../../assets/add.png');
}

.money-icon{
    background: url('../../assets/money.png');
}

.history-icon{
    background: url('../../assets/clock.png');
}
.logout-icon{
    background: url('../../assets/logout.png')
}

@import '../../style/side-bar.css';
</style>