import { defineStore } from 'pinia'
import axios from 'axios'
// import bcrypt from 'bcryptjs'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    validateLogin: null,
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
    area: localStorage.getItem('area'),
    zone: localStorage.getItem('zone'),
  }),
  getters: {
    isLoggedIn: (state) => state.user,
  },
  actions: {
    async login(userLogin, passwordLogin) {
      try {
        // const hashedPassword = bcrypt.hashSync(passwordLogin, 10)
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + 
          '/cms/authen/login',
          { userName: userLogin, passWord: passwordLogin },
        );
        const result = response.data
        if (result) {
          this.userName = result.data.userName
          this.user = result.data.fullName
          this.token = result.data.token
          this.area = result.data.area
          this.zone = result.data.zone
          this.saleCode = result.data.saleCode
          this.salePayer = result.data.salePayer
          localStorage.setItem('name', JSON.stringify(this.user))
          localStorage.setItem('token', JSON.stringify(this.token))
          localStorage.setItem('area', this.area)
          localStorage.setItem('zone', this.zone)
          localStorage.setItem('saleCode', this.saleCode)
          localStorage.setItem('salePayer', JSON.stringify(this.salePayer))
        } else {
          this.validateLogin = user.message 
          this.logout()
        }
        console.log('login', result.data)
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.area = null
      this.zone = null
      this.saleCode = null
      this.salePayer = null
      localStorage.clear()
    },
  },
});
