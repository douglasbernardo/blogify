import {defineStore} from "pinia";
import axios from 'axios'
import {useAuthStore} from "~/store/user/authStore";
import type { InterfaceAPI } from "~/utils/api_call";
export const userManager = defineStore('userManager',{
  state: () => ({
    userConfigData: {},
  }),

  actions:{
    async add_new_user(objUser: object){
      const api_request: InterfaceAPI =  {
        method: 'post',
        url: '/user/new_user',
        data: {name: objUser?.name, email: objUser?.email, password: objUser?.password},
        headers: null
      }
      const apiResponse = await api_call(api_request)
      const user = JSON.parse(apiResponse)
      if(apiResponse){
        const authStore = useAuthStore()
        authStore.token = user.access_token
        authStore.user = user.user.email
        authStore.userName  = user.user.name
        localStorage.setItem('token', user.access_token)
        localStorage.setItem('user', user.user.email)
        localStorage.setItem('name', user.user.name)
        navigateTo('/artigos')
      }
    },
    async get_user(objUser){
      await axios.post('http://localhost:3030/user',{
        currentEmail: localStorage.getItem('user'),
      }).then((res)=>{
        this.userConfigData = res.data
        console.log(res)
      })
    },
    async edit_user(currentEmail,name,email,pass){
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
    }
  },
})