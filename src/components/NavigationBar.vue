<template>
<div class="navigation-bar">
  <div class="absolute-div">
<header class = 'header'>
  <div class="outer-container">
  <div class="inner-container">
    <div class="nav-container">
      <a href="/"><img src="../assets/nanibank-logo.png" class = "logo"/></a>
      <nav class = "top-nav">
        <router-link v-for="routes in links" 
        v-bind:key="routes.id"
        :to="`${routes.page}`">{{routes.text}}</router-link>
        <a class="inactive-divider" href="#">|</a>
        <a class="inactive" href="#"></a>
      </nav>
  </div>
  </div>
  </div>
</header>
  <div class = "menu-container"> 
<ul class="user-menu" :class="{'user-menu--hidden': !showMenu}">
        <li class="join-link"><a href="/#/Login">Đăng nhập</a></li>
      </ul>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'NavigationBar', //this is the name of the component
  data() {
    return {
      links: [{
        id: 0,
        text: 'Trang chủ',
        page:'/'
      },
      {
        id: 1,
        text: 'Thông tin',
        page: '/About'
      }],
      showMenu: true,
      lastScrollPos: 0
    }
  },
  mounted () {
  window.addEventListener('scroll', this.onScroll)
},
beforeDestroy () {
  window.removeEventListener('scroll', this.onScroll)
},
  methods: {
  onScroll () {
    // Get the current scroll position
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
    if (currentScrollPosition < 0) {
      return
    }
    if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
    return
  }
  this.showMenu = currentScrollPosition < this.lastScrollPosition
  this.lastScrollPosition = currentScrollPosition
  }
}
}
    
</script>

<style>
.user-menu{
  margin: 0;
  float:right;
  margin-right: 50px;
  margin-top: -5px;
   list-style-type: none;
   background-image: url("../assets/user-box.png");
   background-repeat: no-repeat;
   background-size: contain;
   height: 42px;
   line-height: 42px;
   min-width: 330px;
   padding: 5px 40px 15px;
   vertical-align: middle;
   display: table-cell;
   transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
   opacity: 1;
}
.user-menu--hidden{
  box-shadow: none;
  opacity: 0;
  visibility: hidden;
}
.user-menu a{
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  display: block;
}

.join-link{
  width: 100%;
  height: 100%;
  background:  #704DDC;
  border-radius: 3px;
  transition: 0.3s ease-out;
}

.join-link:hover {
  background: #9B82E6;
}

.join-link a{
  color: #fff;
}
.user-menu li{
  float: left;
}
.outer-container{
  background: #fff;

 height: 100%;
 width: 100%;
}
.inner-container{
  height: 100%;
  
    line-height: 70px;
    padding: 0 50px;
}
.header{
  position: relative;
      z-index: 501;
    width: 100%;
    display: inline-block;
    height: auto;
    min-height: 70px;
    background: #ffffff;
}
.nav-container{
 height: 100%;
 width: 100%;
line-height: 70px;
}
.top-nav{
  float: right;
}
.top-nav a{
  border-bottom: 2px solid transparent;
  margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    float: left;
    position: relative;
    z-index: 20;
    padding: 0 10px;
text-decoration: none;
    color: #4A4A4A;
    font-size: 18px;

    transition: 0.3s; 
}
.top-nav a:hover{
  border-bottom: 2px solid  #523C89;
  
}
.logo{
  padding-top: 10px;
  float: left;
  max-height: 70px !important;
}
.inactive{
  pointer-events: none;
   cursor: default;
   width: 80px;
}
.inactive-divider{
  pointer-events: none;
   cursor: default;
}

.navigation-bar{
  position: fixed;
  width: 100%;
}

.absolute-div{
  position: absolute;
  height: 100%;
  width: 100%;
}

.menu-container{
  position: relative;
}

</style>