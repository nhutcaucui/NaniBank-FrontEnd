<template>
    <div class="admin">
        <sidebar-menu :menu="menu" @item-click="onItemClick" :collapsed= 'true'/>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name:'Admin',
    methods: {
    onItemClick(event, item) {
        if(item.name==='logout'){
            console.log("Hey, listen");
        this.$router.push("/")
    }
    }
    },
    data() {
            return {
                menu: [
                    {
                        href: '/Admin',
                        title: 'Dashboard',
                        icon: {
                            element: 'span',
                            class: 'sb-icon dashboard-icon',
                        }
                    },
                    {
                        href: '/Admin/Add',
                        title: 'Thêm giao dịch viên',
                        icon: {
                            element: 'span',
                            class: 'sb-icon add-icon',
                        }
                    },
                    {
                        href: '/Admin/Edit',
                        title: 'Chỉnh sửa giao dịch viên',
                        icon: {
                            element: 'span',
                            class: 'sb-icon edit-icon',
                        }
                    },
                    {
                        href: '/Admin/Delete',
                        title: 'Xóa giao dịch viên',
                        icon: {
                            element: 'span',
                            class: 'sb-icon del-icon',
                        }
                    },
                    {
                        href: '/Admin/History',
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
.admin{
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

.add-icon{
    background: url('../../assets/add.png');
}

.edit-icon{
    background: url('../../assets/pencil.png');
}

.del-icon{
    background: url('../../assets/delete.png');
}

.history-icon{
    background: url('../../assets/clock.png');
}
.logout-icon{
    background: url('../../assets/logout.png')
}

@import '../../style/side-bar.css';
</style>