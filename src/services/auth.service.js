import axios from 'axios'

const authService = {
    user: null,
    async login(formData)
    {
        try {
            const {status, data} = await axios.post('http://localhost:8080/api/project/login', formData)
            if (status === 200) {
                this.setUser(data)
                return {success: true}
            }
          } catch (e) {
            // this.errors = e.response.data.errors
            return {
                success: false,
                errors: e.response.data.errors,
            } 
          }
    },
    async register(formData)
    {
        try {
            const {status, data} = await axios.post('http://localhost:8080/api/project/signup', formData)
            if (status === 200) {
                this.setUser(data)
                return {success: true}
            }
          } catch (e) {
            // this.errors = e.response.data.errors
            return {
                success: false,
                errors: e.response.data.errors,
            } 
          }
    },
    setUser(user) {
        this.user = user
        localStorage.setItem('ACCESS_TOKEN', user.access_token)
        localStorage.setItem('LOGIN_USER', user.id)
        localStorage.setItem('USERNAME', user.username)
    },
    isLoggedIn() {
        return !!localStorage.getItem('ACCESS_TOKEN')
    },
    getToken() {
        return localStorage.getItem('ACCESS_TOKEN')
    },
    getLoginUserId() {
        return localStorage.getItem('LOGIN_USER')
    },
    getLoginUsername() {
        return localStorage.getItem('USERNAME')
    },
    logout() {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('LOGIN_USER')
        localStorage.removeItem('USERNAME')
    }
};

export default authService