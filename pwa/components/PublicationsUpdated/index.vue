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
        <Article :article="article" :index="index" />
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