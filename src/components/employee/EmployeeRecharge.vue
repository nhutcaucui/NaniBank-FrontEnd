<template>
    <div class="employee-recharge">
        <div class="container-box" id="recharge-container">
            <label>Nạp tiền vào tài khoản</label>
            <form v-on:submit.prevent="onSubmit">
            <input placeholder="Mã hoặc tên tài khoản"  id="usernamecode" name ="usernamecode" v-model="id"/>
            <input placeholder="Số tiền"  id="amount" name ="amount" v-model="amount"/>
            <button class="submit-button" id="submit-add">Nạp</button>
            </form>
        </div>

        <b-popover :show.sync="showPop" target="recharge-container" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showPopPositive" target="recharge-container" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã nạp tiền vào tài khoản</label>
      </b-popover>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name:'EmployeeRecharge',
    data(){
        return{
            id: '',
            amount:'',
            showPop: false,
            showPopPositive: false,
            errorMessage:'',
            
        }
    },
    methods:{
        onSubmit(){
            var isError = false;
            if(this.id == ''){
        this.errorMessage = 'Xin nhập tài khoản'
        isError = true;
      }else if(this.amount == ''){
        this.errorMessage = 'Xin nhập số tiền'
        isError = true;
      }else if(!/^\d+$/.test(this.amount)){
        this.errorMessage = 'Số tiền không hợp lệ'
        isError = true;
        }

        if(isError){
            this.showPopover();
        }else{
            var self = this;
        axios.post('http://35.240.195.17/users/admin/create',{
          id: self.id,
          amount: self.amount,
        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
              self.id= ''
              self.amount= ''
              self.showPopoverPositive();
          }else{
            //todo
          }
        }).catch(e =>{
          console.log(e);
        })
        }
        },
        hidePopover(){
      this.showPop = false;
      console.log("hide")
    },
    showPopover(){
      this.showPop = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopover(), 3000);
    },
    hidePopoverPositive(){
      this.showPopPositive = false;
      console.log("hide")
    },
    showPopoverPositive(){
      this.showPopPositive = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopoverPositive(), 3000);
    }
    }
}
</script>

<style>

</style>