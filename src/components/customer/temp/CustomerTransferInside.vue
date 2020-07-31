<template>
      <div class='customer-transfer'>
<div class="container-box" id ="container-box-left">
            <label>Chuyển khoản nội bộ</label>
            <form @submit.prevent="onSubmitIn">
            <select placeholder="Tài khoản nguồn"  id="source" name ="source" class="text-input" v-model="inAccount">
                <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value"> 
    {{ option.text }}
  </option>
            </select>
            
            <div class="autosuggest-container">
      <vue-autosuggest
        v-model="inQuery"
        :suggestions="filteredOptionsIn"
        @focus="focusMeIn"
        @click="clickHandlerIn"
        @input="onInputChangeIn"
        @selected="onSelectedIn"
        :get-suggestion-value="getSuggestionValueIn"
        :input-props="{id:'autosuggest__input', placeholder:'Tài khoản chuyển đến'}">
        <div slot-scope="{suggestion}" style="{padding: '0'}" class="auto-suggest-container">
          <div style="{ display: 'flex', color: 'white'}">{{suggestion.item.name}}</div>
          <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.id}}</div>
        </div>
      </vue-autosuggest>
    </div>

            <input placeholder="Tên"  id="name" name ="name" disabled v-model="inName"/>
            <input placeholder="Số điện thoại"  id="phone" name ="phone" disabled v-model="inPhone"/>
            <input placeholder="Email"  id="email" name ="email" disabled v-model="inEmail"/>
            <input placeholder="Số tiền"  id="amount" name ="amount" v-model="inAmount"/>
            <input placeholder="Nội dung chuyển"  id="note" name ="note" v-model="inNote"/>
            <select placeholder="Thanh toán"  id="fee" name ="fee" class="text-input" v-model="inFee">
                <option value="-1">- Người thanh toán -</option>
                <option value="1">Người gửi thanh toán</option>
                <option value="2">Người nhận thanh toán</option>
            </select>
            <button class="submit-button" id="submit-transfer-in">Chuyển tiền</button>
            </form>
        </div>

        <b-popover :show.sync="showInPop" target="container-box-left" triggers="manual" placement="left" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showInPopPos" target="container-box-left" triggers="manual" placement="left" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã chuyển khoản</label><br/>
            <label>Tài khoản còn: {{accountBalance}}</label><br/>
            <label>{{fee}}</label>
      </b-popover>
            <b-modal id="in-otp-modal" title="Kiểm tra Email để nhận OTP" @ok="checkOTPin()">
      <textarea style="width: 100%" placeholder="OTP" v-model="OTPin"/>
  </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import formatCurrency from 'format-currency'
import { VueAutosuggest } from 'vue-autosuggest';
export default {
    name:'CustomerTransferInside',
    components:{
        VueAutosuggest
    },
    mounted(){
      this.loadReceiver();
      this.loadDebit();
    },
    data() {
    return {
      inQuery: "",
      inSelected: "",
      inAccount:-1,
      inName:'',
      inPhone:'',
      inEmail:'',
      inFee:-1,
      inAmount:'',
      inNote:'',
      OTPin:'',
      keyIn:'',
      transferId:0,
      fee:'',
      accountBalance:'',
      inSuggestions: [
        {
          data: [
            // { id: 1, name: "Frodo", race: "Hobbit" },
            // { id: 2, name: "Samwise", race: "Hobbit"},
            // { id: 3, name: "Gandalf", race: "Maia"},
            // { id: 4, name: "Aragorn", race: "Human"}
          ]
        }
      ],
      showInPop:false,
      showInPopPos:false,
      errorMessage:'',
      typingTimerIn:'',
      doneTypingInterval: 3000,
      idValidIn:false,
      options:[],
    };
  },
  computed: {
    filteredOptionsIn() {
      return [
        { 
          data: this.inSuggestions[0].data.filter(option => {
            return option.name.toLowerCase().indexOf(this.inQuery.toString().toLowerCase()) > -1;
          })
        }
      ];
    },
  },
  methods: {
   async loadDebit(){
      var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                owner: self.$store.state.id,
                },
                }

               await axios.get(self.$store.state.host+'debit/', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.options = []
            self.options.push({text: "- Chọn tài khoản thanh toán -", value:-1})
            self.options.push({text: response.data.Debit.id, value: response.data.Debit.id})
          }
        }).catch(e =>{
          console.log(e);
        })
    },
     async loadReceiver(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                customer_id: self.$store.state.id,
                },
                }

               await axios.get(self.$store.state.host+'users/customer/receiver', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.inSuggestions[0].data = []
            for (var i =0; i < response.data.Receiver.length ; i++){
                self.inSuggestions[0].data.push({id:response.data.Receiver[i].receiver, name: response.data.Receiver[i].remind_name})            }
          }
        }).catch(e =>{
          console.log(e);
        })
    },
    async onSubmitIn(){
        var isError = false;
        if(this.inAccount === -1){
          this.errorMessage='Xin chọn tài khoản nguồn'
          isError = true;
        }
      else if(!this.idValidIn){
          this.errorMessage='Xin nhập số tài khoản đúng'
          isError = true;
      }else if(this.inQuery == this.inAccount){
          this.errorMessage='Không thể chuyển tiền cho chính mình'
          isError = true;
      }else if(this.inAmount == ''){
          this.errorMessage='Xin nhập số tiền'
           isError = true;
      }else if(!/^\d+$/.test(this.inAmount)){
        this.errorMessage = 'Số tiền không hợp lệ'
        isError = true;
      }else if(this.inAmount < 10000){
        this.errorMessage = 'Số tiền quá ít'
        isError = true;
      }else if(this.inNote == ''){
          this.errorMessage='Xin nhập nội dung chuyển'
           isError = true;
      }else if(this.inFee === -1){
          this.errorMessage='Xin chọn cách thanh toán'
          isError = true;
      }

      if(isError){
        this.showPopoverIn();
      }else{
        var self = this;
                let config= {params:{
                    customer_id: self.$store.state.id
                },headers:{
                timestamp: moment().format("X"),
                'access-token': self.$store.state.accessToken,
                }}

               await axios.get(self.$store.state.host+'otp/create',config).then(response =>{
                console.log(response);
                if(response.data.Status){
                  self.keyIn = response.data.Key;
                            this.$bvModal.show("in-otp-modal")
                }else{
                    self.errorMessage = 'Có lỗi khi gửi OTP'
                    self.showPopoverIn();
                }
                }).catch(e =>{
                console.log(e);
                })
      }
    },

   async checkOTPin(){
      var self = this;

      if(self.inFee == 1){

        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
          otp: self.OTPin,
          key: self.keyIn
        }}

        let data ={
          id: self.inAccount,
          amount: 2000,
        }

         await axios.post(self.$store.state.host+'transaction/draw',data, config).then(async function(response){
          console.log(response);
          self.fee = "Phí thanh toán: 2,000"

          let data2 = {
                    
                    from: self.inAccount,
          to: self.inQuery,
          amount:self.inAmount,
          message:self.inNote
        }
        let config2 = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
          otp: self.OTPin,
          key: self.keyIn
        }}
               await axios.post(self.$store.state.host+'transaction/transfer',data2, config2).then(response2 =>{
          console.log(response2);
          if(response2.data.Status){
            self.idValidIn = false;
            self.inQuery = "";
            self.inName='';
            self.inEmail='';
            self.inPhone='';
            self.inAmount='';
            self.inNote = '';
            self.inAccount = -1;
            self.accountBalance = formatCurrency(response2.data.Account.balance);
            self.showPopoverPositiveIn(); 
          }else{
            if(response2.data.Message=="Balance is not enough")
            {
              self.errorMessage = 'Không đủ tiền'
            self.showPopoverIn();
            }else{
            self.errorMessage = 'OTP sai'
            self.showPopoverIn();
            }
          }
        }).catch(e =>{
          console.log(e);
        })

          })
      }else if (self.inFee == 2){
        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
          otp: self.OTPin,
          key: self.keyIn
        }}

        let data ={
          id: self.inAccount,
          amount: 2000,
        }

         await axios.post(self.$store.state.host+'transaction/draw',data, config).then(async response =>{
          console.log(response);
          self.fee = ""

          let data2 = {
                    
          from: self.inAccount,
          to: self.inQuery,
          amount: (self.inAmount-2000),
          message:self.inNote
        }
        let config2 = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
          otp: self.OTPin,
          key: self.keyIn
        }}
               await axios.post(self.$store.state.host+'transaction/transfer',data2, config2).then(response2 =>{
          console.log(response2);
          if(response2.data.Status){
            self.idValidIn = false;
            self.inQuery = "";
            self.inName='';
            self.inEmail='';
            self.inPhone='';
            self.inAmount='';
            self.inNote = '';
            self.inAccount = -1;
            self.accountBalance = formatCurrency(response2.data.Account.balance);
            self.showPopoverPositiveIn(); 
          }else{
            if(response2.data.Message=="Balance is not enough")
            {
              self.errorMessage = 'Không đủ tiền'
            self.showPopoverIn();
            }else{
            self.errorMessage = 'OTP sai'
            self.showPopoverIn();
            }
          }
        }).catch(e =>{
          console.log(e);
        })
          })
      }
    },

    clickHandlerIn() {
      // event fired when clicking on the input
    },
    onSelectedIn(item) {
      clearTimeout(this.typingTimerIn);
      this.inSelected = item.item;
      this.inQuery=item.item.id.toString();
      this.doneTypingIn();
    },
    onInputChangeIn(text) {
      clearTimeout(this.typingTimerIn);
      if (text!= '') {
        this.typingTimerIn = setTimeout(this.doneTypingIn, this.doneTypingInterval);
    }
      console.log(text)
      console.log(text)
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValueIn(suggestion) {
      return suggestion.item.id.toString();
    },
    focusMeIn(e) {
      console.log(e) // FocusEvent
    },
   async doneTypingIn(){
      var self = this;
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                debit_id: self.inQuery,
                },
                }

               await axios.get(self.$store.state.host+"debit/", config).then(async response =>{
          console.log(response);
          if(response.data.Status){
            let config2 = {
              headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                    customer_id: response.data.Debit.owner,
                },
            }
            
                
           await axios.get(self.$store.state.host+"users/customer/info", config2).then(response2 =>{
                if(response2.data.Status){
                    self.idValidIn = true;
                    self.transferId = response2.data.Info.info.customer_id;
                    self.inName=response2.data.Info.info.name;
                    self.inEmail=response2.data.Info.info.email;
                    self.inPhone=response2.data.Info.info.phone;
                }else{
                  self.idValid = false
            self.errorMessage='Không tìm thấy người dùng';
            self.showPopoverIn();
                }
  })
          }else{
            self.idValid = false
            self.errorMessage='Không tìm thấy người dùng';
            self.showPopoverIn();
          }
        }).catch(e =>{
          console.log(e);
        })
    },
    hidePopoverIn(){
      this.showInPop = false;
      console.log("hide")
    },
    showPopoverIn(){
      this.showInPop = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopoverIn(), 3000);
    },
    hidePopoverPositiveIn(){
      this.showInPopPos = false;
      console.log("hide")
    },
    showPopoverPositiveIn(){
      this.showInPopPos = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopoverPositiveIn(), 10000);
    },
    },
}

</script>

<style scoped>
.customer-transfer{
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.container-box{
    margin-left: 15px;
    margin-right: 15px;
    height: unset;
    padding-top: 15px;
    padding-bottom: 15px;
}
.autosuggest__results-container ul{
    padding: 0;
}

#autosuggest ul{
    padding: 0px;
}
.auto-suggest-container div{
text-align: left;
}
.auto-suggest-container div:nth-child(1){
    color: black;
    font-weight: bold;
}
.auto-suggest-container div:nth-child(2){
    margin-right: 40px;
    border-bottom: 1px solid grey;
}
</style>