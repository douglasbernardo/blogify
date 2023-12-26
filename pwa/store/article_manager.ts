import {defineStore} from "pinia";

const token = String(localStorage.getItem('token'))

export const useArticleStore = defineStore('article',{
  state: () => ({
    articles: [],
    allArticles : [],
    lastArticles: [],
    categories: [],
    filteredArticles: [],
  }),
  actions: {
    async add_new_article(article: object){
      const new_article = await api_call({
        method: 'post',
        url: '/article/add',
        data: article,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      new_article ? navigateTo('/artigos') : console.log("Failed creating an article")
    },

    async get_all_articles(){
      const resp =  await api_call({method: 'get',url: '/article/all'})
      this.allArticles = JSON.parse(resp)
    },

    async my_articles(email: string){
      const articlesResponse = await api_call({
        method: 'post',
        url: '/article/my_articles',
        data: {email: email},
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      this.articles = JSON.parse(articlesResponse)
    },

    async delete_article(data: object){
      await api_call({
        method: 'post', 
        url: '/article/remove', 
        data: data,   
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },

    async edit_article(article: object){
      const response = await api_call({
        method: 'post',
        url: '/article/edit',
        data: article,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(response){
        navigateTo('/artigos')
      }
    },
    async lastAddedArticles(){
      const res = await api_call({method: 'get', url:'/article/last-added'})
      this.lastArticles = JSON.parse(res)
    },

    async get_categories(){
      const all_categories = await api_call({
        method: 'get',
        url: '/article/categories',
      })
      this.categories = JSON.parse(all_categories)
    },

    async filter_by_categories(categoriesArray: Array<string>){
      const filter = await api_call({
        method: 'post',
        url: '/article/filter',
        data: {categories: categoriesArray}
      })
      this.filteredArticles = JSON.parse(filter)
    }
  }
})