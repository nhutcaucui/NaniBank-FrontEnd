<template>
    <div class="employee-history">

    <router-view></router-view>

    <div class="filter-box" id="employee-history-box">
    <label>Chọn loại lịch sử</label><br/>
    <form v-on:submit.prevent="onSubmit"> 
        <input placeholder="Mã hoặc tên tài khoản"  id="usernamecode" name ="usernamecode" class="text-input"/>
        <select name="bank" id="bank-select" class="text-input" v-model="selected">
  <option value="1">Giao dịch chuyển tiền</option>
  <option value="2">Giao dịch nhận tiền</option>
  <option value="3">Giao dịch thanh toán nợ</option>
</select>
    <br/>
    <button class="submit-button" id="submit-filter" v-on:click="loadTable()">Lọc</button>
    </form>
    </div>
    <b-popover target="employee-history-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
    </div>
</template>
<script>
export default {
    name:'EmployeeHistory',
    methods: {
        loadTable: function(){
            console.log('help   ')
            if(this.selected === '1'){
                this.$router.push("/Employee/History")
                this.$router.push("/Employee/History/Send")
            }
            else if(this.selected === '2'){
                this.$router.push("/Employee/History")
                this.$router.push("/Employee/History/Receive")
            }
            else if(this.selected === '3'){
                this.$router.push("/Employee/History")
                this.$router.push("/Employee/History/Debt")
            }
        },
        onSubmit(){

        }
    },
    data(){
        return{
            selected : '1',
        }
    },
    
}
</script>

<style>
.employee-history{
    display: flex;
    justify-content: center;
    justify-items: center;
}
</style>