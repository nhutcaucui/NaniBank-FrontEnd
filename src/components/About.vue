<template>
  <div class="about">
    <div class="container-about">
      <p><b>GIAO DỊCH NHANH CHÓNG VÀ DỄ DÀNG</b></p>
      <p>NaniBank liên kết với các ngân hàng khác nhau giúp bạn không cần phải tìm đúng ngân hàng để chuyển tiền</p>
      <img src="../assets/trade.png">
      <p></p>
      <p><b>QUẢN LÍ NỢ NẦN</b></p>
      <p>NaniBank sẽ nhắc nợ và cho phép các khách hàng nhắc nợ nhau</p>
      <img src="../assets/loan.png">
    </div>
  </div> 
</template>

<script>
export default {
  name: 'About',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about{
  display: flex;
  padding-top: 140px;
  background: #EBEBEB;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
}
.container-about{
  margin: 0px 50px;
  height: 100%;
}
b{
  font-size: 24px;
}
</style>
