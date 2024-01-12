
export function useArticleActions(){

  async function doReading(id: string){
    await useFetch(`${useRuntimeConfig().public.apiBase}/article/add-view`,{
      method: 'post',
      body: {id: id}
    })
    navigateTo(`/artigos/reading/${id}`)
  }

  async function iLiked(idArticle: string, index: any){
    try{
      const {data,error} = await useFetch(`${useRuntimeConfig().public.apiBase}/like/i-liked`,{
        method: 'post',
        body: { user: localStorage.getItem('user'), article: idArticle },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    }catch(e){
      throw e
    }
  }

  return {
    doReading,
    iLiked,
  }
}
