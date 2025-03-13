<template>
  <v-hover v-slot:default="{isHovering, props}">
    <v-card v-bind="props" class="pa-2 ma-2" width="auto">
      <v-img
        :src="article.backgroundImage ? article.backgroundImage : 'no-image-article.avif'"
        class="align-center"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="300px"
        width="345"
        cover
      >
        <v-card-title v-if="!isHovering" class="text-white text-center" v-text="article.title"></v-card-title>
        <v-card 
          v-if="isHovering"
          density="comfortable"
          elevation="16"
          style="font-family: Kanit;"
          class="text-center bg-grey-darken-3 pa-2 ma-2 opacity-60 text-white text-h7"
        >
        {{ article.title }}
        </v-card>
      </v-img>
      <v-card-subtitle class="mt-2 ml-n2">
        <p>Criado em: {{ useDateFormat(article?.createdAt, `DD MMMM YYYY`, { locales: 'pt-br' }).value }}</p>
        <p>Autor: {{ article?.author?.name }}</p>
      </v-card-subtitle>
      <v-card-actions>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn 
            v-bind="props"
            :class="isHovering ? 'bg-blue' : 'text-blue'" 
            size="small"
            variant="outlined"
            @click="doReading(article._id)"
            >Fazer leitura</v-btn>
        </v-hover>
        <v-icon
          class="ml-4" 
          @click="handleLike(article._id)"
          color="red" 
          icon="mdi-heart" 
        ></v-icon><p class="ml-1">{{ article.likes }}</p>
        <v-icon class="ml-4" color="orange-lighten-2">mdi-comment</v-icon><p class="ml-1">{{ article.comments }}</p>
        <v-icon class="ml-4" color="light-blue">mdi-eye</v-icon><p class="ml-1">{{ article.views }}</p>
      </v-card-actions>
      <v-snackbar 
        v-model="snackbarErrorLike" 
        timeout="1200" 
        variant="flat" 
        color="red-darken-4" 
        :text="likeErrorMessage"
        location="top"
      />
    </v-card>
  </v-hover>
</template>

<script lang="ts" setup>
defineProps({
  article: {required: true},
  index: { required: false}
})
import {useAuthStore} from '~/store/user/authStore'
import { useArticleStore } from '~/store/article_manager';
const auth = useAuthStore()
const articleStore = useArticleStore()
const snackbarErrorLike = ref<boolean>(false)
const likeErrorMessage = ref('')
const {doReading} = useArticleActions()

const handleLike = async(id:string) => {
  if(!auth.isAuthenticated){
    snackbarErrorLike.value = true
    likeErrorMessage.value = 'Faça o login para curtir o artigo'
    return
  }
  const {data, error} = await useFetch(`${useRuntimeConfig().public.apiBase}/like/i-liked`,{
    method: 'post',
    body: { user: localStorage.getItem('user'), article: id },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  if(data.value){ 
    articleStore.allArticles[props.index].likes++
    articleStore.lastArticles[props.index].likes++
    articleStore.filteredArticles[props.index].likes++
  }
  if(error.value){
    snackbarErrorLike.value = true
    likeErrorMessage.value = 'Você já curtiu esse artigo'
  }
}

</script>