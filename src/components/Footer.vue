<template>
  <div class="footer">
      <div class="logo-white">
        <img src="../assets/nanibank-logo-white.png">
      </div>
      <div class="phone">
        <img src="../assets/nanibank-phone.png"><b>1900 100Có</b>
      </div>
      <div class="mail">
        <img src="../assets/nanibank-mail.png"><b>Error@404.NotFound</b>
      </div>
      <div class="special-thanks">Special thanks to <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a>, 
      <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a>,
      <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a>,
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </div> 
</template>

<script>
export default {
  name: 'Footer' //this is the name of the component
}
</script>

<style>
.footer{
    background: #523B89;
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
}
.logo-white{
    margin: 20px 0px;
    flex-grow: 1;
}
.special-thanks{
    display: table;
    width: 250px;
    color: white;
    margin: 20px 0px;
    align-self: stretch;
}
.special-thanks a{
    color: white;
    font-weight: bolder;
    text-decoration: underline;
}
.phone{
  flex-grow: 1;
  display: flex;
  align-content: center;
  align-items: center;
  margin: 20px 0px;
  align-self: stretch;
}
.phone img{
  width: 32px;
  height: 32px;
}
.phone b{
  color: white;
  margin-left: 10px;
  line-height: 32px;
}
.mail{
  flex-grow: 1;
  display: flex;
  align-content: center;
  align-items: center;
  margin: 20px 0px;
  align-self: stretch;
}
.mail img{
  width: 32px;
  height: 32px;
}
.mail b{
  color: white;
  margin-left: 10px;
  line-height: 32px;
}
</style>