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
        <v-btn class="ma-2" variant="flat" size="small" color="primary" rounded append-icon="mdi-comment" @click="sheet=!sheet">Comentarios</v-btn>
        <v-btn class="ma-2" size="small" variant="flat" append-icon="mdi-share" rounded color="primary">Compartilhar</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog width="500" v-model="dialogCreateComment">
      <v-card>
        <div class="ma-2 pa-2">
          <v-text-field label="Nome" v-model="my_name" disabled></v-text-field>
          <v-text-field label="Comentário" v-model="my_comment_text"></v-text-field> 
        </div>
        <v-card-actions>
          <v-btn color="primary" size="small" @click="dialogCreateComment = false" variant="flat" rounded>Cancelar</v-btn>
          <v-btn color="primary" size="small" @click="funcComment(articleOptions._id)" variant="flat" rounded>Comentar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="sheet" inset>
      <v-card
        class="text-center"
        height="2000"
      >
      <v-list lines="two">
          <v-btn v-if="authStore.token" size="small" class="d-flex justify-start ma-2" variant="tonal" color="primary" @click="dialogCreateComment=!dialogCreateComment">Criar Comentario</v-btn>
          <v-list-item
            class="text-left"
            v-for="comment in fixedComment"
            :key="comment._id"
            :prepend-avatar="comment.authorImage"
          >
            <v-list-item-content>
              <v-chip 
                v-if="comment.authorEmail === my_email"
                density="compact"
                class="text-left" 
                prepend-icon="mdi-account" 
                color="primary" 
                variant="outlined"
              >
                Meu Comentário
              </v-chip>
              <v-list-item-title>{{ comment.authorName }}</v-list-item-title>
              <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
            </v-list-item-content>
            <template v-if="comment.authorEmail === my_email" #append>
              <v-btn icon="mdi-pencil" class="ma-1" color="blue" variant="text"></v-btn>
              <v-btn icon="mdi-delete" class="ma-1" color="red" variant="text" @click="delete_comment(articleOptions._id, comment.authorEmail)"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/user/authStore";
  import { useCommentStore } from "~/store/comment_manager";
  const route = useRoute()
  const articleOptions = ref<string | null>(null)
  const authStore = useAuthStore()
  const dialogCreateComment = ref<boolean>(false)
  const my_name = ref<string>(String(localStorage.getItem('name')))
  const my_email = ref<string>(String(localStorage.getItem('user')))
  const sheet = ref(false)
  const comment = useCommentStore()
  const my_comment_text = ref<string>('')
  const commentsArray = ref<Array<string>>([])

  const fetchComments = async() => {
    const respComments = await api_call({
      method:'post',
      url:`/comment/all`, 
      data: { id: route.params.id }
    })
    respComments ? commentsArray.value = JSON.parse(respComments) : []
  }

  const fetchArticle = async () => {
    const respArticle = await api_call({method:'get',url:`/article/reading/${route.params.id}`})
    respArticle ? articleOptions.value = JSON.parse(respArticle) : []
  }

  onMounted(async ()=>{
    fetchArticle(),
    fetchComments()
  })

  const funcComment = async(idArticle: string) => {
    await comment.create({
      author: localStorage.getItem('name'),
      emailAuthor: localStorage.getItem('user'),
      text: my_comment_text.value,
      idArticle: String(idArticle),
    })
    fetchComments()
  }

  const fixedComment = computed(() => {
    //when user is logged his comment gets fixed in first if he comments something in ther article
    return commentsArray.value.slice().sort((my_comment) => {
      if (my_comment.authorEmail === my_email.value) return -1; // Se o autor for você, coloque primeiro
      return 0; // Caso contrário, mantenha a ordem original
    });
  })

  const delete_comment = async(id: string, user: string) => {
    comment.delete_your_comment({
      idArticle: id,
      user: user
    })
    fetchComments()
  }
</script>