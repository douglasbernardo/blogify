import {defineStore} from "pinia";
import { api_call } from "../utils/api_call";

export const useCommentStore = defineStore('comment',{
  state: () => ({
    comments: []
  }),
  actions: {
    async create(commentData: object){
      const new_comment = await api_call({
        method: 'post',
        url: '/comment',
        data: commentData,
      })
    },

    async get_comments(id: string){
      await api_call({
        method: 'get',
        url: `/comment/all/${id}`,
      }) 
    },

    async delete_your_comment(comment: object) {
      await api_call({
        method: 'post',
        url: '/comment/delete',
        data: comment
      })
    }
  }
})