<template>
    <div class="form">
        <form @submit.prevent="search" action="POST">
            <div class="form-header">
                <h1>Book List</h1>
            </div>

            <div class="form-row">
                <div class="form-control">
                    <div class="form-column">
                        <input type="text" v-model="form.keyword" placeholder="type your keyword ......."/>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-control">
                    <div class="form-column">
                        <button><font-awesome-icon icon="search" />Search</button>
                    </div>
                </div>
            </div>
        </form>

        <div class="form-row">
            <div class="table">
                <div class="p-10-0">
                    <div class="w-100-per text-left flex-div justify-content-space-between">
                        <span class="add-btn" @click="createForm"><font-awesome-icon icon="book" /> Add</span>
                        <span class="total-span">Total: {{this.totalLen}} rows</span>
                    </div>
                </div>
                <div class="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>Action</th>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(book, index) in displayedBooks" :key="book.name">
                                <td>{{page+(4*(page-1))+index}}.</td>
                                <td>
                                    <router-link :to="{ path: '/info/'+book.id}" ><font-awesome-icon icon="info" /></router-link>
                                    <router-link :to="{ path: '/update/'+book.id}" ><font-awesome-icon icon="edit" /></router-link>
                                    <router-link :to="{ path: '/delete/'+book.id}" ><font-awesome-icon icon="trash" /></router-link>
                                </td>
                                <td>{{book.book_name}}</td>
                                <td>{{book.author}}</td>
                                <td>{{book.price.toLocaleString()}}</td>
                                <td>{{book.qty}} pcs</td>
                            </tr>

                            <tr v-if="this.totalLen == 0">
                                <td colspan="6" class="warn-text">No Records Found.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <button type="button" class="page-link" v-if="page != 1" @click="page--"><font-awesome-icon icon="backward" /></button>
                        </li>
                        <li class="page-item">
                            <button type="button" v-bind:class="{ 'page-link': page == pageNumber }" v-for="pageNumber in pages.slice(page-1, page+4)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
                        </li>
                        <li class="page-item">
                            <button type="button" @click="page++" v-if="page < pages.length" class="page-link"><font-awesome-icon icon="forward" /></button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import httpClient from '../services/http.service'

export default {
    name: 'List',
    data() {
        return {
            books: [],
            form: {
                keyword: '',
            },
            page: 1,
			perPage: 5,
			pages: [],
            totalLen: 1
        }
    },
    methods: {
        async search() {
            this.page = 1
            this.form.keyword = this.form.keyword.trim()
            const {status, data} = await httpClient.get('book?keyword='+this.form.keyword)
            if (status === 200) {
                this.books = data
                this.totalLen = this.books.length
            }
        },
        createForm() {
            this.$router.push({path: 'create'})
        },
		setPages () {
            this.pages = []
			let numberOfPages = Math.ceil(this.books.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (books) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  books.slice(from, to);
		}
    },
	computed: {
		displayedBooks () {
			return this.paginate(this.books);
		}
	},
	watch: {
		books () {
			this.setPages();
		}
	},
    async mounted() {
        const {status, data} = await httpClient.get('book?keyword='+this.form.keyword)
        if (status === 200) {
            this.books = data
            this.totalLen = this.books.length
        }
    }
}
</script>