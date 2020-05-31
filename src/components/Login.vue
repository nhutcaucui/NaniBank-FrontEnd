<template>
  <div class="login">
      <div class="center-login">
    <LeftLoginBox/>
    <div class="right-box">
        <img src="../assets/nanibank-logo.png" class="login-logo"/><br/>
        <div class="login-form">
            <div class="content-input">
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder"><img src="../assets/user.png"/></div><input class="login-input" placeholder="Tên đăng nhập"/>
				</div>

               </div>	
               <div class="form-group">
                   <div class="inner-form-group">
                       <div class="img-holder"><img src="../assets/password.png"/></div><input class="login-input" type="password" placeholder="Mật khẩu"/>
				</div>
               </div>
               <div class="center-g-captcha">
        <vue-recaptcha class="g-recaptcha" sitekey="6LfmcP4UAAAAAB8zn4ADK-qjn3vysFu2innt2V_i"></vue-recaptcha>
        </div>
        <div class="form-group">
                   <div class="inner-form-group">
                       <button class="login-button">Đăng nhập</button>
				</div>
            </div>
        </div>
        </div>
    </div>
    
    <RightLoginBox/>
    </div>
  </div> 
</template>

<script>
import LeftLoginBox from './LeftLoginBox';
import RightLoginBox from './RightLoginBox'
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Login', //this is the name of the component
  components:{
      LeftLoginBox,
      RightLoginBox,
      VueRecaptcha
  }
}
</script>

<style>

.login{
    background-image: url('../assets/login-background.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
    height: 100vh;
    position: relative;
    overflow: auto;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
}
.center-login{
         max-width: 662px;
    width: auto;
    min-height: 400px;
    position: relative;
    top: 50%;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-50%);
       
}
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
    height: 32px;
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
}
.login-button:focus{
    outline: none;
}
.login-button:hover{
    background: #7B5EA8;
    border: 1px solid #7B5EA8;
}

</style>