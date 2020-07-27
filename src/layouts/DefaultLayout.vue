<template>
  <div id="default-layout">
    <navbar/>
    <img class="banner" src="../assets/banner.jpg" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './Navbar';

export default {
  name: 'DefaultLayout',
  components: {
      Navbar,
  }
}
</script>