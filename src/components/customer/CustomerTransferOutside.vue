<template>
    <div class='customer-transfer'>
      <div class="container-box" id ="container-box">
            <label>Chuyển khoản liên ngân hàng</label>
            <form @submit.prevent="onSubmitOut">
            <select placeholder="Tài khoản nguồn"  id="source" name ="source" class="text-input" v-model="outAccount">
                <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
    {{ option.text }}
  </option>
            </select>
            <select placeholder="Chọn ngân hàng"  id="source" name ="source" class="text-input" v-model="bank" @change="onBankChange()">
              <option v-for="boption in bankOptions" v-bind:value="boption.value" v-bind:key="boption.value">
  {{boption.text}}
          </option>
            </select>
            
            <div class="autosuggest-container">
      <vue-autosuggest
        v-model="outQuery"
        :suggestions="filteredOptionsOut"
        @focus="focusMeOut"
        @click="clickHandlerOut"
        @input="onInputChangeOut"
        @selected="onSelectedOut"
        :get-suggestion-value="getSuggestionValueOut"
        :input-props="{id:'autosuggest__input', placeholder:'Tài khoản chuyển đến'}">
        <div slot-scope="{suggestion}" style="{padding: '0'}" class="auto-suggest-container">
          <div style="{ display: 'flex', color: 'white'}">{{suggestion.item.name}}</div>
          <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.id}}</div>
        </div>
      </vue-autosuggest>
    </div>

            <input placeholder="Tên"  id="name" name ="name" disabled v-model="outName"/>
            <input placeholder="Số điện thoại"  id="phone" name ="phone" disabled v-model="outPhone"/>
            <input placeholder="Email"  id="email" name ="email" disabled v-model="outEmail"/>
            <input placeholder="Số tiền"  id="amount" name ="amount" v-model="outAmount"/>
            <input placeholder="Nội dung chuyển"  id="note" name ="note" v-model="outNote"/>
            <select placeholder="Thanh toán"  id="fee" name ="fee" class="text-input" v-model="outFee">
                <option value="-1">- Người thanh toán -</option>
                <option value="1">Người gửi thanh toán</option>
                <option value="2">Người nhận thanh toán</option>
            </select>
            <button class="submit-button" id="submit-transfer-in">Chuyển tiền</button>
            </form>
        </div>

        <b-popover :show.sync="showOutPop" target="container-box" triggers="manual" placement="right" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showOutPopPos" target="container-box" triggers="manual" placement="right" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã chuyển khoản</label>
            <label>Tài khoản còn: {{accountBalance}}</label><br/>
            <label>{{fee}}</label>
      </b-popover>

  <b-modal id="out-otp-modal" title="Kiểm tra Email để nhận OTP" @ok="checkOTPout()">
      <textarea style="width: 100%" placeholder="OTP" v-model="OTPout"/>
  </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { VueAutosuggest } from 'vue-autosuggest';
import Crypto from 'crypto';
import pgp from '../../plugins/pgp'; // eslint-disable-line
import rsa from '../../plugins/rsa'; // eslint-disable-line
import formatCurrency from 'format-currency'
export default {
    name:'CustomerTransferOutside',
    components:{
        VueAutosuggest
    },
    mounted(){
      this.loadReceiver();
      this.loadDebit();
      this.loadPartner();
    },
    data() {
    return {
      bankOptions:[
        {value: -1, text:"- Chọn ngân hàng -"}
      ],
      bank: -1,
      outQuery: "",
      outSelected: "",
      outAccount:-1,
      outName:'',
      outPhone:'',
      outEmail:'',
      outFee:-1,
      outAmount:'',
      outNote:'',
      OTPout:'',
      keyOut:'',
      outSuggestions: [
        {
          data: [
            // { id: 1, name: "Frodo", race: "Hobbit" },
            // { id: 2, name: "Samwise", race: "Hobbit"},
            // { id: 3, name: "Gandalf", race: "Maia"},
            // { id: 4, name: "Aragorn", race: "Human"}
          ]
        }
      ],
      showOutPop:false,
      showOutPopPos:false,
      errorMessage:'',
      typingTimerOut:'',
      doneTypingInterval: 3000,
      idValidOut:false,
      options:[],
      fee:'',
      accountBalance:'',
    };
  },
  computed: {
    filteredOptionsOut() {
      return [
        { 
          data: this.outSuggestions[0].data.filter(option => {
            return option.name.toLowerCase().indexOf(this.outQuery.toString().toLowerCase()) > -1;
          })
        }
      ];
    }
  },
  methods: {
    onBankChange(){
      if(this.bank == -1){
        return
      }
      if(this.outQuery == ''){
        return
      }
      
      this.doneTypingOut()
    },
    async loadPartner(){
        var self = this

        let config = {headers:{
          timestamp: moment().unix(),
          'access-token': this.$store.state.accessToken,
        },
        }
        await axios.get(self.$store.state.host + 'partner/all', config).then( async response3 =>{
          console.log(response3);
          if(response3.data.Status){
              for(let i=0; i < response3.data.Partners.length;i++){
                self.bankOptions.push({text: response3.data.Partners[i].name, value: i+1, hashMethod: response3.data.Partners[i].hashMethod});
              }
          }
            })
      },

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
            self.options.push({text: "- Chọn tài khoản thanh toán -", value:"-1"})
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
            self.outSuggestions[0].data = []
            for (var i =0; i < response.data.Receiver.length ; i++){
                self.outSuggestions[0].data.push({id:response.data.Receiver[i].receiver, name: response.data.Receiver[i].remind_name})
            }
          }
        }).catch(e =>{
          console.log(e);
        })
    },
    async onSubmitOut(){
      var isError = false;
        if(this.outAccount === -1){
          this.errorMessage='Xin chọn tài khoản nguồn'
          isError = true;
        }else if (this.bank == -1){
          this.errorMessage='Xin chọn ngân hàng'
          isError = true;
        }
      else if(!this.idValidOut){
          this.errorMessage='Xin nhập số tài khoản đúng'
          isError = true;
      }else if(this.outAmount == ''){
          this.errorMessage='Xin nhập số tiền'
           isError = true;
      }else if(!/^\d+$/.test(this.outAmount)){
        this.errorMessage = 'Số tiền không hợp lệ'
        isError = true;
      }else if(this.outAmount < 10000){
        this.errorMessage = 'Số tiền quá ít'
        isError = true;
      }else if(this.outNote == ''){
          this.errorMessage='Xin nhập nội dung chuyển'
           isError = true;
      }else if(this.outFee === -1){
          this.errorMessage='Xin chọn cách thanh toán'
          isError = true;
      }

      if(isError){
        this.showPopoverOut();
      }else{
        var self = this;
         
                if(self.outFee == 1){

          let config3 = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
        }}
        let data3 ={
          id: self.outAccount,
          amount: 2000 + parseInt(self.outAmount),
        }

        axios.post(self.$store.state.host+'transaction/check',data3, config3).then(async response3 =>{
          console.log(response3);
          if(response3.data.Status){
                let config= {params:{
                    customer_id: self.$store.state.id
                },headers:{
                timestamp: moment().format("X"),
                'access-token': self.$store.state.accessToken,
                }}

               await axios.get(self.$store.state.host+'otp/create',config).then(response =>{
                console.log(response);
                if(response.data.Status){
                  self.keyOut = response.data.Key;
                            this.$bvModal.show("out-otp-modal")
                }else{
                    self.errorMessage = 'Có lỗi khi gửi OTP'
                    self.showPopoverOut();
                }
                }).catch(e =>{
                console.log(e);
                })
          }
          else{
            self.errorMessage = 'Tài khoản không đủ tiền'
            self.showPopoverOut()
          }
        })        
      }else if (self.outFee == 2){

        let config3 = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
        }}
        let data3 ={
          id: self.outAccount,
          amount: self.outAmount,
        }

        axios.post(self.$store.state.host+'transaction/check',data3, config3).then(async response3 =>{
          console.log(response3);
          if(response3.data.Status){
            let config= {params:{
                    customer_id: self.$store.state.id
                },headers:{
                timestamp: moment().format("X"),
                'access-token': self.$store.state.accessToken,
                }}

               await axios.get(self.$store.state.host+'otp/create',config).then(response =>{
                console.log(response);
                if(response.data.Status){
                  self.keyOut = response.data.Key;
                            this.$bvModal.show("out-otp-modal")
                }else{
                    self.errorMessage = 'Có lỗi khi gửi OTP'
                    self.showPopoverOut();
                }
                }).catch(e =>{
                console.log(e);
                })
          }else{
            self.errorMessage = 'Tài khoản không đủ tiền'
            self.showPopoverOut()
          }
        })
      }
      }
    },
   async checkOTPout(){
      var self = this;
        let data = {
                    
                    from: self.$store.state.id,
          to: self.query,
          amount:self.amount,
          message:self.note
        }
        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': this.$store.state.accessToken,
          otp: self.OTPout,
          key: self.keyOut
        }}

          if(self.outFee == 1){

        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
          otp: self.OTPout,
          key: self.keyOut
        }}

        let data ={
          id: self.outAccount,
          amount: parseInt(self.outAmount) + 2000,
        }

         await axios.post(self.$store.state.host+'transaction/draw',data, config).then(async function(response){
          console.log(response);
          if(response.data.Status){
          self.fee = "Phí thanh toán: 2,000"
          self.accountBalance = formatCurrency(response.data.Account.balance);
          }
          else{
            self.errorMessage = 'Tài khoản không đủ tiền'
            self.showPopoverOut();
          }
        }).catch(e =>{
          console.log(e);
        })       
      }else if (self.outFee == 2){
        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': self.$store.state.accessToken,
          otp: self.OTPout,
          key: self.keyOut
        }}

        let data ={
          id: self.outAccount,
          amount: self.outAmount,
        }

         await axios.post(self.$store.state.host+'transaction/draw',data, config).then(async response =>{
          console.log(response);
          self.fee = ""
          self.accountBalance = formatCurrency(response.data.Account.balance);
        //   let data2 = {
                    
        //   from: self.outAccount,
        //   to: self.outQuery,
        //   amount: (parseInt(self.outAmount)-2000),
        //   message:self.outNote
        // }
        // let config2 = {headers:{
        //   timestamp: moment().format("X"),
        //   'access-token': self.$store.state.accessToken,
        //   otp: self.OTPout,
        //   key: self.keyOut
        // }}
        //        await axios.post(self.$store.state.host+'transaction/transfer',data2, config2).then(response2 =>{
        //   console.log(response2);
        //   if(response2.data.Status){
        //     self.idValidOut = false;
        //     self.outQuery = "";
        //     self.outName='';
        //     self.outEmail='';
        //     self.outPhone='';
        //     self.outAmount='';
        //     self.outNote = '';
        //     self.outAccount = -1;
        //     self.accountBalance = formatCurrency(response2.data.Account.balance);
        //     self.showPopoverPositiveOut(); 
        //   }else{
        //     if(response2.data.Message=="Balance is not enough")
        //     {
        //       self.errorMessage = 'Không đủ tiền'
        //     self.showPopoverOut();
        //     }else{
        //     self.errorMessage = 'OTP sai'
        //     self.showPopoverOut();
        //     }
          
        }).catch(e =>{
          console.log(e);
        })
          
      }


               await axios.post(self.$store.state.host+'otp/check',data, config).then(async response =>{
          console.log(response);
          if(response.data.Status){
            
            if(this.bankOptions[this.bank].text == "NguyenBank"){
            let detachedSignature = await pgp.detachedSign(self.$store.state.secretKey);
            let timestamp = moment().unix();
            let partnercode = 'nanibank';
            let body = {
                name: self.outName,
                content: self.outNote,
                dich: self.outQuery,
                amount: self.amount
            };

            let hash = this.bankOptions[this.bank].hashMethod.split(";");
            let parts = hash[1].split("+");
                hash = hash[0].split("+");

            let stringCheck ="";
            for(let i =0; i <parts.length;i++){
              if(parts[i]=="timestamp"){
                stringCheck += timestamp
              }else if(parts[i]=="body"){
                stringCheck += JSON.stringify(body)
              }else if(parts[i]== "secret"){
                stringCheck += self.$store.state.secretKey
              }
            }


            let csi = await Crypto.createHash(hash[0]).update(stringCheck).digest(hash[1]);

            let config = {
              headers: {
                  timestamp: timestamp,
                  partnercode: partnercode,
                  csi: csi,
                  detachedSignature: detachedSignature,
              }
            }

            axios.post(self.$store.state.nguyenTransfer,body, config
            ).then(function (res) {
                console.log(res.data);
            }).catch(function (error) {
                console.log(error);
            });
         }else if(this.bankOptions[this.bank].text == "KiantoBank"){
            let timestamp = moment().unix();
            let partnercode = 'nanibank';
            let body = {
                credit_number: self.outQuery,
                amount: self.outAmount,
            };

            let hash = this.bankOptions[this.bank].hashMethod.split(";");
            let parts = hash[1].split("+");
                hash = hash[0].split("+");

            let stringCheck ="";
            for(let i =0; i <parts.length;i++){
              if(parts[i]=="timestamp"){
                stringCheck += timestamp
              }else if(parts[i]=="body"){
                stringCheck += JSON.stringify(body)
              }else if(parts[i]== "secret"){
                stringCheck += self.$store.state.lamSecret
              }
            }

            let authen_sig = await rsa.sign(stringCheck);

            let csi = await Crypto.createHash(hash[0]).update(stringCheck).digest(hash[1]);

            let config = {
              headers: {
                  timestamp: timestamp,
                  "partner-code": partnercode,
                  'authen-hash': csi,
                 "authen-sig": authen_sig,
              }
            }

            axios.post(self.$store.state.lamTranfer,body, config
            ).then(res => {
                console.log(res);
            self.idValidOut = false;
            self.outQuery = "";
            self.outName='';
            self.outEmail='';
            self.outPhone='';
            self.outAmount='';
            self.outNote = '';
            self.showPopoverPositiveOut(); 
            }).catch(function (error) {
                console.log(error);
            });
         }

            
          }else{
            self.errorMessage = 'OTP sai'
            self.showPopoverOut();
          }
        })
    },
    clickHandlerOut() {

      // event fired when clickOutg on the Output
    },
    onSelectedOut(item) {
      clearTimeout(this.typingTimerOut);
      this.outSelected = item.item;
      this.outQuery=item.item.id.toString();
      this.doneTypingOut();
    },
    onInputChangeOut(text) {
      self.idValidOut = false;
      clearTimeout(this.typingTimerOut);
      if (text!= '') {
        this.typingTimerOut = setTimeout(this.doneTypingOut, this.doneTypingInterval);
    }
      console.log(text)
    },
    /**
     * This is what the <Output/> value is set to when you are selectOutg a suggestion.
     */
    getSuggestionValueOut(suggestion) {
      return suggestion.item.id.toString();
    },
    focusMeOut(e) {
      console.log(e) // FocusEvent
    },

 async doneTypingOut(){
   var self = this;
   let hash = this.bankOptions[this.bank].hashMethod.split(";");
   let parts = hash[1].split("+");
    hash = hash[0].split("+");

     let timestamp = moment().unix();
    let partnercode = 'nanibank';
    let body = {

    };

    
   if(this.bankOptions[this.bank].text == "NguyenBank"){
     let stringCheck ="";
    for(let i =0; i <parts.length;i++){
      if(parts[i]=="timestamp"){
        stringCheck += timestamp
      }else if(parts[i]=="body"){
        stringCheck += JSON.stringify(body)
      }else if(parts[i]== "secret"){
        stringCheck += self.$store.state.secretKey
      }
    }

    let csi = await Crypto.createHash(hash[0]).update(stringCheck).digest(hash[1]);
        let config = {
                headers: {
            timestamp: timestamp,
            partnercode: partnercode,
            csi: csi,
        }
                }
               await axios.get(self.$store.state.nguyenGetInfo+self.outQuery, config).then(response =>{
          console.log(response);
          

        }).catch(e =>{
          console.log(e);
        })
      }else if (this.bankOptions[this.bank].text == "KiantoBank"){
        let stringCheck ="";
    for(let i =0; i <parts.length;i++){
      if(parts[i]=="timestamp"){
        stringCheck += timestamp
      }else if(parts[i]=="body"){
        stringCheck += JSON.stringify(body)
      }else if(parts[i]== "secret"){
        stringCheck += self.$store.state.lamSecret
      }
    }

        let csi = await Crypto.createHash(hash[0]).update(stringCheck).digest(hash[1]);
        let config = {
                headers: {
            timestamp: timestamp,
            'partner-code': partnercode,
            'authen-hash': csi,
        },
        params:{
          credit_number: self.outQuery
        }
                }
               await axios.get(self.$store.state.lamGetInfo, config).then(response =>{
          console.log(response);
          if(response.status == 400){
            self.errorMessage = 'Không tìm thấy người dùng'
            self.showPopoverOut();
            return
          }

          if(response.status == 200){
            self.idValidOut = true;
            self.outName +=  response.data.lastname +" "+ response.data.firstname
          }
        }).catch(e =>{
          console.log(e);
        })
      }
      
    },
    hidePopoverOut(){
      this.showOutPop = false;
      console.log("hide")
    },
    showPopoverOut(){
      this.showOutPop = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopoverOut(), 3000);
    },
    hidePopoverPositiveOut(){
      this.showOutPopPos = false;
      console.log("hide")
    },
    showPopoverPositiveOut(){
      this.showOutPopPos = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopoverPositiveOut(), 3000);
    }
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