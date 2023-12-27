<template>
  <v-container class="pa-0">
    <v-row class="ma-2 pa-2">
      <v-col cols="12" md="10" sm="10" lg="4">
        <v-card color="indigo" variant="tonal" height="300" width="300">
          <template #prepend>
            <v-icon size="x-large">mdi-book-open-page-variant</v-icon>
          </template>
          <template v-slot:title>
            <h3 class="text-center mr-6 text-h5 ma-2 pa-2">Artigos Lidos</h3>
          </template>
          <p class="text-center text-h1 mt-16">17</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" sm="12" lg="4">
        <v-card variant="tonal" color="indigo" height="300" width="300">
          <template #prepend>
            <v-icon size="x-large">mdi-thumb-up</v-icon>
          </template>
          <template v-slot:title>
            <h3 class="text-center mr-6 text-h5 ma-2 pa-2">Artigos Curtidos</h3>
          </template>
          <p class="text-center text-h1 text-center mt-5">
            {{ activities?.articlesLiked.length }}
            <v-btn 
              v-if="activities?.articlesLiked.length" 
              class="ml-4"
              color="primary" 
              @click="articlesLikedDialog=!articlesLikedDialog"
            >
              Ver Titulos curtidos
            </v-btn>
          </p>

        </v-card>
      </v-col>
      <v-col cols="9" md="4" sm="5">
        <v-card color="indigo" variant="tonal" height="300" width="300">
          <template #prepend>
            <v-icon size="x-large">mdi-comment</v-icon>
          </template>
          <template v-slot:title>
            <h3 class="text-center mr-6 text-h5 ma-2 pa-2">Total Comentários</h3>
          </template>
          <p class="text-center text-h1 mt-16">22</p>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="articlesLikedDialog"
      width="auto"
    >
      <v-card>
        <v-card-text>
          <v-list lines="two">
            <v-list-item
              v-for="article in activities?.articlesLiked"
              :key="article"
              :title="article.title"
              :subtitle="article.category"
              slim
              density="comfortable"
              :to="`/artigos/reading/${article._id}`"
            >
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="articlesLikedDialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { userManager } from '~/store/user/user_manager';
const user = userManager()
const activities = ref()
const articlesLikedDialog = ref(false)
onMounted(async() => {
  activities.value = await user.activities(String(localStorage.getItem('user')))
})
</script>