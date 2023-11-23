import {defineStore} from "pinia";
import axios from 'axios'
export const useAuthStore = defineStore('authStore',{
  state: () => ({
    errorMessages: [],
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    userName: localStorage.getItem('name'),
    loggedWithGoogle: false
  }),

  actions:{
    async add_new_user(objUser: object){
      await axios.post('http://localhost:3030/user/new_user',{
        name: objUser.name,
        email: objUser.email,
        password: objUser.password
      }).then((res)=>{
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('user', res.data.user.email)
        localStorage.setItem('name', res.data.user.name)
        if (res) navigateTo('/profile')
      })
    },
    async login_user(objUser) {
      await axios.post('http://localhost:3030/auth/login', {
        email: objUser.email,
        password: objUser.password
      }).then((res) => {
        this.user = res.data
        this.token = res.data
        this.userName = res.data.user.name
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('user', res.data.user.email)
        localStorage.setItem('name', res.data.user.name)
        if (res) navigateTo('/profile')
      })
    },
    async login_google(token_google: string){
      try {
        await axios.post('http://localhost:3030/auth/verify-google-token', {
          access_token: token_google
        }).then((res) => {
          console.log(res.data.user)
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('user', res.data.user.email)
          localStorage.setItem('name', res.data.user.name)
          if(res.data.fromGoogle){
            this.loggedWithGoogle = true
          }
          if(res) navigateTo('/profile')
        })
      } catch (error) {
        console.error("Erro ao verificar o token do Google:", error);
      }
    },
    logout(){
      localStorage.clear()
      this.token = null
      this.user = null
      this.userName = null
      navigateTo('/')
    }
  },

  getters: {
    isAuthenticated: (state)=> state.user !== null && state.token !== null
  }
})