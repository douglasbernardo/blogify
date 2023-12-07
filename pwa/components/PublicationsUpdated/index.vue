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
    <v-row justify="center">
      <template v-for="card in articleManager.lastArticles">
        <v-card class="ma-4" width="275">
          <v-img
            :src="card.backgroundImage"
            class="align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
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
              class="ml-2" 
              @click="iLiked(card._id)"
              color="red" 
              icon="mdi-heart"
            ></v-icon><p class="ml-1">{{ card.likes }}</p>
            <v-icon class="ml-3" color="blue">mdi-comment</v-icon><p class="ml-1">5</p>
            <v-icon class="ml-3" color="blue">mdi-eye</v-icon><p class="ml-1">{{ card.views }}</p>
          </v-card-actions>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { useArticleStore } from '~/store/article_manager';
const articleManager = useArticleStore()

const iLiked = async (idArticle: string) => {
  await axios.post('http://localhost:3030/like/i-liked',{
    user: localStorage.getItem('user'),
    article: idArticle
  }).then((res) => {
    console.log(res)
  })
  console.log(idArticle)
}
const doReading = async (id: string) => {
  await axios.post('http://localhost:3030/article/add-view',{
    id: id
  }).then((res) => {
    navigateTo(`/artigos/reading/${id}`)
  })
}
onMounted(()=>{
  articleManager.lastAddedArticles()
})
</script>