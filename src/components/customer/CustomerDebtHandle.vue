<template>
    <div class='customer-debt-handle'>
<DebtTableReceived/>
<div class="add-box" id = "add-box">
    <label>Thanh toán nợ</label><br/>
    <form>
    <input placeholder="Tài khoản người nợ"  id="id" name ="id" disabled/>
    <input placeholder="Người nợ"  id="name" name ="name" disabled/>
    <input placeholder="Số tiền"  id="amount" name ="amount" disabled/>

    <br/>
    <button class="submit-button" id="submit-add">Thanh toán</button>
    </form>
</div>

    <b-popover target="add-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
      <div id="error-popover"></div>
    </div>

</template>

<script>
import DebtTableReceived from './DebtTableReceived'
export default {
    name:'CustomerDebtHandle',
    components:{
        DebtTableReceived
    }
}
</script>

<style scoped>
.add-box{
    height: unset;
    padding-bottom: 15px;
}
</style>