<template>
    <div class="dashboard">
<div class="dashboard-container">
            <router-link to="Customer/List" class="dashboard-item">
                <span class="item-icon sb-icon list-icon"></span><br/>
                Danh sách tài khoản
            </router-link>
            <router-link to="Customer/Receiver" class="dashboard-item">
                <span class="item-icon sb-icon edit-icon"></span><br/>
                Danh sách người nhận
            </router-link>
            <router-link to="Customer/Transfer" class="dashboard-item">
                <span class="item-icon sb-icon transfer-icon"></span><br/>
                Chuyển khoản
            </router-link>
            <router-link to="Customer/DebtCreate" class="dashboard-item">
                <span class="item-icon sb-icon add-icon"></span><br/>
                Tạo nhắc nợ
            </router-link>
            <router-link to="Customer/DebtHandle" class="dashboard-item">
                <span class="item-icon sb-icon debt-handle-icon"></span><br/>
                Xử lí nợ
            </router-link>
            <router-link to="Customer/History" class="dashboard-item">
                <span class="item-icon sb-icon history-icon"></span><br/>
                Lịch sử giao dịch
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomerDashboard',
}
</script>

<style scoped>
.dashboard-item{
    display: block;
    float: left;
    text-align: center;
    height: 130px;
    width: 130px;
    color: black;
    font-size: 20px;
    text-decoration: none;
    border-radius: 15px;
    box-shadow: 2px 2px rgba(0,0,0,0.3);
    padding: 25px;
    border: 1px solid rgba(0,0,0,0.3);
    margin-top: 20px;
    margin-right: 20px;
    box-sizing: unset;
}

.dashboard-item:hover{
color: black;
text-decoration: none;
}

.dashboard-container{
    padding-top: 150px;
    height: 100%;
    padding-left: 50px;
}

.item-icon{
    margin: 0 auto;
    display: block;
    height: 64px;
    width: 64px;
}
</style>