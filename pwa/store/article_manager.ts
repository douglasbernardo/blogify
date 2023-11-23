import {defineStore} from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/user/authStore";

export const useArticleStore = defineStore('article',{
  state: () => ({
    categories: []
  }),
  actions: {
    async add_new_article(data: object){
      await axios.post('http://localhost:3030/article/add',{
        title: data.title,
        titleFont: data.titleFont,
        article: data.article,
        textFont: data.textFont,
        category: data.category,
        status: data.status,
        createdBy: useAuthStore().user
      }).then((res)=>{
        console.log(res)
      })
    },
    async delete_article(data){
      await axios.post('http://localhost:3030/article/remove',{
        email: data.email,
        id: data.id
      }).then((res)=>{
        console.log(res)
      })
    }
  }
})