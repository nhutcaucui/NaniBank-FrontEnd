<template>
    <div class='customer-change-pass'>
        <div class="container-box" id="change-pass-container">
            <label>Đổi mật khẩu</label>
            <form v-on:submit.prevent="onSubmit">
              <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/unlock.png"/></div>
            <input placeholder="Mật khẩu cũ" type="password"  id="oldpass" name ="oldpass" v-model="oldPass"/>
              </div>
              <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/password.png"/></div>
            <input placeholder="Mật khẩu mới" type="password"  id="newpass" name ="newpass" v-model="newPass"/>
              </div>
              <div class="inner-form-group">
    <div class="img-holder" id="test"><img src="../../assets/lock.png"/></div>
            <input placeholder="Xác nhận mật khẩu mới" type="password"  id="cfnewpass" name ="cfnewpass" v-model="cfPass"/>
              </div>
            <button class="submit-button" id="submit-change-pass">Đổi mật khẩu</button>
            </form>
        </div>

        <b-popover :show.sync="showPop" target="change-pass-container" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label>{{errorMessage}}</label>
      </b-popover>
      <b-popover :show.sync="showPopPositive" target="change-pass-container" triggers="manual" placement="bottom" container="error-popover">
            <template v-slot:title>Thành công</template>
            <label>Đổi mật khẩu thành công</label>
      </b-popover>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    name:'CustomerChangePassword',
    data(){
        return{
            oldPass:'',
            newPass:'',
            cfPass: '',
            errorMessage:'',
            showPop:false,
            showPopPositive:false,
        }
    },
    methods:{
        async onSubmit(){
            var isError = false;
            if(this.oldPass == ''){
                this.errorMessage='Xin nhập mật khẩu cũ'
                isError = true;
            }else if(this.newPass == ''){
                this.errorMessage='Xin nhập mật khẩu mới'
                isError = true;
            }else if(this.newPass != this.cfPass){
                this.errorMessage='Xác nhận mật khẩu không khớp'
                isError = true;
            }

            if(isError){
                this.showPopover();
            }else{
                var self = this;

                let data = {
                    
          old_password: self.oldPass,
          new_password: self.newPass,
          username: self.$store.state.username
        }

    
        let config = {headers:{
          timestamp: moment().format("X"),
          'access-token': this.$store.state.accessToken,
        }}
           await axios.post(self.$store.state.host+'users/password/change',data, config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.oldPass= ''
              self.newPass= ''
              self.cfPass= ''
            self.showPopoverPositive(); 
          }else{
            self.errorMessage='Mật khẩu cũ không chính xác';
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
.customer-change-pass{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<style scoped>
.img-holder{
  margin-top: 15px;
  width: 40px;
}
.container-box{
  width: 350px;
}
</style>