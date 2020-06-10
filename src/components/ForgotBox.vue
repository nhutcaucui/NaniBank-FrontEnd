<template>
    <div class="forgot-box" id="forgot-box">
        <router-link to="/Login" class="back-arrow"><i class="fas fa-arrow-left"></i></router-link>
        <label for="" class="forgot-label">Quên mật khẩu</label>
        
        <div class="login-form">
            <div class="content-input">
               <div class="form-group">
                   <div class="inner-form-group">
                       <input class="login-input" placeholder="Email" name = "email"/>
				</div>

                <div class="form-group">
                   <div class="inner-form-group">
                       <button class="login-button">Gửi OTP</button>
				</div>
                </div>

               </div>
               <div class="form-group">
                   <div class="inner-form-group">
                       <input class="login-input" type="password" placeholder="OTP" name ="otp"/>
				</div>
               </div>	
               <div class="form-group">
                   <div class="inner-form-group">
                       <input class="login-input" type="password" placeholder="Mật khẩu mới" name="newpass"/>
				</div>
               </div>
               <div class="form-group">
                   <div class="inner-form-group">
                       <input class="login-input" type="password" placeholder="Xác nhận mật khẩu mới" name="cfnewpass"/>
				</div>
               </div>
        <div class="form-group">
                   <div class="inner-form-group">
                       <button class="login-button">Đặt lại mật khẩu</button>
				</div>
            </div>
        </div>
        </div>
        <b-popover target="forgot-box" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
      <b-popover target="forgot-box" triggers="manual" placement="bottom">
            <template v-slot:title>Đã gửi OTP đến email</template>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
export default {
    name:'ForgotBox',
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