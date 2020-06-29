<template>
    <div class="forgot-box" id="forgot-box">
        <router-link to="/Login" class="back-arrow"><i class="fas fa-arrow-left"></i></router-link>
        <label for="" class="forgot-label">Quên mật khẩu</label>
        
        <div class="login-form">
            <div class="content-input">
                <form v-on:submit.prevent="onSubmitOTP">
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder" id="test"><img src="../assets/user.png"/></div>
                       <input class="login-input" placeholder="Tên tài khoản" name = "username" v-model="username"/>
                       
                </div>

                <div class="form-group">
                   <div class="inner-form-group">
                       <button class="login-button">Gửi OTP</button>
				</div>
                </div>

               </div>
                </form>
                <form v-on:submit.prevent="onSubmit">
                    <!--<div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder" id="test"><img src="../assets/blackmail.png"/></div>
                       <input v-model="email" class="login-input" placeholder="Email" name ="email"/>
				</div>
               </div>	-->
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder" id="test"><img src="../assets/receivekey.png"/></div>
                       <input v-model="OTP" class="login-input" type="password" placeholder="OTP" name ="otp"/>
				</div>
               </div>	
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder" id="test"><img src="../assets/password.png"/></div>
                       <input v-model="newPass" class="login-input" type="password" placeholder="Mật khẩu mới" name="newpass"/>
				</div>
               </div>
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder" id="test"><img src="../assets/lock.png"/></div>
                       <input v-model="cfNewPass" class="login-input" type="password" placeholder="Xác nhận mật khẩu mới" name="cfnewpass"/>
				</div>
               </div>
        <div class="form-group">
                   <div class="inner-form-group">
                       <button class="login-button">Đặt lại mật khẩu</button>
				</div>
            </div>
                </form>
        </div>
        </div>
        <b-popover :show.sync="showPop" target="forgot-box" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showPopSent" target="forgot-box" triggers="manual" placement="bottom" container="error-popover"> 
            <template v-slot:title>{{successMessage}}</template>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name:'ForgotBox',
    data(){
        return{
            email:'',
            username:'',
            OTP:'',
            newPass:'',
            cfNewPass:'',
            showPop:false,
            showPopSent:false,
            errorMessage:'',
            successMessage:"Đã gửi OTP đến email"
        }
    },
    methods:{
        onSubmitSent(){
            if(this.username == ''){
                this.errorMessage= "Xin nhập tên tài khoản"
                this.showPopover()
            }else{
                var self = this;
                let config= {params:{
                    username: self.username
                },headers:{
                timestamp: moment().format("X"),
                }}

                axios.get(self.$store.state.host+'otp/s-create',config).then(response =>{
                console.log(response);
                if(response.data.Status){
                    self.successMessage="Đã gửi OTP đến email"
                    self.showPopoverSent();
                }else{
                    self.errorMessage = 'Tài khoản không tồn tại'
                    self.showPopover();
                }
                }).catch(e =>{
                console.log(e);
                })
            }
        },
        onSubmit(){
            if(this.OTP == ''){
                this.errorMessage= "Xin nhập OTP"
                this.showPopover()
            }else if(this.newPass == '' || this.cfNewPass==''){
                this.errorMessage= "Xin nhập mạt khẩu mới"
                this.showPopover()
            }else if(this.newPass != this.cfNewPass){
                this.errorMessage= "Mật khẩu không khớp"
                this.showPopover()
            }else{
                var self = this;
                 let data = {
                    username: self.username,
                    new_password: self.password
                }
                let config = {
                    headers:{
                        timestamp: moment().format("X"),
                        otp: self.OTP,
                        key: self.OTP
                    }
                }
                axios.post(self.$store.state.host+'users/password/reset',data, config).then(response =>{
                console.log(response);
                if(response.data.Status){
                    self.successMessage="Đã đặt lại mật khẩu"
                    self.showPopoverSent();
                    setTimeout(() => self.$router.push("Login"), 3000);
                }else{
                    self.errorMessage = 'OTP không chính xác'
                    self.showPopover();
                }
                }).catch(e =>{
                console.log(e);
                })
            }
        },
        hidePopover(){
      this.showPop = false;
      
    },
    showPopover(){
      this.showPop = true;
      var self = this
      setTimeout(() => self.hidePopover(), 3000);
    },
    hidePopoverSent(){
      this.showPopSent = false;
      console.log("hide")
      
    },
    showPopoverSent(){
      this.showPopSent = true;
      console.log("show")
      var self = this
      setTimeout(() => self.hidePopover(), 3000);
    }
    }
}
</script>

<style>
.forgot-label{
    margin-left: -25px;
    font-weight: bold;
    font-size: 20px;
    color: #7B5EA8;
}
.forgot-box{
padding-top: 15px;
    position: relative;
    width: 399px;
    min-height: 400px;
    height: 100%;
    background-color: #FFF;
    float: right;
    border-radius: 2px;
    box-shadow: -2px 0 20px 0 rgba(0,0,0,.4);
}
.login-logo{
    margin: 15px;
}
.login-input{
    
    box-sizing : border-box;
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
.login-input:focus{
    outline: none;
    border: 1px solid #704DDC;
}
.login-form{
    margin: 0;
    padding: 0;
    border: 0;
}
.content-input{
    width: 100%;
    height: auto;
    margin: 0 auto;
}
.form-group{
    margin-bottom: 20px;
}
.inner-form-group{
    position: relative;
    display: flex;
    justify-content: center;
}

.inner-form-group img{
    vertical-align: middle;
    height: 24px;
    width: 24px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.g-recaptcha{
    width: 304px;
    margin: 0 auto;
}
.login-button{
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
.login-button:focus{
    outline: none;
}
.login-button:hover{
    background: #7B5EA8;
    border: 1px solid #7B5EA8;
}
.forgot-pass{
    float: right;
    margin-top: 15px;
    margin-right: 25px;
    color: black;
    font-weight: bold;
}

.back-arrow{
    margin-left: 25px;
    float: left;
    font-size: 20px;
    color: black;
}
.back-arrow:hover{
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.5);
}
</style>