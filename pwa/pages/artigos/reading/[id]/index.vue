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
      <v-card-actions class="d-flex justify-end">
        <v-btn class="ma-2" size="small" variant="flat" color="primary" rounded @click="$router.push('/')">Voltar</v-btn>
        <v-btn v-if="authStore.token" class="ma-2" variant="flat" size="small" color="primary" rounded append-icon="mdi-comment" @click="dialogCreateComment=!dialogCreateComment">Comentar</v-btn>
        <v-btn class="ma-2" size="small" variant="flat" append-icon="mdi-share" rounded color="primary">Compartilhar</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog persistent width="500" v-model="dialogCreateComment">
      <v-card>
        <div class="ma-2 pa-2">
          <v-text-field label="Nome" v-model="my_name" disabled></v-text-field>
          <v-text-field label="Comentário"></v-text-field> 
        </div>
        <v-card-actions>
          <v-btn color="primary" size="small" @click="dialogCreateComment = false" variant="flat" rounded>Cancelar</v-btn>
          <v-btn color="primary" size="small" @click="comment(articleOptions._id)" variant="flat" rounded>Comentar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
  import axios from "axios";
import { useAuthStore } from "~/store/user/authStore";
  const route = useRoute()
  const articleOptions = ref<string>(null)
  const authStore = useAuthStore()
  const dialogCreateComment = ref(false)
  const my_name = ref<string>(String(localStorage.getItem('name')))
  onMounted(async ()=>{
    const resp = await api_call({method:'get',url:`/article/reading/${route.params.id}`})
    resp ? articleOptions.value = JSON.parse(resp) : articleOptions.value
  })

  const comment = async(idArticle: string) => {
    await axios.post('http://localhost:3030/comment', {
      author: localStorage.getItem('name'),
      emailAuthor: localStorage.getItem('user'),
      text: 'hello heres a text just a test',
      idArticle: String(idArticle),
    })
  }
</script>