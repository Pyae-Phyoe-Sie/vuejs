<template>
  <div id="default-layout">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './Navbar';

export default {
  name: 'NotFoundLayout',
  components: {
      Navbar,
  }
}
</script>