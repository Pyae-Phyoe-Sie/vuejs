<template>
    <div class="form">
      <form @submit.prevent="register" action="POST">
        <div class="form-header">
            <h1>Registration</h1>
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
                    <input type="password" v-model="form.password_repeat" required/>
                    <label>Confirm Password</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <button>Sign Up</button>
                    <span class="span-btn" @click="login">Login</span>
                </div>
            </div>
        </div>
      </form>
    </div>
</template>

<script>
import authService from '../services/auth.service'

export default {
    name: 'Register',
    data() {
      return {
        form: {
          username: '',
          password: '',
          password_repeat: '',
        },
        errors: {},
        errorCheck: ''
      }
    },
    methods: {
      async register() {
        const {success, errors} = await authService.register(this.form)
        if (success) {
          this.$router.push({name: 'home'})
          this.errorCheck = false
        } else {
          this.errors = errors
          this.errorCheck = true
        }
      },
      login() {
        this.$router.push({name: 'login'})
      }
    }
}
</script>
