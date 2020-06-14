<template>
    <div class='customer-history'>
        <router-view></router-view>

    <div class="filter-box" id="employee-history-box">
    <label>Chọn loại lịch sử</label><br/>
    <form v-on:submit.prevent="onSubmit"> 
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
    name:'CustomerHistory',
    methods: {
        loadTable: function(){
            console.log('help   ')
            if(this.selected === '1'){
                if(self.$route.path != '/Customer/History/Send'){
                    self.$router.push({name:"CustomerSend"})
                    }else{
                        self.$router.push("/Customer/History").then(() =>
                            {
                                self.$router.push({name:"CustomerSend"
                                })})
                        
                    }
            }
            else if(this.selected === '2'){
                if(self.$route.path != '/Customer/History/Receive'){
                    self.$router.push({name:"CustomerReceive"})
                    }else{
                        self.$router.push("/Customer/History").then(() =>
                            {
                                self.$router.push({name:"CustomerReceive"
                                })})
                        
                    }
            }
            else if(this.selected === '3'){
                if(self.$route.path != '/Customer/History/Debt'){
                    self.$router.push({name:"CustomerDebt"})
                    }else{
                        self.$router.push("/Customer/History").then(() =>
                            {
                                self.$router.push({name:"CustomerDebt"
                                })})
                        
                    }
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
.customer-history{
    display: flex;
    justify-items: center;
    justify-content: center;
}
</style>