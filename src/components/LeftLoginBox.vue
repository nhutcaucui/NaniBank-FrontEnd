<template>
<div class="left-box">
        <label class="leftbox-top-label">Hãy tham gia!</label>
        <p class="leftbox-paragraph">Ngân hàng số thế hệ mới đã có mặt! Tiên phong trải nghiệm ngay hôm nay!</p>
        <div class="leftbox-phone">
        <img src="../assets/nanibank-phone.png"><b>1900 100Có</b>
      </div>
      <div class="leftbox-mail">
        <img src="../assets/nanibank-mail.png"><b>Error@404.NotFound</b>
      </div>
        </div>
</template>

<script>
export default {
    name: 'LeftLoginBox',
}
</script>

<style>
.left-box{
    width: 263px;
    height: 376px;
    background: rgba(54,35,87,.8);
    position: absolute;
    top: 50%;
    margin-top: -188px;
    border-radius: 2px;
    color: #FFF;
    text-align: center;
    box-shadow: -2px 0 20px 0 rgba(0,0,0,.4);
}
.leftbox-top-label{
    font-size: 26px;
    margin-top: 60px;
    display: block;
    opacity: 0.5;
}
.leftbox-paragraph{
    text-align: center;
    margin: 30px 30px 40px;
    font-size: 13px;
    font-style: italic;
    opacity: .5;
}
.leftbox-phone img{
    width: 32px;
    height: 32px;
}
.leftbox-mail img{
    width: 32px;
    height: 32px;
}

.leftbox-mail{
    height: 32px;
    margin-top: 10px;
    line-height: 32px;
    display: flex;
    justify-content: center;
    justify-items: center;
    flex-wrap: wrap;
}
.leftbox-phone{
    display: flex;
    justify-content: center;
    justify-items: center;
    height: 32px;
    line-height: 32px;
    flex-wrap: wrap;
}
.leftbox-mail b{
    
    margin-left: 5px;
    
}
.leftbox-phone b{
    margin-left: 5px;
}
</style>