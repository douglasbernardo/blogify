<template>
  <v-container>
    <v-card v-if="articleOptions">
      <v-card-title :style="{fontFamily: articleOptions.fontTitle}" class="text-center">{{articleOptions.title}}</v-card-title>
      <article
          class="pa-5"
          :style="{fontFamily: articleOptions.fontText}"
          v-html="formattedArticle">
      </article>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import {api_call} from "~/utils/api_call";
  const articleOptions = ref<object>(null)
  onMounted(async ()=>{
    try {
      const response = await api_call('get', '/article/reading')
      response ? articleOptions.value = JSON.parse(response) : null
      await nextTick()
    }catch (error){
      console.log('Error Calling api',error)
    }
    formatArticle(articleOptions.value.article)
  })
</script>
