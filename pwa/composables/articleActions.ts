import { useArticleStore } from '~/store/article_manager';
import {api_call} from '~/utils/api_call'

export function useArticleActions(){

  async function doReading(id: string){
    await api_call(<InterfaceAPI>{method: 'post', url: '/article/add-view', data: {id: id}});
    navigateTo(`/artigos/reading/${id}`)
  }

  async function iLiked(idArticle: string, index: any){
    
    const article = useArticleStore()
    try{
      const res = await api_call(<InterfaceAPI>{
        method: 'post', 
        url: '/like/i-liked', 
        data: {user: localStorage.getItem('user'), article: idArticle}, 
      })
      if(res) article.allArticles[index].likes++;
    }catch(e){
      throw e
    }
  }

  return {
    doReading,
    iLiked,
  }
}
