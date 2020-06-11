<template>
    <div class="employee-recharge">
        <div class="container-box" id="recharge-container">
            <label>Nạp tiền vào tài khoản</label>
            <form>
            <input placeholder="Mã hoặc tên tài khoản"  id="usernamecode" name ="usernamecode"/>
            <input placeholder="Số tiền"  id="amount" name ="amount"/>
            <button class="submit-button" id="submit-add">Nạp</button>
            </form>
        </div>

        <b-popover target="recharge-container" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
    </div>
</template>
<script>
export default {
    name:'EmployeeRecharge'
}
</script>

<style>

</style>