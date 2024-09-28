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
  <v-row class="d-flex justify-center">
    <template v-for="(article,index) in filtered_articles" :key="index">
      <Article :article="article" :index="index"></Article>
    </template>
  </v-row>
</template>

<script lang="ts" setup>
  import type { PropType } from 'nuxt/dist/app/compat/capi';
  import type { ArticleInterface } from '~/utils/interfaces/article.interface';

  const props = defineProps({
    filtered_articles: {type: Array as PropType<ArticleInterface[]>, required: true}
  })
</script>