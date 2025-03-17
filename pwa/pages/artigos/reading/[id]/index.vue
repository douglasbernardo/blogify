<template>
  <v-container>
    <v-switch
      v-model="bgColor"
      :label="bgColor"
      false-value="Claro"
      true-value="Escuro"
      hide-details
      inset
    ></v-switch>
    <v-card
      :class="{'bg-grey-darken-3': bgColor === 'Escuro'}"
      v-if="articleOptions" 
      elevation="10"
    >
      <p
        :style="{fontFamily: String(articleOptions.titleFont), fontSize: '30px' }" 
        class="text-center mt-16"
      >
        {{articleOptions.title}}
      </p>
      <article
        class="pa-5 ma-5"
        :style="{fontFamily: String(articleOptions.textFont)}"
        v-html="formatArticle('',articleOptions.article)">
      </article>
      <v-card-actions class="d-flex justify-end">
        <v-btn class="ma-2" size="small" variant="flat" color="primary" rounded @click="$router.push('/')">Voltar</v-btn>
        <v-btn class="ma-2" variant="flat" size="small" color="primary" rounded append-icon="mdi-comment" @click="sheet=!sheet">Comentários</v-btn>
        <div class="text-center">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
              >
                Mais Opções
              </v-btn>
            </template>

            <v-list width="auto">
              <v-list-item>
                <v-btn class="ma-2" size="small" @click="downloadArticle()" variant="flat" append-icon="mdi-download" rounded color="primary">Fazer Download</v-btn>
              </v-list-item>
               <v-list-item>
                 <v-btn class="ma-2" size="small" @click="sharingDialog()" variant="flat" append-icon="mdi-share" rounded color="primary">Compartilhar</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-actions>
    </v-card>
    <v-dialog persistent width="700" v-model="dialogCreateComment">
      <v-card>
        <v-alert class="text-center ma-2" type="error" variant="tonal" v-if="errorMsg">{{ errorMsg }}</v-alert>
        <div class="ma-2 pa-2">
          <v-text-field label="Nome" v-model="my_name" disabled></v-text-field>
          <v-textarea rows="3" auto-grow label="Comentário" v-model="my_comment_text"></v-textarea> 
        </div>
        <v-card-actions>
          <v-btn color="primary" size="small" @click="dialogCreateComment = false" variant="flat" rounded>Cancelar</v-btn>
          <v-btn v-if="!isEditing" color="primary" size="small" @click="funcComment(articleOptions._id)" variant="flat" rounded>Comentar</v-btn>
          <v-btn v-if="isEditing" color="primary" size="small" variant="flat" rounded @click="editMyComment">Editar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="sheet" inset>
      <v-card
        class="text-center"
        height="2000"
      >
      <v-card-title class="bg-blue-darken-3">
        <v-row>
          <v-col class="ml-n12">
            <p style="font-family: Days One;">
              <v-icon>mdi-comment-multiple</v-icon>
              Comentários
            </p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn 
              v-if="authStore.token" 
              class="bg-blue font-weight-light rounded-lg mt-n2"
              elevation="10"
              size="small"
              variant="flat" 
              @click="createComment"
              text="Escrever comentário"
            />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card
        v-if="commentsArray.length < 1"
        class="mx-auto mt-16"
        max-width="400"
        variant="text"
      >
        <v-img
          class="align-end text-white rounded-t-xl"
          height="280"
          src="https://www.redegazeta.com.br/residencia/wp-content/uploads/sites/9/2021/09/Internet-gauchazh.jpg"
          cover
        />

        <v-card-text>
          <div class="font-weight-bold text-h5">Seja a primeira pessoa a comentar</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" variant="tonal" block @click="verifyIfLogged">
            Comentar
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-list lines="two">
        <v-list-item
          class="text-left"
          v-for="comment in fixedComment"
          :key="comment?._id"
          :prepend-avatar="comment?.authorImage ? comment?.authorImage : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAP1BMVEWzs7P///+vr6/k5OTs7Oy2tratra3X19fc3NzR0dH8/Pz4+Pjx8fG4uLi9vb3IyMjBwcHFxcXn5+fu7u7Nzc2cgkJPAAAESElEQVR4nO2dC7qjIAxGJdb323b/a53a3rmjrbQCUYLznxV4PpAkEDSKAAAAAAAAAAAAAAAAAAAAAADgUOiB76fYkzy+kxVtc1pN9UNZ50NySkk1oxy76HSSVKslcX8yR4rVK5fiXAPZvRneZ2t2Jsd2xXByPM/SmlSrikoVJ1GkqNQYqnoI35Govb2upYt1NfDXkai4fNB70AWsSG2snZ8zLk2gjtSOG/Sew5j6flgb0nzL+P0whjeKtB4DtZShzVTKzQTvimEtOM2n+KAjC0eRel0O80UxlPWGeiu/SdH3o2/DXlCpPIiJ6iAYxruorSO2IT8Tp69p6Bca3wZfoMxRUF2FD2JrkKlpkB356eosqFTi2+ITTuvoXySHjJRjCFUlOLUxrCd0dL49tJgXFOtcxE5Tcgv2v5Ri1xqmSarUzbeJjhuXodQ9jZUDGEtqqYYssWKilJqcMi00d1rfKhrYBFXhW2WdhM9QaCHMaBjD0A8whOEMoSUiDA04f7Q4f8SHoSdgCEP5hozVk9T9RL4K+PyGvW8VDeffxTi9ofPxr3zDzY16gRqSVSNUSIbOJ/gzJLYO8W3pP5DXx8d1dPgPcUGfW1BVvo2W8A+htLyG6/R3jqxj0pRfUNhuFAxtGHxLLdjjPZR1Dswc7yeERQu+NoxfxG3ssxvKCoc7TFNpk5Sp73KGvNuljAX+hMSOmoHVUN4QcvSwzxDa9sVoKG0h/WHtuwJ2CG1UeP/8hS2lbxMtDZOhrKpiDhUsgrXgXn2eEkPoMvOE45BUXMq9gCE9rQRmMwuc56m4reAXyLVQlH45L4pSxwzc9/NvIHG6gSh7mXnilIFXAQi6Xbu4BWHoUO6PgrOZOdbHNKXMo98VbIsMuRn3G3Y7GkIL+1XskjfRGfcbFslbCKFwhvl10pDm6IR5Mez7ic0xbJAKJNbPMav3A3sJn/QGKfjV98NaYbB9WoY4giYxUe4XBj5C24dQ/peT1jAJF2FUha+kJtl3mCupgWCQ89Qw95Z45PsNw/0oeY0JXzAvnwKL+WRRAseB7NE8sBEMahTJ8rg7GMXEuiO6akMIGmnncvpUiH8ZqXPsVqhFb0eRs99ELPZHNBQVPN0m5XVI5UlS1HN27tVZK+rnHhQNm34QYCjZJyIsiZIh3qGNfaK6ZF2TetWkNCr4blVqNMesj/z80oyiNttp8N6o86I99lcm059V+F+9z1TjYZb3hSVj+36goWXc7R1I7gvL4YP3Qjzs91ISNbmnwVuS7ZL2UNpnfHe1HSnzgTtFp6Y4at3cyJX193t047+45U7OtbLe1xZhw/cLT++G0T+NjqZ2/8GQ7R9jDsN5GHmv+uyB413aPa7Z8+La1896l2kXXD9QD0P/wBCGMPQPDGEIQ//AEIYw9A8MYQhD/8AQhvL32pwvt3djLBv3jX2SjqsgAAAAAAAAAAAAAAAAAAAAAOD/4Q9tQkhDbo2dwAAAAABJRU5ErkJggg=='"
          lines="three"
          open-strategy="list"
        >
          <v-list-item-content>
            <v-chip 
              v-if="comment?.authorEmail === my_email"
              density="compact"
              class="text-left"
              size="small"
              color="primary" 
              label
              variant="tonal"
            >
              Meu Comentário
            </v-chip>
            <v-row class="ma-auto">
              <v-list-item-title>{{ comment?.authorName }}</v-list-item-title>
              <v-chip
                prepend-icon="mdi-calendar-month"
                variant="text"
                density="comfortable"
                label
                class="ml-1"
              >
                {{ useDateFormat(comment?.createdAt, 'DD/MM/YYYY', { locales: 'pt-br' }).value }}
              </v-chip>
            </v-row>
            <p class="text-subtitle-2 text-grey">{{ comment?.text }}</p>
          </v-list-item-content>
          <template v-if="comment?.authorEmail === my_email" #append>
            <v-btn icon="mdi-pencil" class="ma-1" color="blue" variant="text" @click="editComment(comment.authorEmail,comment.text)"></v-btn>
            <v-btn icon="mdi-delete" class="ma-1" color="red" variant="text" @click="delete_comment(articleOptions._id, comment.authorEmail)"></v-btn>
          </template>
        </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script lang="ts" setup>
  import formatArticle from '~/utils/formatArticle'
  import { useAuthStore } from "~/store/user/authStore";
  import { useCommentStore } from "~/store/comment_manager";
  import html2pdf from 'html2pdf.js'
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
  const isEditing = ref<boolean>(false)
  const envVariable = useRuntimeConfig()
  const colorMode = useColorMode()
  const bgColor = ref('Claro')

  const fetchComments = async() => {
    await $fetch<string[]>(`${envVariable.public.apiBase}/comment/all`, {
      method: 'post',
      body: { id: route.params.id }
    }).then((response) => commentsArray.value = response)
  }

  const fetchArticle = async () => {
    const {data} = await useFetch<string>(`${envVariable.public.apiBase}/article/reading/${route.params.id}`)
    articleOptions.value = data.value
  }

  onMounted(async ()=>{
    fetchArticle(),
    fetchComments()
  })

  const createComment = () => {
    my_comment_text.value = ''
    dialogCreateComment.value = !dialogCreateComment.value
  }

  const errorMsg = ref('')
  const funcComment = async(idArticle: string) => {
    if(!my_comment_text.value){
      errorMsg.value = 'O campo comentário deve ser preenchido'
      return
    }
    if(my_comment_text.value.length > 700){
      errorMsg.value = 'O comentario deve ter no maximo 700 caracteres'
      return
    }
    if(my_comment_text.value.length < 70){
      errorMsg.value = 'O comentario deve ter no minimo 70 caracteres'
      return
    }
    isEditing.value = false
    await comment.create({
      author: localStorage.getItem('name'),
      emailAuthor: localStorage.getItem('user'),
      text: my_comment_text.value,
      idArticle: String(idArticle),
    })
    dialogCreateComment.value = false
    await fetchComments()
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
    await fetchComments()
  }

  const emailAuthor = ref()
  const editComment = async(email: string, text: string) => {
    dialogCreateComment.value = !dialogCreateComment.value
    isEditing.value = true
    my_comment_text.value = text
    emailAuthor.value = email
  }

  const editMyComment = async() => {
    await comment.edit_comment({
      user: emailAuthor.value,
      text: my_comment_text.value
    }) 
    dialogCreateComment.value = false
    await fetchComments()
  }

  const verifyIfLogged = () => {
    if(authStore.token){
      return createComment()
    }else{
      useRouter().push('/user/login')
    }
  }

  const sharingDialog = () => {
    if (navigator.share) {
      navigator.share({
        title: "Confira este artigo!",
        text: "Dá uma olhada neste artigo incrível!",
        url: window.location.href, // URL do artigo atual
      }).then(() => console.log("Compartilhamento feito com sucesso!"))
    .catch((error) => console.log("Erro ao compartilhar:", error));
    } else {
      alert("Seu navegador não suporta compartilhamento nativo.");
    }
  }
  const downloadArticle = async() => {

    const formattedArticle = await formatArticle(articleOptions.value.title, articleOptions.value.article);
    console.log(formattedArticle)
    // Cria o conteúdo HTML para o PDF
    const pdfOptions = {
      margin: 5,
      filename: articleOptions.value.title + '.pdf',
    };

    // Gerar o PDF
    html2pdf()
      .from(formattedArticle)
      .set({
        margin: 5,
        filename: articleOptions.value.title,
        html2canvas: { useCORS: true, scale: 2 },
        jsPDF: { orientation: "portrait" }
      })
      .save();
  }
</script>