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