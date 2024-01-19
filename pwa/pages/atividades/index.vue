<template>
  <v-container class="pa-0">
    <v-row class="ma-2 pa-2" align="center" justify="center" no-gutters>
      <v-col cols="12" md="12" sm="12" lg="4">
        <v-card 
          variant="tonal" 
          elevation="10" 
          max-width="344" 
          prepend-icon="mdi-thumb-up" 
          color="indigo" 
          min-height="300" 
          title="Artigos Curtidos"
        >
          <v-card-text align="center" justify="center" class="mt-16 text-h1">{{ activities?.articlesLiked.length }}</v-card-text>
          <v-card-actions>
            <v-btn 
              v-if="activities?.articlesLiked.length" 
              class="ml-16 mt-16"
              variant="outlined"
              color="primary" 
              @click="articlesLikedDialog=!articlesLikedDialog"
            >
              Ver Títulos curtidos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" sm="12" lg="4">
        <v-card 
          color="indigo" 
          variant="tonal" 
          elevation="10" 
          prepend-icon="mdi-comment"
          min-height="300" 
          max-width="344"
          title="Artigos Comentados"
        >
          <template #append>
            <v-tooltip text="Conta todos os artigos comentados por voce">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="warning" icon="mdi-alert-circle" variant="text"></v-btn>
              </template>
            </v-tooltip>
          </template>
          <v-card-text align="center" justify="center" class="mt-16 text-h1">{{ commentedArticles.length }}</v-card-text>
          <v-card-actions>
            <v-btn 
              v-if="commentedArticles.length" 
              class="ml-16 mt-16"
              variant="outlined"
              color="primary" 
              @click="commentedArticlesDialog=!commentedArticlesDialog"
            >
              Ver Artigos Comentados
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="articlesLikedDialog"
      width="auto"
    >
      <ArticleActivities :article-array="activities.articlesLiked"/>
    </v-dialog>
    <v-dialog
      v-model="commentedArticlesDialog"
      width="auto"
    >
      <ArticleActivities :article-array="commentedArticles"/>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { userManager } from '~/store/user/user_manager';
const user = userManager()
const activities = ref()
const articlesLikedDialog = ref(false)
const commentedArticlesDialog = ref(false)

onMounted(async() => {
  activities.value = await user.activities(String(localStorage.getItem('user')))
})

const commentedArticles = computed(() => {
  return activities.value?.articlesCommented || []
})
</script>