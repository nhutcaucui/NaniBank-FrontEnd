<template>
    <div class='customer-change-pass'>
        <div class="container-box" id="change-pass-container">
            <label>Nạp tiền vào tài khoản</label>
            <form>
            <input placeholder="Mật khẩu cũ" type="password"  id="oldpass" name ="oldpass"/>
            <input placeholder="Mật khẩu mới" type="password"  id="newpass" name ="newpass"/>
            <input placeholder="Xác nhận mật khẩu mới" type="password"  id="cfnewpass" name ="cfnewpass"/>
            <button class="submit-button" id="submit-change-pass">Đổi mật khẩu</button>
            </form>
        </div>

        <b-popover target="change-pass-container" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
    </div>
</template>

<script>
export default {
    name:'CustomerChangePassword',
}
</script>

<style>
.customer-change-pass{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>