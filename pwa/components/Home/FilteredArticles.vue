<template v-if="filtered_articles.length">
  <v-sheet
    v-if="filtered_articles.length"
    class="text-center ma-4"
    color="grey-lighten-2"
    height="auto"
    rounded="pill"
    width="250"
    >
    <h3>Artigos Exibidos</h3>
  </v-sheet>
  <v-row>
    <v-col v-for="(article,index) in filtered_articles" :key="index" cols="12" md="4">
      <v-card class="pa-2 ma-2" width="auto">
        <v-img
          :src="article.backgroundImage ? article.backgroundImage : 'no-image-article.avif'"
          class="align-center"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
          width="350px"
          cover
        >
          <v-card-title class="text-white text-center" v-text="article.title"></v-card-title>
        </v-img>
        <v-card-subtitle class="mt-2 ml-n2">Criado em: {{ formatDate(article.createdAt) }}</v-card-subtitle>
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
            @click="handleLike(article._id, index)"
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
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import type { PropType } from 'nuxt/dist/app/compat/capi';
  import {useArticleActions} from '~/composables/articleActions'
  import type { ArticleInterface } from '~/utils/interfaces/article.interface';
  const snackbarErrorLike = ref(false)
  const likeErrorMessage = ref('')
  const {doReading, iLiked} = useArticleActions()

  const handleLike = async(id:string, index: number) => {
    await iLiked(id, index).catch(() => {
      snackbarErrorLike.value = true
      likeErrorMessage.value = 'Você já curtiu esse artigo'
    })
  }
  defineProps({
    filtered_articles: {type: Array as PropType<ArticleInterface[]>, required: true}
  })
  const formatDate = (date: string) => {
    const formatter = Intl.DateTimeFormat("pt-br",{
      year: "numeric",
      month: "long",
      day: "2-digit"
    })

    return formatter.format(Date.parse(date))
  }
</script>