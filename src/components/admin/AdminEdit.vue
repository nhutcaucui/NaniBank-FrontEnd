<template>
    <div class="admin-edit">

    <EmployeeTable @rowClick="rowClick" ref="employeeTableEdit"/>

<div class="edit-box" id="edit-box">
    <label>Chỉnh sửa giao dịch viên</label><br/>
    <form v-on:submit.prevent="onSubmit">
      <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/user.png"/></div>
    <input placeholder="Họ tên"  id="name" name ="name" v-model="name"/>
      </div>
      <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/blackmail.png"/></div>
    <input placeholder="Email"  id="email" name ="email" v-model="email"/>
      </div>
      <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/blackphone.png"/></div>
    <input placeholder="Số điện thoại"  id="phone" name ="phone" v-model="phone"/>
    </div>
    <br/>
    <button class="submit-button" id="submit-edit">Cập nhật</button>
    </form>
    </div>

    <b-popover :show.sync="showPop" target="edit-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label >{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showPopPositive" target="edit-box" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đã Thêm giao dịch viên</label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import EmployeeTable from './EmployeeTable'
export default {
    name: 'AdminEdit',
    data(){
    return{
      id:'',
      name:'',
      email:'',
      phone:'',
      editable:false,
      errorMessage:'',
      showPop:false,
      showPopPositive:false,
      index: -1,
    }
  },
    components: {
        EmployeeTable
    },
    methods:{
      rowClick(record,index){
        var self = this;
        self.id = record.id;
        self.name = record.ho_ten;
        self.email = record.email;
        self.phone = record.sdt;
        self.index = index
      },
      async onSubmit(){
        var isError = false;
        var self = this;
        if(self.id == ''){
            self.errorMessage = "Xin hãy chọn từ bảng"
            isError = true;
        }else if(self.name == ''){
            self.errorMessage = "Tên trống"
            isError = true;
        }
        else if(self.email == ''){
            self.errorMessage = "Email trống"
            isError = true;
        }
        else if(self.phone == ''){
            self.errorMessage = "SDT trống"
            isError = true;
        }else if(!/^\d+$/.test(this.phone)){
        this.errorMessage = 'Số điện thoại không hợp lệ'
        isError = true;
      }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){  // eslint-disable-line
        this.errorMessage = 'Email không hợp lệ'
        isError = true;
      }

        if(isError){
          this.showPopover();
        }else{
        await  axios.post(self.$store.state.host+'users/admin/edit',{
          id: self.id,
          name: self.name,
          email: self.email,
          phone: self.phone
        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.$refs.employeeTableEdit.editRow(self.id, self.name, self.email, self.phone, self.index)
            self.name= ''
              self.email= ''
              self.phone= ''
              self.showPopoverPositive();
          }
          //self.$refs.employeeTableEdit.editRow(self.id, self.name, self.email, self.phone, self.index)
        }).catch(e =>{
          console.log(e);
        })
      }
        }
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
</script>

<style>
.invisible-input{
    display: none !important;
}

.edit-box{
    padding-top: 10px;
    margin-top: 80px;
    margin-left: 50px;
    height: 350px;
    width: 350px;
    display: block;
    float:left;
    background: white;
    box-shadow: 0 0 4px;
}
.edit-box label{
    color: #523C89;
    font-size: 18px;
  font-weight: bold;
}

.edit-box input{
  box-sizing : border-box;
  margin-top: 15px;
    padding-top: 6px;
    transition: all 0.2s ease-in-out 0s;
    font-size: 16px;
    border: 1px solid #bebcc4;
    display: inline-block;
    width: 250px;
    height: 34px;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}

.edit-box input:focus{
  outline: none;
  border: 1px solid #704DDC;
}

.submit-button{
    margin-top: 15px;
    width: 75%;
    height: 40px;
    border-radius: 20px;
    background: #5B3693;
    border: 1px solid #5b3693;
    color: white;
    font-size: 18px;
    transition: 0.3s ease-out;
}
.submit-button:focus{
    outline: none;
}
.submit-button:hover{
    background: #7B5EA8;
    border: 1px solid #7B5EA8;
}
</style>

<style scoped>
.img-holder{
  margin-top: 15px;
}
</style>