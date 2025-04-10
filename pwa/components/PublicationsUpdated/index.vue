<template>
  <v-container>
    <v-sheet
      class="ma-2 ml-16"
      color="grey-lighten-2"
      height="25"
      rounded="pill"
      width="170"
    >
      <p class="text-center font-weight-bold">Ultimas Publicações</p>
    </v-sheet>
    <div class="d-flex justify-space-evenly flex-wrap">
      <template v-for="(article,index) in articleManager.lastArticles" :key="article.id">
          <Article :article="article" :index="index" />
      </template>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { useArticleStore } from '~/store/article_manager';
  const articleManager = useArticleStore()

  onMounted(()=>{
    articleManager.lastAddedArticles()
  })
</script>