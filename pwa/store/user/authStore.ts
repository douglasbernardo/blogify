import {defineStore} from "pinia";
import axios from 'axios'

export const useAuthStore = defineStore('authStore',{
  state: () => ({
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    userName: localStorage.getItem('name'),
    loggedWithGoogle: localStorage.getItem('google'),
    errorMessages: [],
    errorMessagesResetPass: [],
    emailSent: false,
    passReset: {}
  }),

  actions:{
    async login_user(objUser: object) {
      try{
        const {data, error} = await useFetch(`${useRuntimeConfig().public.apiBase}/auth/login`,{
          method: 'post',
          body: { email: objUser.email, password: objUser.password }
        })
        if(data.value){
          console.log(data.value)
          this.user = data.value
          this.token = data.value
          this.userName = data.value.user.name
          localStorage.setItem('token', data.value.access_token)
          localStorage.setItem('user', data.value.user.email)
          localStorage.setItem('name', data.value.user.name)
          navigateTo('/profile')
        }
        if(error.value){
          if (!this.errorMessages.includes(error.value.data.message)) {
            this.errorMessages.push(error.value.data.message);
          }
        }
      }catch(error){
        console.log('Error when trying to login', error)
      }
    },
    async reset_password(email: string){
      const {data, error} = await useFetch(`${useRuntimeConfig().public.apiBase}/auth/reset-password`,{
        method: 'post',
        body: {email: email}
      })
      if(error.value){
        console.log(error.value.data.message)
        if (!this.errorMessagesResetPass.includes(error.value.data.message)) {
          this.errorMessagesResetPass.push(error.value.data.message);
        }
      }
      console.log(data.value)
      if(data.value){
        this.emailSent = data.value.emailSent
      }
    },
    async reset_my_password(token: string, password: string){
      const {data, error} = await useFetch(`${useRuntimeConfig().public.apiBase}/auth/reset-my-pass`,{
        method: 'post',
        body: {token: token, pass: password}
      })
      if(data.value){
        this.passReset = data.value
      }
    },
    async login_google(token_google: string){
      try {
        const {data, error} = await useFetch(`${useRuntimeConfig().public.apiBase}/auth/verify-google-token`,{
          method: 'post',
          body: {access_token: token_google}
        })
        if(data.value){
          this.user = data.value
          this.token = data.value
          this.userName = data.value.user.name
          this.loggedWithGoogle = data.value.fromGoogle
          localStorage.setItem('token', data.value.access_token)
          localStorage.setItem('user', data.value.user.email)
          localStorage.setItem('name', data.value.user.name)
          localStorage.setItem('fromGoogle', true)
          navigateTo('/')
        }
      } catch (error) {
        console.error("Erro ao tentar se logar com google:", error);
      }
    },
    logout(){
      localStorage.clear()
      this.loggedWithGoogle = null
      this.token = null
      this.user = null
      this.userName = null
      navigateTo('/')
    },
    clearErrorMessages(){
      this.errorMessages = []
    },
    clearErrorMessagesResetPass(){
      this.errorMessagesResetPass = []
    },
  },

  getters: {
    isAuthenticated: (state)  => state.token !== null || state.user !== null
  }
})