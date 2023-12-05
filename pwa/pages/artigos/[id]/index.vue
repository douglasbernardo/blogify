<template>
  <v-container>
    <v-card v-if="articleOptions">
      <v-img class="" width="460" :lazy-src="articleOptions.backgroundImage" :src="articleOptions.backgroundImage"></v-img>
      <v-card-title :style="{fontFamily: articleOptions.fontTitle}" class="text-center">
        Titulo do Artigo: {{articleOptions.title}}
      </v-card-title>
      <article
        class="pa-5"
        :style="{fontFamily: articleOptions.fontText}"
        v-html="formatArticle(articleOptions.article)">
      </article>
      <v-btn class="bg-blue ma-2 pa-2" @click="useRouter().go(-1)">Voltar</v-btn>
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