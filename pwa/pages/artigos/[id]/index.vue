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
  const route = useRoute()
  const articleOptions = ref<object | null>({})
  const envVariable = useRuntimeConfig()
  onMounted(async () => {
    const {data} = await useFetch<object>(`${envVariable.public.apiBase}/article/reading/${route.params.id}`)
    articleOptions.value = data.value
  })
</script>