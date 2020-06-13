<template>
    <div class="right-box" id="right-box">
        <img src="../assets/nanibank-logo.png" class="login-logo"/><br/>
        <div class="login-form">
            <div class="content-input">
                <form v-on:submit.prevent="onSubmit">
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder" id="test"><img src="../assets/user.png"/></div><input class="login-input" placeholder="Tên đăng nhập" name="username" v-model = "username"/>
				</div>

               </div>	
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder"><img src="../assets/password.png"/></div><input class="login-input" type="password" placeholder="Mật khẩu" name="password" v-model = "password"/>
				</div>
               </div>
               <div class="center-g-captcha">
        <vue-recaptcha class="g-recaptcha" sitekey="6LfmcP4UAAAAAB8zn4ADK-qjn3vysFu2innt2V_i" @verify="onVerify"></vue-recaptcha>
        </div>
        <div class="form-group">
                   <div class="inner-form-group">
                       <button class="login-button">Đăng nhập</button>
				</div>
            </div>
                </form>
        </div>
        </div>
        <router-link to="Login/ForgotPass" class="forgot-pass">Quên mật khẩu</router-link>

        <b-popover :show.sync="showPop" target="right-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import VueRecaptcha from 'vue-recaptcha';
export default {
    name:'RightLoginBox',
    components:{
        VueRecaptcha
    },
    data(){
        return{
            verified: false,
            username: ',',
            password:'',
            shopPop: false,
            errorMessage:''
        }
    },
    methods:{
        onVerify(){
            this.verified = true;
        },
        onSubmit(){
            var self = this
            if(self.username == '' || self.password == ''){
                self.errorMessage = 'Tên đăng nhập hoặc mật khẩu không chính xác'
                self.showPopover();
            }else{
                axios.get('http://35.240.195.17/users/login',{
                    username: self.username,
                    password: self.password
                }, {headers:{
                timestamp: moment().unix(),
                }}).then(response =>{
                console.log(response);
                if(response.data.Status){
                    //todo,todo
                }else{
                    self.errorMessage = 'Tên đăng nhập hoặc mật khẩu không chính xác'
                    self.showPopover();
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
    }
    }
}
</script>

<style>
.right-box{

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

.img-holder{
    
        display: inline-block;
    position: relative;
    height: 34px !important;
    width: 15%;
    border: 1px solid #bebcc4;
    border-right: 0;
    vertical-align: middle;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
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
</style>