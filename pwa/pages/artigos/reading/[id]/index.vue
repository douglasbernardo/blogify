<template>
  <v-container>
    <v-card 
      v-if="articleOptions" 
      elevation="12"
    >
      <p
        :style="{fontFamily: String(articleOptions.titleFont), fontSize: '25px' }" 
        class="text-center mt-16"
      >
        {{articleOptions.title}}
      </p>
      <article
        class="pa-5 ma-5"
        :style="{fontFamily: String(articleOptions.textFont)}"
        v-html="formatArticle(articleOptions.article)">
      </article>
      <v-card-actions class="d-flex justify-center">
        <v-btn class="ma-2" size="small" variant="flat" color="primary" rounded @click="$router.push('/')">Voltar</v-btn>
        <v-btn v-if="authStore.token" class="ma-2" variant="flat" size="small" color="primary" rounded append-icon="mdi-comment" @click="">Comentar</v-btn>
        <v-btn class="ma-2" size="small" variant="flat" append-icon="mdi-share" rounded color="primary">Compartilhar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/user/authStore";
  const route = useRoute()
  const articleOptions = ref<string>(null)
  const authStore = useAuthStore()
  onMounted(async ()=>{
    const resp = await api_call({method:'get',url:`/article/reading/${route.params.id}`})
    resp ? articleOptions.value = JSON.parse(resp) : articleOptions.value
  })
</script>