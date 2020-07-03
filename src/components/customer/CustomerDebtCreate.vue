<template>
    <div class='customer-debt-create'>
        <DebtTableSent ref='debtTable'/>
<div class="add-box" id = "debt-create-box">
    <label>Nhắc nợ</label><br/>
    <form v-on:submit.prevent="onSubmit">
    <div class="autosuggest-container">
      <vue-autosuggest
        v-model="query"
        :suggestions="filteredOptions"
        @focus="focusMe"
        @click="clickHandler"
        @input="onInputChange"
        @selected="onSelected"
        :get-suggestion-value="getSuggestionValue"
        :input-props="{id:'autosuggest__input', placeholder:'Tài khoản chuyển đến'}">
        <div slot-scope="{suggestion}" style="{padding: '0'}" class="auto-suggest-container">
          <div style="{ display: 'flex', color: 'white'}">{{suggestion.item.name}}</div>
          <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.id}}</div>
        </div>
      </vue-autosuggest>
    </div>
    <input placeholder="Họ tên"  id="name" name ="name" disabled v-model="name"/>
    <input placeholder="Email"  id="email" name ="email" disabled v-model="email"/>
    <input placeholder="Số điện thoại"  id="phone" name ="phone" disabled v-model="phone"/>
    <input placeholder="Số tiền nợ"  id="amount" name ="amount" v-model="amount"/>
    <input placeholder="Nội dung nợ"  id="note" name ="note" v-model="note"/>
    <br/>
    <button class="submit-button" id="submit-add">Gửi nhắc nợ</button>
    </form>
</div>

    <b-popover :show.sync="showPop" target="debt-create-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label >{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showPopPositive" target="debt-create-box" triggers="manual" placement="bottom" container="error-popover" >
            <template v-slot:title>Thành công</template>
            <label >Đã tạo nhắc nợ</label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'
import { VueAutosuggest } from 'vue-autosuggest';
import DebtTableSent from './DebtTableSent'
export default {
    name:'CustomerDebtCreate',
    components:{
        VueAutosuggest,
        DebtTableSent
    },
    mounted(){
      this.loadReceiver();
    },
    data() {
    return {
      query: "",
      selected: "",
      suggestions: [
        {
          data: [
            // { id: 1, name: "Frodo", race: "Hobbit" },
            // { id: 2, name: "Samwise", race: "Hobbit"},
            // { id: 3, name: "Gandalf", race: "Maia"},
            // { id: 4, name: "Aragorn", race: "Human"}
          ]
        }
      ],
      typingTimer: 0,
      doneTypingInterval:3000,
      showPop:false,
      showPopPositive:false,
      errorMessage:'',
      name:'',
      email:'',
      phone: '',
      note:'',
      amount:'',
      debtor:0,
      idValid: false,
    };
  },
  computed: {
    filteredOptions() {
      return [
        { 
          data: this.suggestions[0].data.filter(option => {
            var self = this;
            return option.name.toLowerCase()
            .indexOf(self.query.toString().toLowerCase()) > -1;
          })
        }
      ];
    }
  },
  methods: {
    loadReceiver(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                customer_id: self.$store.state.id,
                },
                }

                axios.get(self.$store.state.host+'users/customer/receiver', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.suggestions[0].data = []
            for (var i =0; i < response.data.Receiver.length ; i++){
                self.suggestions[0].data.push({id:response.data.Receiver[i].receiver, name: response.data.Receiver[i].remind_name})
            }
          }
        }).catch(e =>{
          console.log(e);
        })
    },
    onSubmit(){
      var isError = false;
      console.log(this.idValid);
      if(!this.idValid){
          this.errorMessage='Xin nhập số tài khoản'
          isError = true;
      }else if (this.debtor == this.$store.state.id){
        this.errorMessage='Không thể nhắc nợ chính mình'
          isError = true;
      }else if(this.amount == ''){
          this.errorMessage='Xin nhập số tiền'
           isError = true;
      }else if(!/^\d+$/.test(this.amount)){
        this.errorMessage = 'Số tiền không hợp lệ'
        isError = true;
      }else if(this.note == ''){
          this.errorMessage='Xin nhập nội dung nợ'
           isError = true;
      }

      if(isError){
        this.showPopover();
      }else{
        var self = this;
        let data = {
              creditor:self.$store.state.id,      
              debtor: self.debtor,
          amount: self.amount,
          name:self.note,
          issue_date: 2051222400
        }
        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': this.$store.state.accessToken,
        }}
                axios.post(self.$store.state.host+'debt/',data, config).then(response =>{
          console.log(response);
          if(response.data.Status){
             self.$refs.debtTable.addRow(self.query, self.name, self.amount, self.note);
            self.name='';
            self.email='';
            self.phone='';
            self.note='';
            self.amount='';
            self.query="";
            self.idValid = false;
            self.showPopoverPositive(); 
             
          }else{
            self.errorMessage = ''
            self.showPopover();
          }
        }).catch(e =>{
          console.log(e);
        })
      }
    },
    clickHandler() {

      // event fired when clicking on the input
    },
    onSelected(item) {
      clearTimeout(this.typingTimer);
      this.selected = item.item;
      this.query=item.item.id.toString();
      this.doneTyping();
    },
    onInputChange(text) {
      clearTimeout(this.typingTimer);
      if (text!= '') {
        this.typingTimer = setTimeout(this.doneTyping, this.doneTypingInterval);
    }
      console.log(text)
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.id.toString();
    },
    focusMe(e) {
      console.log(e) // FocusEvent
    },
    doneTyping(){
      var self = this;
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                debit_id: self.query,
                },
                }

                axios.get(self.$store.state.host+"debit/", config).then(response =>{
          console.log(response);
          if(response.data.Status){
            let config2 = {
              headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                    customer_id: response.data.Debit.owner,
                },
            }
            
                
            axios.get(self.$store.state.host+"users/customer/info", config2).then(response2 =>{
                if(response2.data.Status){
                    self.idValid = true;
                    console.log(self.idValid);
                    self.debtor = response2.data.Info.info.customer_id;
                    console.log(self.debtor)
                    self.name=response2.data.Info.info.name;
                    self.email=response2.data.Info.info.email;
                    self.phone=response2.data.Info.info.phone;
                }else{
                  self.idValid = false
            self.errorMessage='Không tìm thấy người dùng';
            self.showPopover();
                }
  })
          }else{
            self.idValid = false
            self.errorMessage='Không tìm thấy người dùng';
            self.showPopover();
          }
        }).catch(e =>{
          console.log(e);
        })
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