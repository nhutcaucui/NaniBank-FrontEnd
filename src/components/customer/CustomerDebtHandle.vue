<template>
    <div class='customer-debt-handle'>
<DebtTableReceived @rowClick="rowClick" ref="debtoTable"/>
<div class="add-box" id="add-box">
    <label>Thanh toán nợ</label><br/>
    <form v-on:submit.prevent="onSubmit">
    <input placeholder="Tài khoản người nợ"  id="id" name ="id" disabled v-model="id"/>
    <input placeholder="Người nợ"  id="name" name ="name" disabled v-model="name"/>
    <input placeholder="Số tiền"  id="amount" name ="amount" disabled v-model="amount"/>
    <input placeholder="Nội dung"  id="note" name ="note" disabled v-model="note"/>
    <br/>
    <button class="submit-button" id="submit-add">Thanh toán</button>
    </form>
</div>

    <b-popover :show.sync="showPop" target="add-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showPopPositive" target="add-box" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã thanh toán nợ</label>
      </b-popover>
      <div id="error-popover"></div>

      <b-modal id="otp-modal" title="Kiểm tra Email để nhận OTP" @ok="onOTPCheck()">
      <textarea style="width: 100%" placeholder="OTP" v-model="OTP"/>
  </b-modal>
    </div>
    

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import DebtTableReceived from './DebtTableReceived'
export default {
    name:'CustomerDebtHandle',
    components:{
        DebtTableReceived
    },
    data(){
        return{
            id:'',
            name:'',
            amount:'',
            note:'',
            OTP:'',
            key:'',
            index: -1,
            showPop: false,
            showPopPositive:false,
            errorMessage:''
        }
    },
    methods:{
        onSubmit(){
            if(this.index == -1){
                this.errorMessage = "Xin chọn nợ từ bảng"
                this.showPopover();
            }
            else{
                      var self = this;
                let config= {params:{
                    username: self.$store.state.username
                },headers:{
                timestamp: moment().format("X"),
                }}

                axios.get(self.$store.state.host+'otp/s-create',config).then(response =>{
                console.log(response);
                if(response.data.Status){
                  self.key = response.data.Key
              this.$bvModal.show("otp-modal");
                }else{
                    self.errorMessage = 'Có lỗi khi gửi OTP'
                    self.showPopover();
                }
                }).catch(e =>{
                console.log(e);
                })
        
            }
        },
        onOTPCheck(){
let data = {
                    
                    id: self.id,
          // name: self.name,
          // amount:self.amount,
          // message:self.note
        }
        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': this.$store.state.accessToken,
          OTP: self.OTP,
          key: self.key
        }}
                axios.post(self.$store.state.host+'debt/pay',data, config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.id = "";
            self.name='';
            self.amount='';
            self.note='';
            self.showPopoverPositive(); 
          }else{
            self.errorMessage = ''
            self.showPopover();
          }
        }).catch(e =>{
          console.log(e);
        })
        },
      rowClick(record,index){
        var self = this;
        self.id = record.id;
        self.name = record.name;
        self.amount = record.amount;
        self.note = record.note;
        self.index = index
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
.add-box{
    height: unset;
    padding-bottom: 15px;
}
</style>