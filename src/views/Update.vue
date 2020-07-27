<template>
    <div class="form">
        <div class="form-header">
            <h1>Book Update</h1>
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
                    <button type="button" @click="bookUpdate">Update</button>
                    <button type="button" class="back-btn" @click="back">Back</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import httpClient from '../services/http.service'
import authService from '../services/auth.service'
import moment from 'moment'

export default {
    name: 'Update',
    data() {
        return {
            form: {
                id: '',
                book_name: '',
                author: '',
                price: '',
                qty: '',
                updated_by: authService.getLoginUserId(),
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            errors: {},
            errorCheck: ''
        }
    },
    methods: {
        async bookUpdate() {
            const {status, data} = await httpClient.put(`book/${this.form.id}`, this.form)
            if (status === 200) {
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
    },
    async mounted() {
        const {status, data} = await httpClient.get('book?keyword=info&id='+this.$route.params.id)
        if(data.length == 0) {
            this.back()
        } else {
            if (status === 200) {
                this.form.id = data['0'].id
                this.form.book_name = data['0'].book_name
                this.form.author = data['0'].author
                this.form.price = data['0'].price
                this.form.qty = data['0'].qty
            }
        }
    }
}
</script>