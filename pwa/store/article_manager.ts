import {defineStore} from "pinia";
import axios from "axios";

export const useArticleStore = defineStore('article',{
  state: () => ({
    articles: [],
    lastArticles: [],
    categories: []
  }),
  actions: {
    async add_new_article(data: object){
      await axios.post('http://localhost:3030/article/add',{
        backgroundImage: data.backgroundImage,
        title: data.title,
        titleFont: data.titleFont,
        article: data.article,
        textFont: data.textFont,
        category: data.category,
        status: data.status,
        createdBy: data.user
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
    async delete_article(data: object){
      await axios.post('http://localhost:3030/article/remove',{
        email: data?.email,
        id: data?.id
      }).then((res)=>{
        console.log(res)
      })
    },

    async lastAddedArticles(){
      await axios.get('http://localhost:3030/article/last-added').then((res)=>{
        this.lastArticles = res.data
      })
    }
  }
})