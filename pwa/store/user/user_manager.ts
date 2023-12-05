import {defineStore} from "pinia";
import axios from 'axios'
import {useAuthStore} from "~/store/user/authStore";
import type { InterfaceAPI } from "~/utils/api_call";
export const userManager = defineStore('userManager',{
  state: () => ({
    userConfigData: {},
    authStore: useAuthStore(),
    errorMessages: []
  }),

  actions:{
    async add_new_user(objUser: object){
      try{
        const api_request: InterfaceAPI =  {
          method: 'post',
          url: '/user/new_user',
          data: {name: objUser?.name, email: objUser?.email, password: objUser?.password, confirmPassword: objUser.confirmPassword},
          headers: null
        }
        const apiResponse = await api_call(api_request)
        const user = JSON.parse(apiResponse)
        if(apiResponse){
          this.authStore.token = user.access_token
          this.authStore.user = user.user.email
          this.authStore.userName  = user.user.name
          localStorage.setItem('token', user.access_token)
          localStorage.setItem('user', user.user.email)
          localStorage.setItem('name', user.user.name)
          navigateTo('/artigos')
        }
      }catch(e: any) {
        this.errorMessages.push(e.response.data.message)
        console.log(e.response.data.message)
      }
    },
    async get_user(){
      await axios.post('http://localhost:3030/user',{
        currentEmail: localStorage.getItem('user'),
      }).then((res)=>{
        this.userConfigData = res.data
        console.log(res)
      })
    },
    async edit_user(currentEmail: string, name:string, email:string, pass:string){
      await axios.post('http://localhost:3030/user/edit_user',{
        currentEmail: currentEmail,
        name: name,
        email: email,
        password: pass
      }).then((res)=>{
        localStorage.setItem('user',res.data.email)
        localStorage.setItem('name',res.data.name)
      })
    },
    async delete_account(currentEmail: string){
      await axios.post('http://localhost:3030/user/delete_account',{
        currentEmail: currentEmail,
      }).then((res)=>{
        navigateTo('/')
        useAuthStore().logout()
      })
    },
    clearErrorMessages(){
      this.errorMessages = []
    }
  },
})