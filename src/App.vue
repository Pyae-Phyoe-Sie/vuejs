<template>
  <div id="app">
    <router-view v-title="title" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      title: 'Library System'
    }
  }
}
</script>

<style>
@import './assets/css/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
