<template>
  <v-container>
    <v-sheet
      class="ma-2"
      color="grey-lighten-2"
      height="25"
      rounded="pill"
      width="170"
    >
      <p class="text-center font-weight-bold">Ultimas Publicações</p>
    </v-sheet>
    <v-row>
      <template v-for="(article,index) in articleManager.lastArticles">
        <v-card class="ma-3 mt-5" width="auto">
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
          <v-card-subtitle class="mt-2 ml-n2">
            Criado em: {{ useDateFormat(article?.createdAt, `DD MMMM YYYY`, { locales: 'pt-br' }).value }}
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
              @click="handleLike(article._id, index)"
              color="red" 
              icon="mdi-heart"
            ></v-icon><p class="ml-1">{{ article.likes }}</p>
            <v-icon class="ml-4" color="orange-lighten-2">mdi-comment</v-icon><p class="ml-1">{{ article.comments }}</p>
            <v-icon class="ml-4" color="light-blue">mdi-eye</v-icon><p class="ml-1">{{ article.views }}</p>
            <v-snackbar 
              v-model="snackbarErrorLike" 
              timeout="1200" 
              variant="flat" 
              color="red-darken-4" 
              :text="likeErrorMessage"
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
  import { useAuthStore } from '~/store/user/authStore';
  import { useArticleActions } from '~/composables/articleActions';
  const articleManager = useArticleStore()
  const user = useAuthStore()
  const snackbarErrorLike = ref(false)
  const likeErrorMessage = ref('')
  const { doReading, iLiked } = useArticleActions()

  const handleLike = async(id:string, index: number) => {
    await iLiked(id, index).catch(() => {
      snackbarErrorLike.value = true
      likeErrorMessage.value = 'Você já curtiu esse artigo'
    })
  }

  onMounted(()=>{
    articleManager.lastAddedArticles()
  })
</script>