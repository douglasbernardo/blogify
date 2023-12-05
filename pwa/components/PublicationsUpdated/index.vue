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
                >Fazer leitura</v-btn>
              </v-hover>
            <v-spacer></v-spacer>
            <v-icon class="ma-1" color="red">mdi-heart</v-icon><p>{{ card.likes.toLocaleString('pt-br') }}</p>
            <v-icon class="ma-2" color="blue">mdi-comment</v-icon><p>{{ card.comments.length.toLocaleString('pt-br') }}</p>
          </v-card-actions>
        </v-card>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useArticleStore } from '~/store/article_manager';
const articleManager = useArticleStore()
onMounted(()=>{
  articleManager.lastAddedArticles()
})
</script>