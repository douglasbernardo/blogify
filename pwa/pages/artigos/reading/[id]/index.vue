<template>
  <v-container>
    <v-card v-if="articleOptions">
      <v-card-title :style="{fontFamily: articleOptions.fontTitle}" class="text-center text-h5">
        {{articleOptions.title}}
      </v-card-title>
      <article
        class="pa-5 ma-5"
        :style="{fontFamily: articleOptions.fontText}"
        v-html="formatArticle(articleOptions.article)">
      </article>
      <v-btn class="ma-2" size="small" color="primary" rounded @click="$router.push('/')">Voltar</v-btn>
      <v-btn class="ma-2" size="small" color="primary" rounded append-icon="mdi-comment" @click="">Comentar</v-btn>
      <v-btn class="ma-2" size="small" append-icon="mdi-share" rounded color="primary">Compartilhar</v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import axios from "axios";
  const route = useRoute()
  const articleOptions = ref<object>(null)
  onMounted(async ()=>{
    await axios.get(`http://localhost:3030/article/reading/${route.params.id}`).then((res)=>{
      articleOptions.value = res.data
    })
  })
</script>