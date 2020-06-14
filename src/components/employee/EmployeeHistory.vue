<template>
    <div class="employee-history">

    <router-view></router-view>

    <div class="filter-box" id="employee-history-box">
    <label>Chọn loại lịch sử</label><br/>
    <form v-on:submit.prevent="onSubmit"> 
        <input placeholder="Mã hoặc tên tài khoản"  id="usernamecode" name ="usernamecode" class="text-input" v-model="id"/>
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
                axios.get('http://35.240.195.17/users/admin/edit',{
            id: self.id,
            }, {headers:{
            timestamp: moment().unix(),
            }}).then(response =>{
            console.log(response);
            if(response.data.Status){

                self.id= ''
                var data = [];
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
                else if(this.selected === '3'){
                    if(self.$route.path != '/Employee/History/Debt'){
                    self.$router.push({name:"EmployeeDebt", params:{data: data}})
                    }else{
                        self.$router.push("/Employee/History").then(() =>
                            {
                                self.$router.push({name:"EmployeeDebt", params:{data: data}
                                })})
                        
                    }
                }
            }else{
                self.errorMessage = "Tài khoản không tồn tại"
                self.showPopover();
            }
            }).catch(e =>{
            console.log(e);
            })
            
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