<template>
  <v-container>
    <v-sheet
      class="ma-4"
      color="grey-lighten-2"
      height="25"
      rounded="pill"
      width="170"
    >
      <p class="text-center font-weight-bold">Ultimas Publicações</p>
    </v-sheet>
    <v-row class="d-flex mx-auto">
      <template v-for="(article,index) in articleManager.lastArticles" :key="article.id">
        <div class="mx-auto">
          <Article :article="article" :index="index" />
        </div>
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