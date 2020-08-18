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
    <b-popover :show.sync="showPop" target="employee-history-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label >{{errorMessage}}</label>
      </b-popover>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    name:'CustomerHistory',
    mounted(){
        //this.loadPartner();
    },
    methods: {
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
                self.partner.push({id: response3.data.Partners[i].id, name: response3.data.Partners[i].name});
              }
          }
            })
      },
        loadTable: function(){
            var self = this;
            console.log('help   ')
            if(this.selected === '1'){
                if(self.$route.path != '/Customer/History/Send'){
                    self.$router.push({name:"CustomerSend",  params:{bank: self.partner}})
                    console.log(self.$route.path);
                    }else{
                        self.$router.push("/Customer/History").then(() =>
                            {
                                self.$router.push({name:"CustomerSend", params:{bank: self.partner}
                                })})
                        
                    }
            }
            else if(this.selected === '2'){
                if(self.$route.path != '/Customer/History/Receive'){
                    self.$router.push({name:"CustomerReceive",  params:{bank: self.partner}})
                    }else{
                        self.$router.push("/Customer/History").then(() =>
                            {
                                self.$router.push({name:"CustomerReceive", params:{bank: self.partner}
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

        },

        showPopover(){
      this.showPop = true;
      var self = this
      setTimeout(() => self.hidePopover(), 3000);
    },
    hidePopoverSent(){
      this.showPopSent = false;
      console.log("hide")
      
    },
    },
    data(){
        return{
            selected : '1',
            errorMessage:'',
            showPop:false,
            partner:[],
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