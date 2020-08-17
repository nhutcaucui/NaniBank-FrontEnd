<template>
    <div class='customer-receiver'>
<ReceiverTable @rowClick="rowClick" ref="receiverTable"/>
    <div class="add-box" id = "receiver-box">
    <label>Thêm người nhận</label><br/>
    <form @submit.prevent="onSubmit">
    <input placeholder="Số tài khoản"  id="id" name ="id" v-model="id" v-bind:disabled="isEdit"/>
    <input placeholder="Tên gợi nhớ"  id="name" name ="name" v-model="name"/>
    <br/>
    <button class="submit-cancel" id="submit-cancel" v-if="isEdit" @click="onCancel">Hủy</button>
    <button class="submit-button" id="submit-add">{{current}}</button>
    </form>
</div>

    <b-popover :show.sync="showPop" target="receiver-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>

      <b-popover :show.sync="showPopAdd" target="receiver-box" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã thêm người nhận</label>
      </b-popover>
      <b-popover :show.sync="showPopEdit" target="receiver-box" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã cập nhật người nhận</label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ReceiverTable from'./ReceiverTable'
export default {
    name:'CustomerReceiver',
    data(){
        return{
            id:'',
            name:'',
            showPop:false,
            showPopAdd:false,
            showPopEdit:false,
            errorMessage:'',
            isEdit:false,
            current:'Thêm',
            index: -1,
        }
    },
    components:{
        ReceiverTable
    },
    methods:{
       async onSubmit(){
            var self = this;
            if(this.isEdit){
                
                const data = {
          customer_id: self.$store.state.id,
                receiver: self.id,
                remind_name: self.name
        }
        const config = {
            headers:{
               timestamp: moment().format("X"),
               'access-token': self.$store.state.accessToken 
              }
         }
        await axios.post(self.$store.state.host+ 'users/customer/receiver/edit',data,config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.$refs.receiverTable.editRow(self.index, self.id ,self.name)
              self.id= '';
              self.name= '';
              self.showPopoverEdit();
          }
          else{
            self.errorMessage = 'Có biến ở server'
            self.showPopover();
          }
        }).catch(e =>{
          console.log(e);
        })
 
            }else{
              if(self.id == ''){
                self.errorMessage = 'Xin nhập tài khoản người nhận'
            self.showPopover();
              }else{
              
        

        if(self.name == ''){
         let config2 = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                debit_id: self.id,
                },
                }

               await axios.get(self.$store.state.host+"debit/", config2).then(async response2 =>{
          console.log(response2);
          if(response2.data.Status){
            let config3 = {
              headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                    customer_id: response2.data.Debit.owner,
                },
            }
            await axios.get(self.$store.state.host+"users/customer/info", config3).then(async response3 =>{
                if(response3.data.Status){
                  let config = {
            headers:{
               timestamp: moment().format("X"),
               'access-token': self.$store.state.accessToken
              }
         }

         let data = {
                customer_id: self.$store.state.id,
                receiver: self.id,
                remind_name: response3.data.Info.info.name
        }
 axios.post(self.$store.state.host+ 'users/customer/receiver',data,config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.$refs.receiverTable.addRow(self.id ,response3.data.Info.info.name)
              self.id= '';
              self.name= '';
              self.showPopoverAdd();
          }
          else{
            self.errorMessage = 'Người nhận đã tồn tại'
            self.showPopover();
          }
        }).catch(e =>{
          console.log(e);
        })
                }
            })
       
          }else{
            self.errorMessage = 'Người dùng không tồn tại'
            self.showPopover();
          }
               })
        }else{
          let config = {
            headers:{
               timestamp: moment().format("X"),
               'access-token': self.$store.state.accessToken
              }
         }

         let data = {
                customer_id: self.$store.state.id,
                receiver: self.id,
                remind_name: self.name
        }
           axios.post(self.$store.state.host+ 'users/customer/receiver',data,config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.$refs.receiverTable.addRow(self.id ,self.name)
              self.id= '';
              self.name= '';
              self.showPopoverAdd();
          }
          else{
            self.errorMessage = 'Người nhận đã tồn tại'
            self.showPopover();
          }
        }).catch(e =>{
          console.log(e);
        })
        }
              }
            }
        },
        rowClick(record,index){
        var self = this;
        self.isEdit=true;
        self.current="Cập nhật"
        self.id = record.id;
        self.name = record.name;
        self.index = index
        self.$refs.accountInput.disable();
      },
      onCancel(){
          var self= this;
          self.isEdit=false;
          self.current="Thêm"
        self.id = '';
        self.name = '';
        self.index = '';
      },
      onDelete(){
          var self= this;
          self.isEdit=false;
          self.current="Thêm"
        self.id = '';
        self.name = '';
        self.index = '';
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
      hidePopoverAdd(){
      this.showPopAdd = false;
      console.log("hide")
    },
    showPopoverAdd(){
      this.showPopAdd = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopoverAdd(), 3000);
    },
    hidePopoverEdit(){
      this.showPopEdit = false;
      console.log("hide")
    },
    showPopoverEdit(){
      this.showPopEdit = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopoverEdit(), 3000);
    }
    }
}
</script>

<style>
.submit-cancel{
    background: transparent;
    border: transparent;
    width: 50%;
    color: #523C89;
    font-weight: bold;
}
</style>

<style scoped>
.submit-button{
    width: 50%;
}
.add-box{
  padding: 10px;
}
</style>