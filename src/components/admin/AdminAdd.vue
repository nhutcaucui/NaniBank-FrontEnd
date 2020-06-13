<template>
    <div class="admin-add">

        <EmployeeTable ref="employeeTableAdd"/>

<div class="add-box" id = "add-box">
    <label>Thêm giao dịch viên</label><br/>
    <form v-on:submit.prevent="onSubmit">
    <input placeholder="Họ tên"  id="name" name ="name" v-model="name"/>
    <input placeholder="Email"  id="email" name ="email" v-model="email"/>
    <input placeholder="Số điện thoại"  id="phone" name ="phone" v-model="phone"/>
    <input placeholder="Tài khoản"  id="username" name ="username" v-model="username"/>
    <input placeholder="Mật khẩu" type="password"  id="password" name ="password" v-model="password"/>
    <input placeholder="Xác nhận mật khẩu" type="password"  id="cfpassword" name ="cfpassword" v-model="cfpassword"/>
    <br/>
    <div class="btn-container">
    <button class="submit-button" id="submit-add">Tạo</button>
    </div>

    </form>
</div>

    <b-popover :show.sync="showPop" ref="popover" target="add-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios';
axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})
import EmployeeTable from './EmployeeTable';
 import 'vue2-datepicker/index.css';
export default {
  data(){
    return{
      name: '',
      email: '',
      phone:'',
      username:'',
      password:'',
      cfpassword:'',
      editable:false,
      errorMessage:'',
      showPop:false
    }
  },
    name: 'AdminAdd',
    components:{
      EmployeeTable
    },
    computed:{
      isUpdate(){
          return this.id != '';
      }
  },
  methods:{
    onSubmit(){
      
      var isError = false;
      if(this.name == ''){
        this.errorMessage = 'Xin nhập tên giao dịch viên'
        isError = true;
      }else if(this.email == ''){
        this.errorMessage = 'Xin nhập email giao dịch viên'
        isError = true;
      }else if(this.phone == ''){
        this.errorMessage = 'Xin nhập SDT giao dịch viên'
        isError = true;
      }else if(this.username == ''){
        this.errorMessage = 'Xin nhập tài khoản giao dịch viên'
        isError = true;
      }else if(this.password == ''){
        this.errorMessage = 'Xin nhập mật khẩu giao dịch viên'
        isError = true;
      }
      else if(this.password.length < 6){
        this.errorMessage = 'Mật khẩu quá ngắn'
        isError = true;
      }else if(this.cfpassword == ''){
        this.errorMessage = 'Xin nhập xác nhận mật khẩu giao dịch viên'
        isError = true;
      }else if(!/^\d+$/.test(this.phone)){
        this.errorMessage = 'Số điện thoại không hợp lệ'
        isError = true;
      }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){  // eslint-disable-line
        this.errorMessage = 'Email không hợp lệ'
        isError = true;
      }else if(this.cfpassword != this.password){
        this.errorMessage = 'Mật khẩu không khớp'
        isError = true;
      }

      if(isError){
        this.showPopover();
      }else{
        var self = this;
        axios.post('http://35.240.195.17/users/admin/create',{
          username: self.username,
          password:self.password,

        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.$refs.employeeTableAdd.addRow(self.name, self.email, self.phone, self.username)
              self.name= ''
              self.email= ''
              self.phone= ''
              self.username= ''
              self.password= '',
              self.cfpassword= ''
          }
          //self.$refs.employeeTableAdd.addRow(self.name, self.email, self.phone, self.username)
        }).catch(e =>{
          console.log(e);
        })
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
    }
  }
}
</script>

<style>
.add-box{
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
.add-box label{
  color: #523C89;
    font-size: 18px;
  font-weight: bold;
}

.add-box input{
  
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

.add-box input:focus{
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
.btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
}

.cancel-button{
    margin-top: 15px;
    width: 75%;
    height: 40px;
    border-radius: 20px;
    background: transparent;
    border: transparent;
    color: #7B5EA8;
    font-size: 18px;
    transition: 0.3s ease-out;
}
</style>

<style scoped>
.add-box{
  height: unset !important;
  padding-bottom: 15px;
}
</style>