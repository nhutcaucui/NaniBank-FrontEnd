<template>
    <div class="dashboard">
<div class="dashboard-container">
            <a href="#" class="dashboard-item">
                <span class="item-icon sb-icon add-icon"></span><br/>
                Thêm giao dịch viên
            </a>
            <a href="#" class="dashboard-item">
                <span class="item-icon sb-icon edit-icon"></span><br/>
                Cập nhật giao dịch viên
            </a>
            <a href="#" class="dashboard-item">
                <span class="item-icon sb-icon del-icon"></span><br/>
                Xóa giao dịch viên
            </a>
            <a href="#" class="dashboard-item">
                <span class="item-icon sb-icon history-icon"></span><br/>
                Lịch sử giao dịch
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminDashboard',
}
</script>

<style>
.dashboard-item{
    display: inline-block;
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
}

.dashboard-container{
    margin-top: 150px;
    height: 100%;
}

.item-icon{
    margin: 0 auto;
    display: block;
    height: 64px;
    width: 64px;
}
</style>