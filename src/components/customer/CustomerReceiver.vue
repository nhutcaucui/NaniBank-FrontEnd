<template>
    <div class='customer-receiver'>
<ReceiverTable @rowClick="rowClick" ref="receiverTable"/>
    <div class="add-box" id = "receiver-box">
    <label>Thêm người nhận</label><br/>
    <form @submit.prevent="onSubmit">
    <input placeholder="Số tài khoản"  id="id" name ="id" v-model="id"/>
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
        onSubmit(){
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
              }
         }
        axios.post(self.$store.state.host+ 'users/employee/create',data,config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.$refs.receiverTable.editRow(self.index, self.id ,self.name)
              self.id= '';
              self.name= '';
              self.showPopoverPositive();
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
              }else if(self.name == ''){
                self.errorMessage = 'Xin nhập tên gợi nhớ'
            self.showPopover();
              }else{
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
        axios.post(self.$store.state.host+ 'users/customer/receiver',data,config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.$refs.receiverTable.addRow(self.id ,self.name)
              self.id= '';
              self.name= '';
              self.showPopoverPositive();
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
        },
        rowClick(record,index){
        var self = this;
        self.isEdit=true;
        self.current="Cập nhật"
        self.id = record.id;
        self.name = record.name;
        self.index = index
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