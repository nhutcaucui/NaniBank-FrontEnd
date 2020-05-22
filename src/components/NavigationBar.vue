<template>
  <div>
    <div>
    <h2>Nav Bar</h2>
    <nav>
      <router-link v-for="routes in links" 
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar', //this is the name of the component
    data() {
        return {
        links: [
            {
            id: 0,
            text: 'Home',
            page:'/Home'
            },
            {
                id: 1,
                text: 'Hello World',
                page: '/'
            }
        ]
        }
    }
    }
</script>
<style>
</style>