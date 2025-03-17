import {defineStore} from "pinia";
export const useCommentStore = defineStore('comment',{
  state: () => ({
    comments: [],
    warning: ''
  }),
  actions: {
    async create(commentData: object){
      try{
        const {data, error} = await useFetch(`${useRuntimeConfig().public.apiBase}/comment`,{
          method: 'post',
          body: commentData,
        })
        if(error.value){
          this.warning = error.value.data.message
        }
      }catch(e: any){
        console.log('Error',e)
      }
    },

    async get_comments(id: string){
      await useFetch(`${useRuntimeConfig().public.apiBase}/comment/all/${id}`)
    },

    async delete_your_comment(comment: object) {
      await useFetch(`${useRuntimeConfig().public.apiBase}/comment/delete`,{
        method: 'post',
        body: comment
      })
    },

    async edit_comment(commentEditing: object){
      await useFetch(`${useRuntimeConfig().public.apiBase}/comment/edit`,{
        method: 'post',
        body: commentEditing
      })
    }
  }
})