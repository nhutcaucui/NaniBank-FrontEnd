<template>
  <div class="home">
    <h1 class="header-home">CHÀO MỪNG ĐẾN VỚI NANIBANK</h1>
    <div>
    <h2 class="sub-header-home">Kiểm soát tài khoản, nợ nần nhanh chóng và hiệu quả</h2>
    <button class="find-out"><a href="/About">Tìm hiểu thêm</a></button>
  </div>
  </div> 
</template>

<script>
export default {
  name: 'Home' //this is the name of the component
}
</script>
<style>
.home{
  padding-top: 140px;
  background: url("../assets/home-background.png");
  height: 100%;
}
.header-home{
  color: #704DDC;
  
}

.find-out{
  height: 50px;
  width: 200px;
  color: white;
  border-radius: 25dp;
  background: #523C89;
}
.find-out a{
  display: block;
}
</style>