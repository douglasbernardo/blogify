<template>
  <v-container>
    <v-sheet
      color="grey-lighten-2"
      height="24"
      rounded="pill"
      width="180"
    >
      <p class="text-center font-weight-bold">Ultimas Publicações</p>
    </v-sheet>
    <v-row>
      <template v-for="card in articleManager.lastArticles">
        <v-card class="ma-2 pa-2" width="auto">
          <v-img
            :src="card.backgroundImage"
            class="align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
            width="350px"
            cover
          >
            <v-card-title class="text-white text-center" v-text="card.title"></v-card-title>
          </v-img>
          <v-card-actions>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn 
                v-bind="props"
                :class="isHovering ? 'bg-blue' : 'text-blue'" 
                size="small"
                variant="outlined"
                @click="doReading(card._id)"
                >Fazer leitura</v-btn>
              </v-hover>
            <v-icon
              class="ml-4" 
              @click="iLiked(card._id)"
              color="blue" 
              icon="mdi-thumb-up"
            ></v-icon><p class="ml-2">{{ card.likes }}</p>
            <v-icon class="ml-4" color="blue">mdi-comment</v-icon><p class="ml-2">5</p>
            <v-icon class="ml-4" color="blue">mdi-eye</v-icon><p class="ml-2">{{ card.views }}</p>
            <v-snackbar 
              v-model="snackbarErrorLike" 
              timeout="1200" 
              variant="flat" 
              color="red-darken-4" 
              :text="likeError"
              location="top"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useArticleStore } from '~/store/article_manager';
const articleManager = useArticleStore()
const snackbarErrorLike = ref(false)
const likeError = ref('')

const iLiked = async (idArticle: string) => {
  await api_call(<InterfaceAPI>{
    method: 'post', 
    url: '/like/i-liked', 
    data: {user: localStorage.getItem('user'), article: idArticle}, 
  }).catch((e)=>{
    if(e.response.data){
      snackbarErrorLike.value = true
      likeError.value = e.response.data.message
    }
  })
}
const doReading = async (id: string) => {
  await api_call(<InterfaceAPI>{method: 'post', url: '/article/add-view', data: {id: id}});
  navigateTo(`/artigos/reading/${id}`)
}
onMounted(()=>{
  articleManager.lastAddedArticles()
})
</script>