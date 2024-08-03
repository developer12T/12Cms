import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    validateLogin: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user,
  },
  actions: {
    async login(userLogin, passwordLogin) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + 
          '/cms/authen/login',
          { userName: userLogin, passWord: passwordLogin },
        );
        const result = response.data
        if (result) {
          this.userName = result.data.userName
          this.saleCode = result.data.saleCode
          this.salePayer = result.data.salePayer
          this.user = result.data.fullName
          this.tel = result.data.tel
          this.area = result.data.area
          this.zone = result.data.zone
          this.warehouse = result.data.warehouse
          this.token = result.data.token
          localStorage.setItem('saleCode', this.saleCode)
          localStorage.setItem('salePayer', JSON.stringify(this.salePayer))
          localStorage.setItem('name', JSON.stringify(this.user))
          localStorage.setItem('tel', this.tel)
          localStorage.setItem('zone', this.zone)
          localStorage.setItem('area', this.area)
          localStorage.setItem('warehouse', this.warehouse)
          localStorage.setItem('token', JSON.stringify(this.token))
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
      this.saleCode = null
      this.salePayer = null
      this.user = null
      this.tel = null
      this.zone = null
      this.area = null
      this.warehouse = null
      this.token = null
      localStorage.clear()
    },
  },
});
