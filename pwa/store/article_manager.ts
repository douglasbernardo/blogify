import type { RefSymbol } from "@vue/reactivity";
import {defineStore} from "pinia";
import type { ArticleInterface } from "~/utils/interfaces/article.interface";

export const useArticleStore = defineStore('article',{
  state: () => ({
    articles: [],
    allArticles: [],
    lastArticles: [],
    categories: [],
    authors: [],
    filteredArticles: [],
    reviewArticle: {}
  }),
  actions: {
    async add_new_article(article: object){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/add`,{
        method: 'post',
        body: article,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      data.value ? navigateTo('/artigos') : console.log("Failed creating an article")
    },

    async get_all_articles(){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/all`)
      this.allArticles = data.value
    },

    async my_articles(email: string){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/my_articles`,{
        method: 'post',
        body: {email: email},
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      this.articles = data.value
    },

    async delete_article(data: object){
      await useFetch(`${useRuntimeConfig().public.apiBase}/article/remove`,{
        method: 'post',
        body: data,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
    },

    async edit_article(article: object){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/edit`,{
        method: 'post',
        body: article,
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      navigateTo('/artigos')
    },
    async lastAddedArticles(){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/last-added`)
      this.lastArticles = data.value
    },

    async get_categories(){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/categories`)
      this.categories = data.value
    },

    async get_authors(){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/authors`)
      this.authors = data
    },


    async filtering_articles(filters: object){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/filter`,{
        method: 'post',
        body: filters
      })
      this.filteredArticles = data.value
    },

    async search_article(query){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/search`,{
        method: 'get',
        query: {q: query}
      })
      if(error.value){
        console.error('Erro ao buscar artigos:', error.value);
        return [];
      }
      this.filteredArticles = data.value
    },

    async get_article_by_id(id: string){
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/article/reading/${id}`)
      this.reviewArticle = data.value
    }
  }
})