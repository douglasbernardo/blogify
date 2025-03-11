<template>
  <v-container>
    <v-card v-if="article.reviewArticle.article">
      <v-card-title :style="{fontFamily: article.reviewArticle.article.fontTitle}" class="text-center">
        Titulo do Artigo: {{article.reviewArticle.title}}
      </v-card-title>
      <article
        class="pa-5"
        :style="{fontFamily: article.reviewArticle.article.fontText}"
        v-html="formatArticle(article.reviewArticle.article || undefined)"
      >
      </article>
      <v-btn class="bg-blue ma-2 pa-2" @click="useRouter().go(-1)">Voltar</v-btn>
    </v-card>
    <v-card v-else>
      <v-progress-linear
        class="ma-2"
        :size="50"
        height="12"
        color="error"
        indeterminate
      ></v-progress-linear>
      <p class="ml-2 ma-2 text-h5">Tentando fazer o carregamento do artigo &#x1F9D0;</p>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import {useArticleStore} from "~/store/article_manager";
  const article = useArticleStore()
  onMounted(async () => {
    await article.get_article_by_id(useRoute().params.id)
  })
</script>