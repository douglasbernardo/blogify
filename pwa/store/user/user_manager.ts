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
        const apiResponse = await api_call(<InterfaceAPI>{
          method: 'post',
          url: '/user/new_user',
          data: objUser,
        })
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
      const resp = await api_call(<InterfaceAPI>{
        method: 'post',
        url: '/user',
        data: {currentEmail: localStorage.getItem('user')}
      })
      this.userConfigData = JSON.parse(resp)
    },
    async edit_user(user: object){
      const resp = await api_call(<InterfaceAPI>{
        method: 'post',
        url: '/user/edit_user',
        data: user
      })
      const edited_user = JSON.parse(resp)
      localStorage.setItem('user',edited_user.email)
      localStorage.setItem('name',edited_user.name)
    },
    async delete_account(currentEmail: string){
      await api_call(<InterfaceAPI>{
        method: 'post',
        url: '/user/delete_account',
        data: {currentEmail: currentEmail}
      })
      navigateTo('/')
      useAuthStore().logout()
    },
    clearErrorMessages(){
      this.errorMessages = []
    }
  },
})