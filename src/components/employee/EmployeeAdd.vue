<template>
    <div class="employee-add">
        <div class="container-box" id ="container-box">
            <label>Tạo tài khoản cho khách</label>
            <form v-on:submit.prevent="onSubmit">
            <input placeholder="Họ tên"  id="name" name ="name" v-model="name"/>
            <input placeholder="Email"  id="email" name ="email" v-model="email"/>
            <input placeholder="Số điện thoại"  id="phone" name ="phone" v-model="phone"/>
            <input placeholder="Tên tài khoản"  id="username" name ="username" v-model="username"/>
            <button class="submit-button" id="submit-add">Thêm</button>
            </form>
        </div>

        <b-popover :show.sync="showPop" target="container-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showPopPositive" target="container-box" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Tạo tài khoản thành công</label>
      </b-popover>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name:'EmployeeAdd',
    data(){
    return{
      name:'',
      email:'',
      phone:'',
      username: '',
      errorMessage:'',
      showPopPositive:false,
      showPop: false
    }
  },
  methods:{
    onSubmit(){
        var isError = false;
        if(this.name == ''){
        this.errorMessage = 'Xin nhập tên khách hàng'
        isError = true;
      }else if(this.email == ''){
        this.errorMessage = 'Xin nhập email khách hàng'
        isError = true;
      }else if(this.phone == ''){
        this.errorMessage = 'Xin nhập SDT khách hàng'
        isError = true;
      }else if(this.username == ''){
        this.errorMessage = 'Xin nhập tài khoản khách hàng'
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
        var self = this;
        axios.post('http://35.240.195.17/users/admin/create',{
          username: self.username,
          password: self.username,
          name: self.name,
          phone: self.phone,
          email: self.email,
        }, {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
              self.name= ''
              self.email= ''
              self.phone= ''
              self.username= ''
              self.showPopoverPositive();
          }else{
            //todo
          }
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
.container-box{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 350px;
    box-shadow: 0 0 10px;
    width: 300px;
}

.container-box input{
  
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

.container-box input:focus{
  outline: none;
  border: 1px solid #704DDC;
}

.container-box label{
    color: #523C89;
    font-weight: bold;
    font-size: 20px;
}
</style>