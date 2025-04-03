import {defineStore} from "pinia";
import {useAuthStore} from "~/store/user/authStore";
import type { UserInterface } from "~/utils/interfaces/user.interface";

export const userManager = defineStore('userManager',{
  state: () => ({
    userConfigData: {},
    authStore: useAuthStore(),
    errorMessages: [],
    updated_message: ''
  }),

  actions:{
    async add_new_user(objUser: object){
      interface User {
        access_token: string,
        user: UserInterface
      }
      try{
        const {data,error} = await useFetch<User>(`${useRuntimeConfig().public.apiBase}/user/new_user`,{
          method: 'post',
          body: objUser
        })
        if(data.value){
          const user: User | any = data.value
          this.authStore.token = user.access_token
          this.authStore.user = user.user.email
          this.authStore.userName  = user.user.name
          localStorage.setItem('token', user.access_token)
          localStorage.setItem('user', user.user.email)
          localStorage.setItem('name', user.user.name)
          navigateTo('/profile')
        }
        if(error.value){
          if (!this.errorMessages.includes(error.value.data.message)) {
            this.errorMessages.push(error.value.data.message);
          }
        }
      }catch(e: any) {
        console.log('Error when signing up user',e)
      }
    },
    async get_user(){
      const {data} = await useFetch<UserInterface>(`${useRuntimeConfig().public.apiBase}/user`,{
        method: 'post',
        body: { currentEmail: String(localStorage.getItem('user')) },
        headers:{ Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      this.userConfigData = data.value
    },
    async edit_user(user: object){
      try{
        const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/user/edit_user`,{
          method: 'post',
          body: user,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if(error.value){
          if (!this.errorMessages.includes(error.value.data.message)) {
            this.errorMessages.push(error.value.data.message);
            return
          }
        }else{
          console.log(data.value)
          localStorage.setItem('user',user.email)
          localStorage.setItem('name',user.name)
          this.updated_message = 'Usuário Editado com sucesso'
        }
      }catch(e: any){
        console.log(e)
        console.log(e.response.data.message)
        this.errorMessages.push(e.response.data.message)
      }
    },
    async delete_account(currentEmail: string){
      await useFetch(`${useRuntimeConfig().public.apiBase}/user/delete_account`,{
        method: 'post',
        body: { currentEmail: currentEmail },
        headers:{ Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      navigateTo('/')
      useAuthStore().logout()
    },

    async activities(email: string){
      const {data} = await useFetch(`${useRuntimeConfig().public.apiBase}/user/my-activities`,{
        method: 'post',
        body:{email: email },
        headers:{ Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      return data.value
    },
    clearErrorMessages(){
      this.errorMessages = []
    }
  },
})