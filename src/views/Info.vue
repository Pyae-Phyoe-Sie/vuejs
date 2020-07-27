<template>
    <div class="form">

        <div class="form-header">
            <h1>Book Information</h1>
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
                <div class="form-column">
                    <button type="button" @click="goToList" >Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import httpClient from '../services/http.service'

export default {
    name: 'Info',
    data() {
        return {
            book_name: '',
            author: '',
            price: '',
            qty: '',
        }
    },
    methods: {
        goToList() {
            this.$router.push({name: 'home'})
        }
    },
    async mounted() {
        const {status, data} = await httpClient.get('book?keyword=info&id='+this.$route.params.id)

        if(data.length == 0) {
            this.goToList()
        } else {
            if (status === 200) {
                this.book_name = data['0'].book_name
                this.author = data['0'].author
                this.price = data['0'].price
                this.qty = data['0'].qty
            }
        }
    }
}
</script>