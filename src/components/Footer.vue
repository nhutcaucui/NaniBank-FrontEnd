<template>
  <div class="footer">
      <div>
        <img class="logo-white" src="../assets/nanibank-logo-white.png">
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
    display: flex;
    background: #523B89;
    align-items: flex-start;
    align-content: flex-start;
    width: 100%;
    padding: 50px 50px;
}
.logo-white{
    align-self: flex-start;
}
.special-thanks{
    width: 250px;
    color: white;
}
.special-thanks a{
    color: white;
    font-weight: bolder;
    text-decoration: underline;
}
</style>