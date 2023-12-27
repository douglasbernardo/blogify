import {defineStore} from "pinia";
import {useAuthStore} from "~/store/user/authStore";

export const userManager = defineStore('userManager',{
  state: () => ({
    userConfigData: {},
    authStore: useAuthStore(),
    errorMessages: [],
    updated_message: ''
  }),

  actions:{
    async add_new_user(objUser: object){
      try{
        const apiResponse = await api_call({
          method: 'post',
          url: '/user/new_user',
          data: objUser
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
      const resp = await api_call({
        method: 'post',
        url: '/user',
        data: {currentEmail: localStorage.getItem('user')},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.userConfigData = JSON.parse(resp)
    },
    async edit_user(user: object){
      try{
        const resp = await api_call({
          method: 'post',
          url: '/user/edit_user',
          data: user,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const edited_user = JSON.parse(resp)
        this.updated_message = 'Usuário Editado com sucesso'
        localStorage.setItem('user',edited_user.email)
        localStorage.setItem('name',edited_user.name)
      }catch(e: any){
        this.errorMessages.push(e.response.data.message)
      }
    },
    async delete_account(currentEmail: string){
      await api_call({
        method: 'post',
        url: '/user/delete_account',
        data: {currentEmail: currentEmail},
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      navigateTo('/')
      useAuthStore().logout()
    },

    async activities(email: string){
      const res = await api_call({
        method: 'post',
        url: '/user/my-activities',
        data: {email:  email},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      return JSON.parse(res)
    },
    clearErrorMessages(){
      this.errorMessages = []
    }
  },
})