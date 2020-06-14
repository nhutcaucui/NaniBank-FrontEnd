<template>
    <div class='customer-transfer'>
<div class="container-box" id ="container-box-left">
            <label>Chuyển khoản nội bộ</label>
            <form @submit.prevent="onSubmitIn">
            <select placeholder="Tài khoản nguồn"  id="source" name ="source" class="text-input" v-model="inAccount">
                <option value="-1">- Chọn tài khoản thanh toán -</option>
                <option value="12456789">123456789</option>
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
            <label>Đã chuyển khoản</label>
      </b-popover>
      <b-popover target="container-box-left" triggers="manual" placement="left" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>

      <div class="container-box" id ="container-box">
            <label>Chuyển khoản liên ngân hàng</label>
            <form @submit.prevent="onSubmitOut">
            <select placeholder="Tài khoản nguồn"  id="source" name ="source" class="text-input" v-model="outAccount">
                <option value="-1">- Chọn tài khoản thanh toán -</option>
                <option value="12456789">123456789</option>
            </select>
            <select placeholder="Chọn ngân hàng"  id="source" name ="source" class="text-input" v-model="bank">
                <option value="-1">- Chọn ngân hàng -</option>
                <option value="1">KiantoBank</option>
                <option value="2">idkyet</option>
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

        <b-popover :show.sync="showOutPop" target="container-box" triggers="manual" placement="left" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showOutPopPos" target="container-box" triggers="manual" placement="left" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã chuyển khoản</label>
      </b-popover>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { VueAutosuggest } from 'vue-autosuggest';
export default {
    name:'CustomerTransfer',
    components:{
        VueAutosuggest
    },
    data() {
    return {
      bank: -1,
      inQuery: "",
      inSelected: "",
      inAccount:-1,
      inName:'',
      inPhone:'',
      inEmail:'',
      inFee:-1,
      inAmount:'',
      inNote:'',
      outQuery: "",
      outSelected: "",
      outAccount:-1,
      outName:'',
      outPhone:'',
      outEmail:'',
      outFee:-1,
      outAmount:'',
      outNote:'',
      inSuggestions: [
        {
          data: [
            { id: 1, name: "Frodo", race: "Hobbit" },
            { id: 2, name: "Samwise", race: "Hobbit"},
            { id: 3, name: "Gandalf", race: "Maia"},
            { id: 4, name: "Aragorn", race: "Human"}
          ]
        }
      ],
      outSuggestions: [
        {
          data: [
            { id: 1, name: "Frodo", race: "Hobbit" },
            { id: 2, name: "Samwise", race: "Hobbit"},
            { id: 3, name: "Gandalf", race: "Maia"},
            { id: 4, name: "Aragorn", race: "Human"}
          ]
        }
      ],
      showInPop:false,
      showInPopPos:false,
      showOutPop:false,
      showOutPopPos:false,
      errorMessage:'',
      typingTimerIn:'',
      typingTimerOut:'',
      doneTypingInterval: 3000,
      idValidIn:false,
      idValidOut:false
    };
  },
  computed: {
    filteredOptionsIn() {
      return [
        { 
          data: this.inSuggestions[0].data.filter(option => {
            return option.name.toLowerCase().indexOf(this.inQuery.toLowerCase()) > -1;
          })
        }
      ];
    },
    filteredOptionsOut() {
      return [
        { 
          data: this.outSuggestions[0].data.filter(option => {
            return option.name.toLowerCase().indexOf(this.outQuery.toLowerCase()) > -1;
          })
        }
      ];
    }
  },
  methods: {
    onSubmitIn(){
        var isError = false;
        if(this.inAccount === -1){
          this.errorMessage='Xin chọn tài khoản nguồn'
          isError = true;
        }
      else if(!this.idValidIn){
          this.errorMessage='Xin nhập số tài khoản đúng'
          isError = true;
      }else if(this.inAmount == ''){
          this.errorMessage='Xin nhập số tiền'
           isError = true;
      }else if(!/^\d+$/.test(this.inAmount)){
        this.errorMessage = 'Số tiền không hợp lệ'
        isError = true;
      }else if(this.inNote == ''){
          this.errorMessage='Xin nhập nội dung chuyển'
           isError = true;
      }else if(this.inFee === -1){
          this.errorMessage='Xin chọn cách thanh toán'
          isError = true;
      }

      if(isError){
        this.showPopover();
      }else{
        var self = this;
                axios.post('http://35.240.195.17/users/admin/create',{
                    token: this.$store.token,
          id: self.query,
          amount:self.amount,
          note:self.not
        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.idValidIn = false;
            self.inQuery = "";
            self.inName='';
            self.inEmail='';
            self.inPhone='';
            self.inAmount='';
            self.inNote = '';
            self.showPopoverPositiveIn(); 
          }
        }).catch(e =>{
          console.log(e);
        })
      }
    },
    onSubmitOut(){
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
      }else if(this.outNote == ''){
          this.errorMessage='Xin nhập nội dung chuyển'
           isError = true;
      }else if(this.outFee === -1){
          this.errorMessage='Xin chọn cách thanh toán'
          isError = true;
      }

      if(isError){
        this.showPopover();
      }else{
        var self = this;
                axios.post('http://35.240.195.17/users/admin/create',{
                    token: this.$store.token,
          id: self.query,
          amount:self.amount,
          note:self.not
        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.idValidOut = false;
            self.outQuery = "";
            self.outName='';
            self.outEmail='';
            self.outPhone='';
            self.outAmount='';
            self.outNote = '';
            self.showPopoverPositiveOut(); 
          }
        }).catch(e =>{
          console.log(e);
        })
      }
    },
    clickHandlerIn() {

      // event fired when clicking on the input
    },
    onSelectedIn(item) {
      this.inSelected = item.item;
      this.inQuery=item.item.id;
      this.doneTyping();
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
      return suggestion.item.id;
    },
    focusMeIn(e) {
      console.log(e) // FocusEvent
    },
    clickHandlerOut() {

      // event fired when clickOutg on the Output
    },
    onSelectedOut(item) {
      this.outSelected = item.item;
      this.outQuery=item.item.id;
      this.doneTypingOut();
    },
    onInputChangeOut(text) {
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
      return suggestion.item.id;
    },
    focusMeOut(e) {
      console.log(e) // FocusEvent
    },
    doneTypingIn(){
      var self = this;
                axios.get('http://35.240.195.17/users/admin/create',{
                    token: this.$store.token,
          id: self.query,
        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            console.log("found 1")
            self.idValidIn = true
          }else{
            self.idValidIn = false
            self.errorMessage='Không tìm thấy người dùng';
            self.showPopoverIn();
          }
        }).catch(e =>{
          console.log(e);
        })
    }
  },
  doneTypingOut(){
      var self = this;
                axios.get('http://35.240.195.17/users/admin/create',{
                    token: this.$store.token,
          id: self.query,
        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            console.log("found 1")
            self.idValidOut = true
          }else{
            self.idValidOut = false
            self.errorMessage='Không tìm thấy người dùng';
            self.showPopoverOut();
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
      setTimeout(() => self.hidePopoverPositiveIn(), 3000);
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