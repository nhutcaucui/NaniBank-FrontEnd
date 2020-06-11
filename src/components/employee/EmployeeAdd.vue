<template>
    <div class="employee-add">
        <div class="container-box" id ="container-box">
            <label>Tạo tài khoản cho khách</label>
            <form>
            <input placeholder="Mã hoặc tên tài khoản"  id="usernamecode" name ="usernamecode"/>
            <input placeholder="Email"  id="email" name ="email"/>
            <input placeholder="Số điện thoại"  id="phone" name ="phone"/>
            <input placeholder="Tên tài khoản"  id="username" name ="username"/>
            <button class="submit-button" id="submit-add">Thêm</button>
            </form>
        </div>

        <b-popover target="container-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
    </div>
</template>
<script>
export default {
    name:'EmployeeAdd',
    data(){
    return{
      errorMessage:''
    }
  },
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