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
    methods: {
        loadTable: function(){
            var self = this;
            var type = '';
            if(self.selected ===1){
                type = "sender"
            }else if(self.selected ===2){
                type = "receiver"
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

                axios.get(self.$store.state.host + 'transaction/history', config).then(response =>{
            console.log(response);
            if(response.data.Status){
                var data = response.data;
                if(self.selected === '1'){
                    if(self.$route.path != '/Employee/History/Send'){
                    self.$router.push({name:"EmployeeSend", params:{data: data}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeSend", params:{data: data}
                                })})
                        
                    }
                }
                else if(this.selected === '2'){
                    if(self.$route.path != '/Employee/History/Receive'){
                    self.$router.push({name:"EmployeeReceive", params:{data: data}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeReceive", params:{data: data}
                                })})
                        
                    }
                }
                else{
                self.errorMessage = "Tài khoản không tồn tại"
                self.showPopover();
            }
            }
            }).catch(e =>{
            console.log(e);
            })
            }else{
            let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                id: self.id,
                },
                }

                axios.get(self.$store.state.host + 'transaction/history', config).then(response =>{
            console.log(response);
            if(response.data.Status){
                var data = response.data;
                    if(self.$route.path != '/Employee/History/Debt'){
                    self.$router.push({name:"EmployeeDebt", params:{data: data}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeDebt", params:{data: data}
                                })})
                        
                    }
            }else{
                self.errorMessage = "Tài khoản không tồn tại"
                self.showPopover();
            }}).catch(e=>console.log(e))

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
            errorMessage:''
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