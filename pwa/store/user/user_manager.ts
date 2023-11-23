import {defineStore} from "pinia";
import axios from 'axios'
import {useAuthStore} from "~/store/user/authStore";
export const userManager = defineStore('userManager',{
  state: () => ({
    userConfigData: {}
  }),

  actions:{
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