<template>
    <div class='customer-receiver'>
<ReceiverTable/>
    <div class="add-box" id = "receiver-box">
    <label>Thêm người nhận</label><br/>
    <form>
    <input placeholder="Số tài khoản"  id="id" name ="id"/>
    <input placeholder="Tên gợi nhớ"  id="name" name ="name"/>
    <br/>
    <button class="submit-button" id="submit-add">Thêm</button>
    </form>
</div>

    <b-popover target="receiver-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import ReceiverTable from'./ReceiverTable'
export default {
    name:'CustomerReceiver',
    components:{
        ReceiverTable
    }
}
</script>

<style>

</style>