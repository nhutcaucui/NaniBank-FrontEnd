<template>
  <div class="home">
    <h1 class="header-home">CHÀO MỪNG ĐẾN VỚI NANIBANK</h1>
    <div>
    <h2 class="sub-header-home">Kiểm soát tài khoản, nợ nần nhanh chóng và hiệu quả</h2>
    <a href="/#/About"  class="find-out">Tìm hiểu thêm</a>
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
  height: 768px;
}
.header-home{
  color: #704DDC;
  
}

.find-out{
  line-height: 50px;
  display: inline-block;
  height: 50px;
  width: 200px;
  color: white;
  background: #523C89;
  border-radius: 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.3s ease-out;
}
.find-out:hover{
  background: #9B82E6;
}
</style>