import axios from 'axios'

const bookSearchService = {
    async search(formData)
    {
        try {
            const {status, data} = axios.post('http://localhost:8080/api/book/search', formData)
            console.log(status, data)
            if (status === 200) {
                // this.setUser(data)
                return {
                    status: true,
                    data: data
                }
            }
          } catch (e) {
            // this.errors = e.response.data.errors
            return {
                status: false,
                data: e,
            } 
          }
    }
};

export default bookSearchService