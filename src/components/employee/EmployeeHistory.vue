<template>
    <div class="employee-history">

    <router-view></router-view>

    <div class="filter-box" id="employee-history-box">
    <label>Chọn loại lịch sử</label><br/>
    <form v-on:submit.prevent="onSubmit"> 
        <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/user.png"/></div>
        <input placeholder="Mã hoặc tên tài khoản"  id="usernamecode" name ="usernamecode" class="text-input" v-model="id"/>
        </div>
        <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/clock.png"/></div>
        <select name="bank" id="bank-select" class="text-input" v-model="selected">
  <option value="1">Giao dịch chuyển tiền</option>
  <option value="2">Giao dịch nhận tiền</option>
  <option value="3">Giao dịch thanh toán nợ</option>
</select>
        </div>
    <br/>
    <button class="submit-button" id="submit-filter" v-on:click="loadTable()">Lọc</button>
    </form>
    </div>
    <b-popover :show.sync="showPop" target="employee-history-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
    name:'EmployeeHistory',
    mounted(){
        this.loadPartner();
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
       async loadTable(){
            var self = this;
            var type = '';
            if(self.id == ''){
                self.errorMessage = 'Xin nhập người dùng'
                self.showPopover();
                return;
            }
            if(self.selected ==1){
                type = "receiver"
            }else if(self.selected == 2){
                type = "sender"
            }
            if(self.selected!= 3){
            let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                id: self.id,
                filter: type,
                },
                }

               await axios.get(self.$store.state.host + 'transaction/history/username', config).then(async response =>{
            console.log(response);
            if(response.data.Status){
                var data = response.data.Histories;
                await axios.get(self.$store.state.host + 'partner/history/username', config).then(async response2 =>{
            console.log(response2);
            if(response2.data.Status){

                Array.prototype.push.apply(data,response2.data.Histories)
                if(self.selected === '1'){
                    if(self.$route.path != '/Employee/History/Send'){
                    self.$router.push({name:"EmployeeSend", params:{data: data, bank: self.partner}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeSend", params:{data: data, bank: self.partner}
                                })})
                        
                    }
                }
                else if(this.selected === '2'){
                    if(self.$route.path != '/Employee/History/Receive'){
                    self.$router.push({name:"EmployeeReceive", params:{data: data, bank: self.partner}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeReceive", params:{data: data, bank: self.partner}
                                })})
                        
                    }
                }
            }})
                
            }else{
                await axios.get(self.$store.state.host + 'transaction/history/debit', config).then(async response =>{
            console.log(response);
            if(response.data.Status){
                var data = response.data.Histories;
                await axios.get(self.$store.state.host + 'partner/history/debit', config).then(async response2 =>{
            console.log(response2);
            if(response2.data.Status){
                Array.prototype.push.apply(data,response2.data.Histories)
                if(self.selected === '1'){
                    if(self.$route.path != '/Employee/History/Send'){
                    self.$router.push({name:"EmployeeSend", params:{data: data, bank: self.partner}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeSend", params:{data: data, bank: self.partner}
                                })})
                        
                    }
                }
                else if(this.selected === '2'){
                    if(self.$route.path != '/Employee/History/Receive'){
                    self.$router.push({name:"EmployeeReceive", params:{data: data, bank: self.partner}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeReceive", params:{data: data, bank: self.partner}
                                })})
                        
                    }
                }
                
            }})
            }else{
                self.errorMessage = "Tài khoản không tồn tại"
                self.showPopover();
            }
                })
            }
            }).catch(e =>{
            console.log(e);
            })
            }else{
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                customer_id: self.id,
                },
                }

            const items = [];

               await axios.get(self.$store.state.host+'debt/username', config).then(async response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            for (var i =0; i < response.data.Debt.length ; i++){
               if(response.data.Debt[i].description == "Paid"){
              let config2 = {
              headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                    customer_id: response.data.Debt[i].creditor,
                },
            }
            const amount = response.data.Debt[i].amount;
            const note = response.data.Debt[i].name;
            const debtId = response.data.Debt[i].id;

           await axios.get(self.$store.state.host+"users/customer/info", config2).then(response2 =>{
                if(response2.data.Status){
                    items.push({stt: self.items.length +1 , 
                    id: response2.data.Info.debit.id, 
                    name: response2.data.Info.info.name, 
                    amount: amount, 
                    status:"Đã thanh toán", note: note,
                    debtId: debtId})
                }
                })
            }
                
            }

            var data = items;
                    if(self.$route.path != '/Employee/History/Debt'){
                    self.$router.push({name:"EmployeeDebt", params:{data: data}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeDebt", params:{data: data}
                                })})
                        
                    }

          }else{
              await axios.get(self.$store.state.host+'debt/debit', config).then(async response3 =>{
          console.log(response3);
          if(response3.data.Status){
              self.items = []
            for (var i =0; i < response3.data.Debt.length ; i++){
               if(response3.data.Debt[i].description == "Paid"){
              let config2 = {
              headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                    customer_id: response3.data.Debt[i].creditor,
                },
            }
            const amount = response3.data.Debt[i].amount;
            const note = response3.data.Debt[i].name;
            const debtId = response3.data.Debt[i].id;

           await axios.get(self.$store.state.host+"users/customer/info", config2).then(response2 =>{
                if(response2.data.Status){
                    items.push({stt: self.items.length +1 , 
                    id: response2.data.Info.debit.id, 
                    name: response2.data.Info.info.name, 
                    amount: amount, 
                    status:"Đã thanh toán", note: note,
                    debtId: debtId})
                }
                })
            }
                
            }

            var data = items;
                    if(self.$route.path != '/Employee/History/Debt'){
                    self.$router.push({name:"EmployeeDebt", params:{data: data}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeDebt", params:{data: data}
                                })})
                        
                    }
          }else{
            self.errorMessage = "Không tìm thấy người dùng"
            self.showPopover();
          } 
          })
          }
        }).catch(e =>{
          console.log(e);
        })
            
        }
       },
        onSubmit(){

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
    }
    },
    data(){
        return{
            selected : '1',
            id:'',
            showPop: false,
            errorMessage:'',
            partner:[]
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

<style  scoped>
.filter-box label{
    color: #523C89;
}
.img-holder{
    margin-top: 15px;
}
</style>