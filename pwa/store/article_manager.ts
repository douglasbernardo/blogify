import {defineStore} from "pinia";
import axios from "axios";
import {useAuthStore} from "~/store/user/authStore";

export const useArticleStore = defineStore('article',{
  state: () => ({
    articles: [],
    categories: []
  }),
  actions: {
    async add_new_article(data: object){
      await axios.post('http://localhost:3030/article/add',{
        backgroundImage: data.backgroundImage
        // title: data.title,
        // titleFont: data.titleFont,
        // article: data.article,
        // textFont: data.textFont,
        // category: data.category,
        // status: data.status,
        //createdBy: useAuthStore().user
      },{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
        res.data ? navigateTo('/artigos') : console.log("Failed creating an article")
      })
    },
    async my_articles(email: string){
      await axios.post('http://localhost:3030/article/my_articles',{email: localStorage.getItem('user')})
        .then((res)=>{
          this.articles = res.data
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