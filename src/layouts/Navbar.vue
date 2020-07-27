<template>
    <div id="nav-bar">
        <span>Welcome {{this.username}}</span>
        <span>
          <router-link v-if="this.login" to="/list">List</router-link>
          <router-link v-if="!this.login" to="/auth/login">Login</router-link>
          <router-link v-if="!this.login" to="/auth/register">Sign Up</router-link>
          <a href="" v-if="this.login" @click="logout">Logout</a>
        </span>
    </div>
</template>

<script>
import authService from '../services/auth.service'

export default {
  name: 'Navbar',
  data() {
    return {
        login: '',
        username: ''
    }
  },
  methods: {
    logout() {
      authService.logout();
      this.$router.push({name: 'login'})
    }
  },
  mounted() {
    this.login = authService.isLoggedIn();
    this.username = authService.getLoginUsername();
    if (this.username == null) {
      this.username = 'Guest'
    }
  }
}
</script>