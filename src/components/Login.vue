<template>
  <div class="login">
      <div class="center-login">
    <LeftLoginBox/>
    <RightLoginBox/>
    </div>
  </div> 
</template>

<script>
import LeftLoginBox from './LeftLoginBox';
import RightLoginBox from './RightLoginBox'

export default {
  name: 'Login', //this is the name of the component
  components:{
      LeftLoginBox,
      RightLoginBox
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

</style>