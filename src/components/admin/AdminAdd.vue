<template>
    <div class="admin-add">

        <EmployeeTable/>

<div class="add-box" id = "add-box">
    <label>Thêm giao dịch viên</label><br/>
    <form>
    <input placeholder="Họ tên"  id="name" name ="name"/>
    <input placeholder="Email"  id="email" name ="email"/>
    <input placeholder="Số điện thoại"  id="phone" name ="phone"/>
    <date-picker format="DD/MM/YYYY" placeholder="Ngày sinh" id="dob" name="dob" v-bind:editable="editable" v-model="dob"></date-picker>
    <input placeholder="Tài khoản"  id="username" name ="username"/>
    <br/>
    <button class="submit-button" id="submit-add">Thêm</button>
    </form>
</div>

    <b-popover target="add-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import EmployeeTable from './EmployeeTable';
import DatePicker from 'vue2-datepicker';
 import 'vue2-datepicker/index.css';
export default {
  data(){
    return{
      dob:'',
      editable:false,
      errorMessage:''
    }
  },
    name: 'AdminAdd',
    components:{
      EmployeeTable,
      DatePicker
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

</style>