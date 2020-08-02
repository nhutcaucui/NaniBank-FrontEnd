<template>
    <div class="employee-recharge">
        <div class="container-box" id="recharge-container">
            <label>Nạp tiền vào tài khoản</label>
            <form v-on:submit.prevent="onSubmit">
              <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/user.png"/></div>
            <input placeholder="Mã tài khoản"  id="usernamecode" name ="usernamecode" v-model="id"/>
              </div>
              <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/money.png"/></div>
            <input placeholder="Số tiền"  id="amount" name ="amount" v-model="amount"/>
              </div>
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
       async onSubmit(){
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
            let data={
          id: self.id,
          amount: self.amount,
        }
        let config={headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
        }}
       await axios.post(self.$store.state.host+'transaction/charge',data, config).then(response =>{
          console.log(response);
          if(response.data.Status){
              self.id= ''
              self.amount= ''
              self.showPopoverPositive();
          }else{
            self.errorMessage = 'Tài khoản không tồn tại'
            self.showPopover();
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

<style scoped>
.img-holder{
  margin-top: 15px;
  width: 40px;
}
.container-box{
  width: 350px;
}
</style>