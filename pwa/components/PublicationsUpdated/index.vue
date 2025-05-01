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
    <v-window
      v-if="mobile"
      v-model="window"
      touch
    >
      <v-window-item
        v-for="(article,index) in articleManager.lastArticles" :key="article.id"
        class="mx-auto"
      >
        <Article :article="article" :index="index" />
      </v-window-item>
    </v-window>
    <div v-else class="d-flex justify-space-evenly flex-wrap">
      <template v-for="(article,index) in articleManager.lastArticles" :key="article.id">
          <Article :article="article" :index="index" />
      </template>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  import { useArticleStore } from '~/store/article_manager';
  const articleManager = useArticleStore()
  const {mobile} = useDisplay()
  const window = ref(0)

  onMounted(()=>{
    articleManager.lastAddedArticles()
  })
</script>