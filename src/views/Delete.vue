<template>
    <div>
        <div class="form">
            <div class="form-header">
                <h1>Book Delete</h1>
            </div>

            <div class="form-row">
                <div class="form-control">
                    <div class="form-column">
                        <input type="text" :value=this.book_name readonly/>
                        <label>Book Name</label>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-control">
                    <div class="form-column">
                        <input type="text" :value=this.author readonly/>
                        <label>Author Name</label>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-control">
                    <div class="form-column">
                        <input type="text" :value=this.price readonly/>
                        <label>Price</label>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-control">
                    <div class="form-column">
                        <input type="text" :value=this.qty readonly/>
                        <label>Quantity</label>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-control">
                    <div class="form-column flex-div">
                        <button type="button" @click="showConfirmBox" >Delete</button>
                        <button type="button" class="back-btn" @click="back">Back</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="popup-window" v-if="this.confirm">
            <div class="popup-frame">
                <div class="popup-box">
                <div class="popup-header">
                    <h3>Confirmation</h3>
                    <font-awesome-icon icon="times" @click="close"/>
                </div>
                <div class="popup-body">
                    <p>Are you sure</p>
                    <div class="form-column flex-div flex-center">
                    <button type="button" class="popup-btn" @click="bookDelete">Ok</button>
                    <button type="button" class="popup-btn" @click="close">Cancel</button>
                    </div>
                </div>
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
    name: 'Delete',
    data() {
        return {
            id: '',
            book_name: '',
            author: '',
            price: '',
            qty: '',

            form: {
                delete_flag: true,
                updated_by: authService.getLoginUserId(),
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            },

            confirm: false
        }
    },
    methods: {
        async bookDelete() {
            // const {status} = await httpClient.delete(`book/${this.id}`, {})
            const {status} = await httpClient.put(`book/${this.id}`, this.form)
            if (status === 200) {
                this.$router.push({name: 'home'})
            }
        },
        showConfirmBox() {
            this.confirm = true
        },
        close() {
            this.confirm = false
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
                this.id = data['0'].id
                this.book_name = data['0'].book_name
                this.author = data['0'].author
                this.price = data['0'].price
                this.qty = data['0'].qty
            }
        }
    }
}
</script>