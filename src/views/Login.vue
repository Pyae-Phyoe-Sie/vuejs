<template>
    <div class="form">
      <form @submit.prevent="login" action="POST">
        <div class="form-header">
            <h1>Login</h1>
        </div>

        <div v-if="errorCheck" class="form-row">
            <div class="form-control">
                <div class="form-column errors">
                    <p v-for="(error, field) in errors" :key="field">
                      {{error[0]}}
                    </p>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" v-model="form.username" required/>
                    <label>Username</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="password" v-model="form.password" required/>
                    <label>Password</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <button>Login</button>
                    <span class="span-btn" @click="signup">Sign Up</span>
                </div>
            </div>
        </div>
      </form>
    </div>
</template>

<script>
import authService from '../services/auth.service'

export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        errors: {},
        errorCheck: ''
      }
    },
    methods: {
      async login() {
        const {success, errors} = await authService.login(this.form)
        if (success) {
          this.$router.push({name: 'home'})
          this.errorCheck = false
        } else {
          this.errors = errors
          this.errorCheck = true
        }
      },
      signup() {
        this.$router.push({name: 'register'})
      }
    }
}
</script>
