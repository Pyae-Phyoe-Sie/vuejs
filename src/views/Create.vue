<template>
    <div class="form">
      <form @submit.prevent="create" action="POST">
        <div class="form-header">
            <h1>Book Registration</h1>
        </div>

        <div v-if="errorCheck" class="form-row">
            <div class="form-control">
                <div class="form-column errors">
                    <p v-for="(error, field) in errors" :key="field">
                      {{error.message}}
                    </p>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" v-model="form.book_name" required/>
                    <label>Book Name</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" v-model="form.author" required/>
                    <label>Author Name</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" v-model="form.price" required/>
                    <label>Price</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column">
                    <input type="text" v-model="form.qty" required/>
                    <label>Quantity</label>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-control">
                <div class="form-column flex-div">
                    <button>Save</button>
                    <button type="button" class="back-btn" @click="back">Back</button>
                </div>
            </div>
        </div>
      </form>
    </div>
</template>

<script>
import httpClient from '../services/http.service'
import authService from '../services/auth.service'
import moment from 'moment'

export default {
    name: 'Create',
    data() {
      return {
        form: {
          book_name: '',
          author: '',
          price: '',
          qty: '',
          delete_flag: false,
          created_by: authService.getLoginUserId(),
          created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        errors: {},
        errorCheck: ''
      }
    },
    methods: {
        async create() {
            const {status, data} = await httpClient.post(`book`, this.form)
            if (status === 201) {
                this.$router.push({name: 'home'})
                this.errorCheck = false
            } else {
                this.errors = data
                this.errorCheck = true
            }
        },
        back() {
            this.$router.push({name: 'home'})
        }
    }
}
</script>
